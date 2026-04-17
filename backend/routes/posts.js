import express from 'express';
import Joi from 'joi';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, moderatorMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Schémas de validation
const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).required(),
  image: Joi.string().uri().optional(),
  published: Joi.boolean().optional()
});

const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  content: Joi.string().min(10).optional(),
  image: Joi.string().uri().optional().allow(''),
  published: Joi.boolean().optional()
});

const commentSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required()
});

// GET /api/posts - Liste des posts publiés
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      where: { published: true },
      skip,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const totalPosts = await prisma.post.count({
      where: { published: true }
    });

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total: totalPosts,
        pages: Math.ceil(totalPosts / limit)
      }
    });

  } catch (error) {
    console.error('Erreur récupération posts:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors de la récupération des posts'
    });
  }
});

// POST /api/posts - Créer un nouveau post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { error, value } = createPostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    const post = await prisma.post.create({
      data: {
        ...value,
        authorId: req.user.userId
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Post créé avec succès',
      post
    });

  } catch (error) {
    console.error('Erreur création post:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors de la création du post'
    });
  }
});

// GET /api/posts/:id - Récupérer un post spécifique
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { 
        id: req.params.id,
        published: true 
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            likes: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'Post non trouvé'
      });
    }

    res.json({ post });

  } catch (error) {
    console.error('Erreur récupération post:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors de la récupération du post'
    });
  }
});

// PUT /api/posts/:id - Mettre à jour un post
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { error, value } = updatePostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    // Vérifier que l'utilisateur est le propriétaire ou modérateur
    const existingPost = await prisma.post.findUnique({
      where: { id: req.params.id }
    });

    if (!existingPost) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'Post non trouvé'
      });
    }

    if (existingPost.authorId !== req.user.userId && !['ADMIN', 'MODERATOR'].includes(req.user.role)) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Vous ne pouvez modifier que vos propres posts'
      });
    }

    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: value,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.json({
      message: 'Post mis à jour avec succès',
      post
    });

  } catch (error) {
    console.error('Erreur mise à jour post:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors de la mise à jour du post'
    });
  }
});

// DELETE /api/posts/:id - Supprimer un post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: req.params.id }
    });

    if (!existingPost) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'Post non trouvé'
      });
    }

    if (existingPost.authorId !== req.user.userId && !['ADMIN', 'MODERATOR'].includes(req.user.role)) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Vous ne pouvez supprimer que vos propres posts'
      });
    }

    await prisma.post.delete({
      where: { id: req.params.id }
    });

    res.json({
      message: 'Post supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur suppression post:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors de la suppression du post'
    });
  }
});

// POST /api/posts/:id/comments - Ajouter un commentaire
router.post('/:id/comments', authMiddleware, async (req, res) => {
  try {
    const { error, value } = commentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    // Vérifier que le post existe
    const post = await prisma.post.findUnique({
      where: { 
        id: req.params.id,
        published: true 
      }
    });

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'Post non trouvé'
      });
    }

    const comment = await prisma.comment.create({
      data: {
        content: value.content,
        authorId: req.user.userId,
        postId: req.params.id
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Commentaire ajouté avec succès',
      comment
    });

  } catch (error) {
    console.error('Erreur ajout commentaire:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors de l\'ajout du commentaire'
    });
  }
});

// POST /api/posts/:id/like - Like/Unlike un post
router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    // Vérifier que le post existe
    const post = await prisma.post.findUnique({
      where: { 
        id: postId,
        published: true 
      }
    });

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'Post non trouvé'
      });
    }

    // Vérifier si l'utilisateur a déjà liké
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });

      res.json({
        message: 'Like supprimé',
        liked: false
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId,
          postId
        }
      });

      res.json({
        message: 'Post liké',
        liked: true
      });
    }

  } catch (error) {
    console.error('Erreur like/unlike:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors du like/unlike'
    });
  }
});

export default router;
