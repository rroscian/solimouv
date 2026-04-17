import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        error: 'No token provided',
        message: 'Token d\'authentification requis'
      });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Invalid token format',
        message: 'Format du token invalide'
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier que l'utilisateur existe toujours
    const user = await prisma.user.findUnique({
      where: { 
        id: decoded.userId,
        isActive: true 
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isActive: true
      }
    });

    if (!user) {
      return res.status(401).json({
        error: 'User not found',
        message: 'Utilisateur non trouvé ou désactivé'
      });
    }

    // Ajouter les données utilisateur à la requête
    req.user = {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    };

    next();

  } catch (error) {
    console.error('Erreur middleware auth:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Token invalide'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired',
        message: 'Token expiré, veuillez vous reconnecter'
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur d\'authentification'
    });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Access denied',
      message: 'Accès administrateur requis'
    });
  }
  next();
};

export const moderatorMiddleware = (req, res, next) => {
  if (!['ADMIN', 'MODERATOR'].includes(req.user.role)) {
    return res.status(403).json({
      error: 'Access denied',
      message: 'Accès modérateur ou administrateur requis'
    });
  }
  next();
};
