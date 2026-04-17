<script>
  import { createEventDispatcher } from 'svelte';
  import { authService } from '../utils/authStore.js';

  export let isOpen = false;
  export let mode = 'login'; // 'login' ou 'register'

  const dispatch = createEventDispatcher();

  // État du formulaire
  let formData = {
    identifier: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  };

  let loading = false;
  let error = '';
  let success = '';

  // Réinitialiser le formulaire quand le mode change
  $: if (mode) {
    resetForm();
  }

  function resetForm() {
    formData = {
      identifier: '',
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    };
    error = '';
    success = '';
    loading = false;
  }

  function closeModal() {
    isOpen = false;
    resetForm();
    dispatch('close');
  }

  function switchMode() {
    mode = mode === 'login' ? 'register' : 'login';
  }

  async function handleSubmit() {
    loading = true;
    error = '';
    success = '';

    try {
      if (mode === 'login') {
        const result = await authService.login(formData.identifier, formData.password);
        
        if (result.success) {
          success = 'Connexion réussie !';
          dispatch('success', { type: 'login', user: result.user });
          setTimeout(() => closeModal(), 1500);
        } else {
          error = result.error;
        }
      } else {
        // Validation côté client pour l'inscription
        if (formData.password !== formData.confirmPassword) {
          error = 'Les mots de passe ne correspondent pas';
          return;
        }

        const result = await authService.register({
          email: formData.email,
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        });

        if (result.success) {
          success = 'Inscription réussie !';
          dispatch('success', { type: 'register', user: result.user });
          setTimeout(() => closeModal(), 1500);
        } else {
          error = result.error;
        }
      }
    } catch (err) {
      error = 'Une erreur inattendue s\'est produite';
      console.error('Erreur auth:', err);
    } finally {
      loading = false;
    }
  }

  // Fermer avec Escape
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  // Gestionnaire pour les interactions clavier sur l'overlay
  function handleOverlayKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div 
    class="auth-modal-overlay" 
    on:click={closeModal}
    on:keydown={handleOverlayKeydown}
    role="presentation"
    tabindex="-1"
  >
    <div 
      class="auth-modal" 
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div class="auth-header">
        <h2 id="modal-title">{mode === 'login' ? 'Connexion' : 'Inscription'}</h2>
        <button class="close-btn" on:click={closeModal}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <form on:submit|preventDefault={handleSubmit}>
        {#if mode === 'login'}
          <div class="form-group">
            <label for="identifier">Email ou nom d'utilisateur</label>
            <input
              type="text"
              id="identifier"
              bind:value={formData.identifier}
              placeholder="votre.email@example.com"
              required
              disabled={loading}
            />
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              bind:value={formData.password}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
        {:else}
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                bind:value={formData.firstName}
                placeholder="Votre prénom"
                disabled={loading}
              />
            </div>
            <div class="form-group">
              <label for="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                bind:value={formData.lastName}
                placeholder="Votre nom"
                disabled={loading}
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              placeholder="votre.email@example.com"
              required
              disabled={loading}
            />
          </div>

          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              bind:value={formData.username}
              placeholder="nomutilisateur"
              required
              disabled={loading}
            />
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              bind:value={formData.password}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              bind:value={formData.confirmPassword}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
        {/if}

        {#if error}
          <div class="error-message">{error}</div>
        {/if}

        {#if success}
          <div class="success-message">{success}</div>
        {/if}

        <button type="submit" class="submit-btn" disabled={loading}>
          {#if loading}
            <div class="spinner"></div>
            {mode === 'login' ? 'Connexion...' : 'Inscription...'}
          {:else}
            {mode === 'login' ? 'Se connecter' : 'S\'inscrire'}
          {/if}
        </button>

        <div class="auth-switch">
          {#if mode === 'login'}
            Pas encore de compte ?
            <button type="button" class="link-btn" on:click={switchMode}>S'inscrire</button>
          {:else}
            Déjà un compte ?
            <button type="button" class="link-btn" on:click={switchMode}>Se connecter</button>
          {/if}
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .auth-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .auth-modal {
    background: white;
    border-radius: 20px;
    width: 90%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(224, 224, 224, 0.3);
  }

  .auth-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem 1rem 2rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .auth-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2E7D32;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    color: #666;
    transition: all 0.2s ease;
  }

  .close-btn:hover {
    background: #f5f5f5;
    color: #333;
  }

  form {
    padding: 2rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
    font-size: 0.9rem;
  }

  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e1e1;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: #fafafa;
  }

  .form-group input:focus {
    outline: none;
    border-color: #2E7D32;
    background: white;
    box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
  }

  .form-group input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error-message {
    background: #ffebee;
    color: #c62828;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    border-left: 4px solid #c62828;
  }

  .success-message {
    background: #e8f5e8;
    color: #2e7d32;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    border-left: 4px solid #2e7d32;
  }

  .submit-btn {
    width: 100%;
    padding: 14px 24px;
    background: linear-gradient(135deg, #2E7D32, #388E3C);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 1.5rem;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(46, 125, 50, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .auth-switch {
    text-align: center;
    color: #666;
    font-size: 0.9rem;
  }

  .link-btn {
    background: none;
    border: none;
    color: #2E7D32;
    cursor: pointer;
    font-weight: 600;
    text-decoration: none;
    padding: 0;
    margin-left: 4px;
  }

  .link-btn:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .auth-modal {
      width: 95%;
      margin: 1rem;
    }

    .auth-header {
      padding: 1.5rem 1.5rem 1rem 1.5rem;
    }

    .auth-header h2 {
      font-size: 1.3rem;
    }

    form {
      padding: 1.5rem;
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
</style>
