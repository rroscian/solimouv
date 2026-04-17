import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Schémas de validation
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

const loginSchema = Joi.object({
  identifier: Joi.string().required(), // email ou username
  password: Joi.string().required()
});

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    console.log('📥 Données reçues pour inscription:', req.body);
    
    // Validation des données
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      console.error('❌ Erreur de validation:', error.details);
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    console.log('✅ Validation réussie, données:', value);

    const { email, username, firstName, lastName, password } = value;

    // Vérifier si l'utilisateur existe déjà
    console.log('🔍 Vérification utilisateur existant...');
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      console.log('❌ Utilisateur déjà existant:', existingUser);
      return res.status(409).json({
        error: 'User already exists',
        message: 'Un utilisateur avec cet email ou nom d\'utilisateur existe déjà'
      });
    }

    console.log('✅ Aucun utilisateur existant trouvé');

    // Hasher le mot de passe
    console.log('🔐 Hachage du mot de passe...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('✅ Mot de passe haché');

    // Créer l'utilisateur
    console.log('👤 Création de l\'utilisateur en base...');
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        firstName,
        lastName,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      }
    });

    console.log('✅ Utilisateur créé avec succès:', user);

    // Générer le token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user,
      token
    });

  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors de la création du compte'
    });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    // Validation des données
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }

    const { identifier, password } = value;

    // Trouver l'utilisateur par email ou username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier.toLowerCase() },
          { username: identifier.toLowerCase() }
        ],
        isActive: true
      }
    });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email/nom d\'utilisateur ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email/nom d\'utilisateur ou mot de passe incorrect'
      });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Retourner les données utilisateur (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Connexion réussie',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors de la connexion'
    });
  }
});

// Route pour vérifier le token
router.get('/verify', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        bio: true,
        createdAt: true
      }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'User not found',
        message: 'Utilisateur non trouvé ou désactivé'
      });
    }

    res.json({
      user,
      valid: true
    });

  } catch (error) {
    console.error('Erreur vérification token:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Erreur lors de la vérification'
    });
  }
});

// Route de déconnexion (côté client principalement)
router.post('/logout', authMiddleware, (req, res) => {
  res.json({
    message: 'Déconnexion réussie',
    note: 'Veuillez supprimer le token côté client'
  });
});

export default router;
