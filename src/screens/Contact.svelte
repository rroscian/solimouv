<script>
  let formData = {
    name: '',
    email: '',
    message: ''
  };
  
  let formSubmitted = false;
  
  function handleSubmit(event) {
    event.preventDefault();
    
    // Créer le corps de l'email
    const emailBody = `Nom: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`;
    
    // Créer le mailto
    const mailtoLink = `mailto:contact@solimouv.fr?subject=Message depuis Solimouv App&body=${encodeURIComponent(emailBody)}`;
    
    // Ouvrir le client email
    window.location.href = mailtoLink;
    
    // Afficher le message de confirmation
    formSubmitted = true;
    
    // Reset form
    formData = {
      name: '',
      email: '',
      message: ''
    };
  }
</script>

<div class="contact">
  <section class="hero">
    <div class="container">
      <h1>CONTACT</h1>
    </div>
  </section>

  <section class="contact-content">
    <div class="container">
      <div class="contact-card">
        {#if formSubmitted}
          <div class="success-message">
            <div class="success-icon">✅</div>
            <h3>Message envoyé !</h3>
            <p>Votre client email a été ouvert. Merci de finaliser l'envoi de votre message.</p>
            <button class="btn-contact" on:click={() => formSubmitted = false}>
              Envoyer un autre message
            </button>
          </div>
        {:else}
          <div class="question-header">
            <h2>UNE QUESTION ?<br>UNE REMARQUE ?</h2>
            <div class="hands-illustration">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                <!-- Main droite orange -->
                <path d="M20 30 C25 25, 35 25, 40 30 C45 35, 45 40, 40 45 C35 50, 25 50, 20 45 Z" fill="#FF5722"/>
                <!-- Main gauche bleu -->
                <path d="M60 30 C55 25, 45 25, 40 30 C35 35, 35 40, 40 45 C45 50, 55 50, 60 45 Z" fill="#2C3E50"/>
                <!-- Points de connexion -->
                <circle cx="38" cy="35" r="2" fill="#4FC3F7"/>
                <circle cx="42" cy="35" r="2" fill="#4FC3F7"/>
              </svg>
            </div>
            <p>
              Envie d'en savoir plus ? N'hésitez pas à nous envoyer un message, nous 
              veillerons à vous répondre dans les plus brefs délais.
            </p>
          </div>

          <form on:submit={handleSubmit}>
            <div class="form-group">
              <label for="name">Nom *</label>
              <input 
                type="text" 
                id="name" 
                bind:value={formData.name} 
                required 
                placeholder="Votre nom"
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                bind:value={formData.email} 
                required 
                placeholder="votre@email.com"
              />
            </div>
            
            <div class="form-group">
              <label for="message">Message *</label>
              <textarea 
                id="message" 
                bind:value={formData.message} 
                required 
                placeholder="Votre message..."
                rows="5"
              ></textarea>
            </div>
            
            <button type="submit" class="btn-contact">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M1 6h14m-6-5l5 5-5 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Envoyer le message
            </button>
          </form>
        {/if}
      </div>
    </div>
  </section>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=League+Gothic:wght@400&family=Poppins:wght@400;500;600&display=swap');
  
  .contact {
    min-height: 100vh;
    background-color: #f8f9fa;
    font-family: 'Poppins', sans-serif;
  }
  
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .hero {
    padding: 3rem 0 2rem 0;
    text-align: center;
  }
  
  .hero h1 {
    font-family: 'League Gothic', sans-serif;
    font-size: 40px;
    color: #2C3E50;
    margin: 0;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  .contact-content {
    padding: 0 0 3rem 0;
  }
  
  .contact-card {
    background: #E8F5E8;
    border-radius: 16px;
    padding: 3rem 2rem;
    margin: 0 auto;
    max-width: 500px;
    position: relative;
  }
  
  .question-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .question-header h2 {
    font-family: 'League Gothic', sans-serif;
    font-size: 32px;
    color: #2C3E50;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    text-transform: uppercase;
  }
  
  .hands-illustration {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
  }
  
  .question-header p {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #2C3E50;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    color: #2C3E50;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #B0BEC5;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    background: white;
    transition: border-color 0.2s ease;
    box-sizing: border-box;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #4FC3F7;
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 120px;
    font-family: 'Poppins', sans-serif;
  }
  
  .btn-contact {
    background: #2C3E50;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 1rem 2rem;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    margin: 2rem auto 0;
    text-decoration: none;
  }
  
  .btn-contact:hover {
    background: #1A252F;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(44, 62, 80, 0.3);
  }
  
  .btn-contact svg {
    flex-shrink: 0;
  }
  
  .success-message {
    text-align: center;
    padding: 2rem 1rem;
  }
  
  .success-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .success-message h3 {
    font-family: 'League Gothic', sans-serif;
    font-size: 1.8rem;
    color: #2C3E50;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
  
  .success-message p {
    font-family: 'Poppins', sans-serif;
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 32px;
    }
    
    .container {
      padding: 0 0.5rem;
    }
    
    .contact-card {
      padding: 2rem 1.5rem;
    }
    
    .question-header h2 {
      font-size: 28px;
    }
    
    .question-header p {
      font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    .hero h1 {
      font-size: 40px;
    }
    
    .contact-card {
      margin: 0 0.5rem;
      padding: 1.5rem 1rem;
    }
  }
</style>
