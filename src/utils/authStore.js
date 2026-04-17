import { writable } from 'svelte/store';

// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Stores Svelte pour l'état d'authentification
export const isAuthenticated = writable(false);
export const currentUser = writable(null);
export const authToken = writable(null);

// Classe pour gérer l'authentification
class AuthService {
  constructor() {
    this.tokenKey = 'solimouv_token';
    this.userKey = 'solimouv_user';
    
    // Initialiser l'état depuis le localStorage
    this.initializeFromStorage();
  }

  // Initialiser depuis le localStorage
  initializeFromStorage() {
    const token = localStorage.getItem(this.tokenKey);
    const userData = localStorage.getItem(this.userKey);

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.setAuthState(token, user);
        // Vérifier si le token est toujours valide
        this.verifyToken();
      } catch (error) {
        console.error('Erreur parsing user data:', error);
        this.logout();
      }
    }
  }

  // Connexion
  async login(identifier, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      // Stocker le token et les données utilisateur
      this.setAuthState(data.token, data.user);
      this.saveToStorage(data.token, data.user);

      return { success: true, user: data.user };

    } catch (error) {
      console.error('Erreur login:', error);
      return { 
        success: false, 
        error: error.message || 'Erreur de connexion' 
      };
    }
  }

  // Inscription
  async register(userData) {
    try {
      console.log('📤 Données d\'inscription envoyées:', userData);
      console.log('🔗 URL API:', `${API_BASE_URL}/auth/register`);
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      console.log('📡 Status de la réponse:', response.status, response.statusText);
      
      const data = await response.json();
      console.log('📥 Réponse du serveur:', data);

      if (!response.ok) {
        console.error('❌ Erreur serveur:', data);
        throw new Error(data.message || data.error || 'Erreur d\'inscription');
      }

      // Stocker le token et les données utilisateur
      this.setAuthState(data.token, data.user);
      this.saveToStorage(data.token, data.user);

      return { success: true, user: data.user };

    } catch (error) {
      console.error('Erreur register:', error);
      return { 
        success: false, 
        error: error.message || 'Erreur d\'inscription' 
      };
    }
  }

  // Déconnexion
  async logout() {
    try {
      const token = localStorage.getItem(this.tokenKey);
      
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Erreur logout:', error);
    } finally {
      // Nettoyer l'état local
      this.clearAuthState();
      this.clearStorage();
    }
  }

  // Vérifier le token
  async verifyToken() {
    try {
      const token = localStorage.getItem(this.tokenKey);
      
      if (!token) {
        this.logout();
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Token invalide');
      }

      const data = await response.json();
      
      // Mettre à jour les données utilisateur si elles ont changé
      this.setAuthState(token, data.user);
      this.saveToStorage(token, data.user);

      return true;

    } catch (error) {
      console.error('Erreur vérification token:', error);
      this.logout();
      return false;
    }
  }

  // Mettre à jour le profil
  async updateProfile(profileData) {
    try {
      const token = localStorage.getItem(this.tokenKey);
      
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de mise à jour');
      }

      // Mettre à jour l'état local
      this.setAuthState(token, data.user);
      this.saveToStorage(token, data.user);

      return { success: true, user: data.user };

    } catch (error) {
      console.error('Erreur update profile:', error);
      return { 
        success: false, 
        error: error.message || 'Erreur de mise à jour' 
      };
    }
  }

  // Helpers pour gérer l'état
  setAuthState(token, user) {
    authToken.set(token);
    currentUser.set(user);
    isAuthenticated.set(true);
  }

  clearAuthState() {
    authToken.set(null);
    currentUser.set(null);
    isAuthenticated.set(false);
  }

  saveToStorage(token, user) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  clearStorage() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Faire une requête authentifiée
  async authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem(this.tokenKey);
    
    if (!token) {
      throw new Error('Non authentifié');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    });

    if (response.status === 401) {
      // Token expiré ou invalide
      this.logout();
      throw new Error('Session expirée, veuillez vous reconnecter');
    }

    return response;
  }
}

// Exporter une instance unique du service
export const authService = new AuthService();
