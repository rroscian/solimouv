<script>
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'participant'
  };
  
  let formSubmitted = false;
  let isSubmitting = false;
  
  function handleSubmit(event) {
    event.preventDefault();
    isSubmitting = true;
    
    // Simulation d'envoi (dans une vraie app, on ferait un appel API)
    setTimeout(() => {
      isSubmitting = false;
      formSubmitted = true;
      
      // Reset form
      formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'participant'
      };
    }, 1500);
  }
</script>

<div class="contact">
  <section class="hero-contact">
    <div class="container">
      <h1>Nous Contacter</h1>
      <p class="hero-subtitle">
        Une question ? Une envie de participer ? Besoin d'informations ? 
        L'équipe Solimouv' est là pour vous accompagner !
      </p>
    </div>
  </section>
  
  <section class="contact-options">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info">
          <h2>Plusieurs façons de nous joindre</h2>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">📧</div>
              <div class="method-content">
                <h3>Email</h3>
                <p>Pour toute question générale ou demande d'information</p>
                <a href="mailto:contact@solimouv.com">contact@solimouv.com</a>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="method-icon">🤝</div>
              <div class="method-content">
                <h3>Partenariats</h3>
                <p>Pour proposer un partenariat associatif</p>
                <a href="mailto:partenariat@unispourlesport.paris">partenariat@unispourlesport.paris</a>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="method-icon">🙋‍♀️</div>
              <div class="method-content">
                <h3>Bénévolat</h3>
                <p>Pour rejoindre l'équipe de bénévoles</p>
                <a href="mailto:benevole@solimouv.com">benevole@solimouv.com</a>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="method-icon">📱</div>
              <div class="method-content">
                <h3>Réseaux Sociaux</h3>
                <p>Suivez-nous pour les dernières actualités</p>
                <div class="social-links">
                  <a href="https://instagram.com/solimouv.festival" target="_blank" rel="noopener">
                    Instagram Solimouv'
                  </a>
                  <a href="https://instagram.com/unispourlesport" target="_blank" rel="noopener">
                    Instagram Up Sport!
                  </a>
                  <a href="https://facebook.com/UpSport.UNis" target="_blank" rel="noopener">
                    Facebook Up Sport!
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="up-sport-info">
            <h3>Up Sport! - Association Organisatrice</h3>
            <div class="org-details">
              <p><strong>Site web :</strong> <a href="https://www.unispourlesport.paris/" target="_blank" rel="noopener">www.unispourlesport.paris</a></p>
              <p><strong>Adresse :</strong> Paris, France</p>
              <p><strong>SIRET :</strong> À venir (association loi 1901)</p>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          {#if formSubmitted}
            <div class="success-message">
              <div class="success-icon">✅</div>
              <h3>Message envoyé !</h3>
              <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
              <button class="btn-secondary" on:click={() => formSubmitted = false}>
                Envoyer un autre message
              </button>
            </div>
          {:else}
            <h2>Envoyez-nous un message</h2>
            <form on:submit={handleSubmit}>
              <div class="form-group">
                <label for="type">Je suis :</label>
                <select id="type" bind:value={formData.type} required>
                  <option value="participant">Un futur participant</option>
                  <option value="benevole">Intéressé(e) par le bénévolat</option>
                  <option value="association">Une association</option>
                  <option value="partenaire">Un partenaire potentiel</option>
                  <option value="presse">Presse / Média</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div class="form-row">
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
              </div>
              
              <div class="form-group">
                <label for="subject">Sujet</label>
                <input 
                  type="text" 
                  id="subject" 
                  bind:value={formData.subject} 
                  placeholder="Sujet de votre message"
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
              
              <button type="submit" class="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message'}
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </section>
  
  <section class="faq">
    <div class="container">
      <h2>Questions Fréquentes</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h3>L'événement est-il gratuit ?</h3>
          <p>Oui ! Solimouv' est entièrement gratuit pour tous les participants. C'est un événement inclusif et accessible à tous les budgets.</p>
        </div>
        
        <div class="faq-item">
          <h3>Faut-il s'inscrire à l'avance ?</h3>
          <p>L'inscription n'est pas obligatoire mais recommandée pour nous aider à mieux organiser votre accueil et prévoir le matériel nécessaire.</p>
        </div>
        
        <div class="faq-item">
          <h3>Les activités sont-elles adaptées aux personnes handicapées ?</h3>
          <p>Absolument ! Toutes nos activités sont pensées pour être inclusives. Nous avons du matériel adapté et des encadrants formés.</p>
        </div>
        
        <div class="faq-item">
          <h3>Peut-on venir en famille ?</h3>
          <p>Bien sûr ! Solimouv' est un événement familial avec des activités pour tous les âges, des plus petits aux seniors.</p>
        </div>
        
        <div class="faq-item">
          <h3>Quand aura lieu la prochaine édition ?</h3>
          <p>L'édition 2026 aura lieu en juillet. La date exacte sera communiquée prochainement sur nos réseaux sociaux.</p>
        </div>
        
        <div class="faq-item">
          <h3>Comment devenir bénévole ?</h3>
          <p>Contactez-nous via benevole@solimouv.com ou utilisez le formulaire ci-dessus en sélectionnant "Intéressé(e) par le bénévolat".</p>
        </div>
      </div>
    </div>
  </section>
  
  <section class="location">
    <div class="container">
      <h2>Lieu de l'Événement</h2>
      <div class="location-content">
        <div class="location-info">
          <h3>Centre Sportif Charles Moureu</h3>
          <div class="location-details">
            <p><strong>📍 Adresse :</strong> Paris, France</p>
            <p><strong>🚇 Accès :</strong> Métro, Bus, Vélib' à proximité</p>
            <p><strong>♿ Accessibilité :</strong> Site entièrement accessible PMR</p>
            <p><strong>🚗 Parking :</strong> Places disponibles à proximité</p>
          </div>
          
          <div class="location-features">
            <h4>Équipements disponibles :</h4>
            <ul>
              <li>Terrains de sport multiples</li>
              <li>Vestiaires adaptés</li>
              <li>Espaces de restauration</li>
              <li>Zone d'accueil et d'information</li>
              <li>Matériel sportif fourni</li>
            </ul>
          </div>
        </div>
        
        <div class="location-map">
          <div class="map-placeholder">
            <div class="map-icon">📍</div>
            <h4>Plan d'Accès</h4>
            <p>Le plan détaillé et les informations de transport seront communiqués avant l'événement.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .contact {
    min-height: 100vh;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .hero-contact {
    background: linear-gradient(135deg, #1B5E20, #4CAF50);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }
  
  .hero-contact h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .contact-options {
    padding: 4rem 0;
    background: white;
  }
  
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  
  .contact-info h2 {
    color: #2E7D32;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .contact-methods {
    margin-bottom: 3rem;
  }
  
  .contact-method {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: transform 0.2s;
  }
  
  .contact-method:hover {
    transform: translateY(-2px);
  }
  
  .method-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }
  
  .method-content h3 {
    color: #2E7D32;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  .method-content p {
    color: #666;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
  
  .method-content a {
    color: #2E7D32;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  
  .method-content a:hover {
    color: #1B5E20;
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .social-links a {
    font-size: 0.9rem;
  }
  
  .up-sport-info {
    background: #E8F5E8;
    padding: 2rem;
    border-radius: 8px;
  }
  
  .up-sport-info h3 {
    color: #2E7D32;
    margin-bottom: 1rem;
  }
  
  .org-details p {
    margin: 0.5rem 0;
    color: #333;
  }
  
  .org-details a {
    color: #2E7D32;
    text-decoration: none;
  }
  
  .contact-form {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
  }
  
  .contact-form h2 {
    color: #2E7D32;
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .form-group label {
    display: block;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #4CAF50;
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background: #2E7D32;
    color: white;
    width: 100%;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: #1B5E20;
    transform: translateY(-2px);
  }
  
  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .btn-secondary {
    background: white;
    color: #2E7D32;
    border: 2px solid #2E7D32;
  }
  
  .btn-secondary:hover {
    background: #2E7D32;
    color: white;
  }
  
  .success-message {
    text-align: center;
    padding: 3rem 2rem;
  }
  
  .success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .success-message h3 {
    color: #2E7D32;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .success-message p {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .faq {
    padding: 4rem 0;
    background: #f8f9fa;
  }
  
  .faq h2 {
    color: #2E7D32;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .faq-item {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    border-left: 4px solid #4CAF50;
  }
  
  .faq-item h3 {
    color: #2E7D32;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .faq-item p {
    color: #666;
    line-height: 1.6;
  }
  
  .location {
    padding: 4rem 0;
    background: white;
  }
  
  .location h2 {
    color: #2E7D32;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .location-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }
  
  .location-info h3 {
    color: #2E7D32;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .location-details p {
    margin: 0.75rem 0;
    color: #333;
  }
  
  .location-features {
    margin-top: 2rem;
  }
  
  .location-features h4 {
    color: #2E7D32;
    margin-bottom: 1rem;
  }
  
  .location-features ul {
    list-style: none;
    padding: 0;
  }
  
  .location-features li {
    padding: 0.5rem 0;
    color: #333;
    position: relative;
    padding-left: 1.5rem;
  }
  
  .location-features li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #4CAF50;
    font-weight: bold;
  }
  
  .map-placeholder {
    background: #f8f9fa;
    padding: 3rem 2rem;
    border-radius: 12px;
    text-align: center;
    border: 2px dashed #ddd;
  }
  
  .map-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .map-placeholder h4 {
    color: #2E7D32;
    margin-bottom: 1rem;
  }
  
  .map-placeholder p {
    color: #666;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .hero-contact h1 {
      font-size: 2.5rem;
    }
    
    .contact-grid,
    .location-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .contact-method {
      flex-direction: column;
      text-align: center;
    }
    
    .social-links {
      align-items: center;
    }
    
    .faq h2,
    .location h2 {
      font-size: 2rem;
    }
    
    .faq-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
