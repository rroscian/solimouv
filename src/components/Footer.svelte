<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Solimouv'</h3>
        <p>Le festival du sport pour tous, organisé par Up Sport! et ses partenaires.</p>
      </div>
      
      <div class="footer-section">
        <h4>Up Sport!</h4>
        <p>Association sportive parisienne pour l'inclusion et la mixité depuis 2016.</p>
        <a href="https://www.unispourlesport.paris/" target="_blank" rel="noopener">
          Site officiel
        </a>
      </div>
      
      <div class="footer-section">
        <h4>Suivez-nous</h4>
        <div class="social-links">
          <a href="https://www.instagram.com/solimouv.festival/" target="_blank" rel="noopener">
            Instagram Solimouv'
          </a>
          <a href="https://www.instagram.com/unispourlesport/" target="_blank" rel="noopener">
            Instagram Up Sport!
          </a>
          <a href="https://www.facebook.com/UpSport.UNis/" target="_blank" rel="noopener">
            Facebook
          </a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 Up Sport! - Tous droits réservés</p>
      <p>Sport inclusif • Mixité • Solidarité • Bienveillance</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #1B5E20;
    color: white;
    padding: 2rem 0 1rem;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .footer-section h3,
  .footer-section h4 {
    margin-bottom: 1rem;
    color: #A5D6A7;
  }
  
  .footer-section p {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    opacity: 0.9;
  }
  
  .footer-section a {
    color: #A5D6A7;
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
    transition: color 0.2s;
  }
  
  .footer-section a:hover {
    color: white;
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .footer-bottom {
    text-align: center;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 1rem;
  }
  
  .footer-bottom p {
    margin: 0.5rem 0;
    opacity: 0.8;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .footer {
      display: none;
    }
  }
</style>
