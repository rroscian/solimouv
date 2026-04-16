<script>
  // Associations partenaires (basées sur les données du brief)
  const partners = [
    {
      id: 1,
      name: "Up Sport!",
      type: "Organisateur principal",
      description: "Association sportive parisienne pour l'inclusion et la mixité sociale depuis 2016. 250 personnes accompagnées chaque semaine.",
      specialties: ["Sport inclusif", "Public exilé", "Insertion professionnelle", "Activité physique adaptée"],
      website: "https://www.unispourlesport.paris/",
      social: {
        instagram: "unispourlesport",
        facebook: "UpSport.UNis",
        tiktok: "upsportparis"
      },
      contact: "contact@unispourlesport.paris"
    },
    {
      id: 2,
      name: "Handi Club Paris",
      type: "Sport adapté",
      description: "Association dédiée au développement du sport pour les personnes en situation de handicap. Spécialiste du handibasket et de l'escalade adaptée.",
      specialties: ["Handibasket", "Escalade adaptée", "Sport en fauteuil", "Sensibilisation handicap"],
      website: "https://handiclubparis.fr",
      social: { instagram: "handiclubparis" },
      contact: "info@handiclubparis.fr"
    },
    {
      id: 3,
      name: "Boxing Solidaire",
      type: "Combat & Respect",
      description: "Promotion de la boxe éducative comme outil d'insertion sociale et de développement personnel pour tous les publics.",
      specialties: ["Boxe française", "Boxe anglaise", "Sport éducatif", "Prévention violence"],
      website: "#",
      social: { instagram: "boxingsolidaire" },
      contact: "contact@boxingsolidaire.org"
    },
    {
      id: 4,
      name: "Yoga Pour Tous",
      type: "Bien-être & Relaxation",
      description: "Démocratisation du yoga et des pratiques de bien-être. Cours adaptés à tous les corps et toutes les mobilités.",
      specialties: ["Yoga adapté", "Méditation", "Bien-être mental", "Relaxation"],
      website: "#",
      social: { instagram: "yogapourtous" },
      contact: "hello@yogapourtous.com"
    },
    {
      id: 5,
      name: "Urban Dance Collective",
      type: "Danse & Expression",
      description: "Collective de danseurs urbains engagés dans l'inclusion par la danse hip-hop et les cultures urbaines.",
      specialties: ["Hip-hop", "Breakdance", "Expression corporelle", "Culture urbaine"],
      website: "#",
      social: { instagram: "urbandancecollective", tiktok: "urbandancecollectif" },
      contact: "crew@urbandance.paris"
    },
    {
      id: 6,
      name: "Vertical Paris",
      type: "Sports de Montagne",
      description: "Démocratisation de l'escalade et des sports de montagne en milieu urbain. Matériel et encadrement adaptés.",
      specialties: ["Escalade", "Sports de montagne", "Matériel adapté", "Sécurité"],
      website: "#",
      social: { instagram: "verticalparis" },
      contact: "contact@verticalparis.com"
    },
    {
      id: 7,
      name: "Ping Solidaire",
      type: "Sport de Raquette",
      description: "Développement du tennis de table comme sport intergénérationnel et outil de lien social dans les quartiers.",
      specialties: ["Tennis de table", "Intergénérationnel", "Lien social", "Quartiers"],
      website: "#",
      social: { instagram: "pingsolidaire" },
      contact: "ping@solidaire.org"
    },
    {
      id: 8,
      name: "Croix Rouge Paris",
      type: "Premiers Secours",
      description: "Formation aux premiers secours et sensibilisation aux gestes qui sauvent pour tous les publics.",
      specialties: ["Premiers secours", "Formation", "Gestes qui sauvent", "Sécurité"],
      website: "https://croix-rouge.fr",
      social: { instagram: "croixrougefr" },
      contact: "formation.paris@croix-rouge.fr"
    },
    {
      id: 9,
      name: "Sport & Diversité",
      type: "Inclusion & Mixité",
      description: "Promotion de la diversité dans le sport et lutte contre les discriminations. Actions de sensibilisation et d'accompagnement.",
      specialties: ["Anti-discrimination", "LGBTQIA+", "Diversité", "Sensibilisation"],
      website: "#",
      social: { instagram: "sportdiversite" },
      contact: "contact@sportdiversite.org"
    },
    {
      id: 10,
      name: "Générations Sport",
      type: "Intergénérationnel",
      description: "Activités sportives qui rapprochent les générations. Sport adapté aux seniors et activités famille.",
      specialties: ["Sport senior", "Intergénérationnel", "Sport famille", "Activité physique adaptée"],
      website: "#",
      social: { instagram: "generationssport" },
      contact: "contact@generationssport.fr"
    }
  ];
  
  const partnerTypes = [
    { name: "Tous", filter: "all" },
    { name: "Sport adapté", filter: "Sport adapté" },
    { name: "Inclusion & Mixité", filter: "Inclusion & Mixité" },
    { name: "Bien-être", filter: "Bien-être & Relaxation" },
    { name: "Combat & Arts Martiaux", filter: "Combat & Respect" }
  ];
  
  let selectedFilter = "all";
  
  $: filteredPartners = selectedFilter === "all" 
    ? partners 
    : partners.filter(partner => partner.type === selectedFilter);
</script>

<div class="partners">
  <section class="hero-partners">
    <div class="container">
      <h1>Nos Associations Partenaires</h1>
      <p class="hero-subtitle">
        Un réseau d'associations engagées qui font de Solimouv' un événement unique. 
        Chaque partenaire apporte son expertise pour créer une expérience sportive inclusive et enrichissante.
      </p>
      <div class="partners-stats">
        <div class="stat">
          <strong>13+</strong>
          <span>Associations partenaires</span>
        </div>
        <div class="stat">
          <strong>20+</strong>
          <span>Activités proposées</span>
        </div>
        <div class="stat">
          <strong>100%</strong>
          <span>Engagement inclusif</span>
        </div>
      </div>
    </div>
  </section>
  
  <section class="filters">
    <div class="container">
      <h2>Explorer par spécialité</h2>
      <div class="filter-buttons">
        {#each partnerTypes as type}
          <button 
            class="filter-btn" 
            class:active={selectedFilter === type.filter}
            on:click={() => selectedFilter = type.filter}
          >
            {type.name}
          </button>
        {/each}
      </div>
    </div>
  </section>
  
  <section class="partners-grid-section">
    <div class="container">
      <div class="partners-grid">
        {#each filteredPartners as partner}
          <div class="partner-card">
            <div class="partner-header">
              <h3>{partner.name}</h3>
              <span class="partner-type">{partner.type}</span>
            </div>
            
            <p class="partner-description">{partner.description}</p>
            
            <div class="specialties">
              <h4>Spécialités :</h4>
              <div class="specialty-tags">
                {#each partner.specialties as specialty}
                  <span class="specialty-tag">{specialty}</span>
                {/each}
              </div>
            </div>
            
            <div class="partner-contact">
              {#if partner.website && partner.website !== "#"}
                <a href={partner.website} target="_blank" rel="noopener" class="website-link">
                  🌐 Site web
                </a>
              {/if}
              
              {#if partner.social}
                <div class="social-links">
                  {#if partner.social.instagram}
                    <a href="https://instagram.com/{partner.social.instagram}" target="_blank" rel="noopener">
                      📸 Instagram
                    </a>
                  {/if}
                  {#if partner.social.facebook}
                    <a href="https://facebook.com/{partner.social.facebook}" target="_blank" rel="noopener">
                      👥 Facebook
                    </a>
                  {/if}
                  {#if partner.social.tiktok}
                    <a href="https://tiktok.com/@{partner.social.tiktok}" target="_blank" rel="noopener">
                      🎵 TikTok
                    </a>
                  {/if}
                </div>
              {/if}
              
              <div class="email-contact">
                📧 {partner.contact}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <section class="become-partner">
    <div class="container">
      <h2>Devenir Partenaire</h2>
      <div class="become-partner-content">
        <div class="partner-benefits">
          <h3>Pourquoi rejoindre Solimouv' ?</h3>
          <div class="benefits-grid">
            <div class="benefit">
              <div class="benefit-icon">🤝</div>
              <h4>Réseau Solidaire</h4>
              <p>Rejoignez un réseau d'associations engagées dans l'inclusion par le sport.</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">👥</div>
              <h4>Nouveaux Publics</h4>
              <p>Touchez de nouveaux participants et étendez votre impact social.</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">📢</div>
              <h4>Visibilité</h4>
              <p>Bénéficiez de la communication du festival pour promouvoir vos activités.</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">🎯</div>
              <h4>Mission Partagée</h4>
              <p>Participez à un projet collectif au service du sport pour tous.</p>
            </div>
          </div>
        </div>
        
        <div class="partner-criteria">
          <h3>Critères de Partenariat</h3>
          <ul>
            <li><strong>Engagement inclusif :</strong> Activités ouvertes à tous les publics</li>
            <li><strong>Valeurs partagées :</strong> Mixité, solidarité, bienveillance</li>
            <li><strong>Encadrement qualifié :</strong> Professionnels formés à l'inclusion</li>
            <li><strong>Accessibilité :</strong> Capacité d'adaptation aux différents besoins</li>
            <li><strong>Engagement bénévole :</strong> Participation active au festival</li>
          </ul>
          
          <div class="contact-cta">
            <h4>Intéressé.e ?</h4>
            <p>Contactez Up Sport! pour discuter d'un partenariat :</p>
            <a href="mailto:partenariat@unispourlesport.paris" class="btn-primary">
              Proposer un Partenariat
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="testimonials">
    <div class="container">
      <h2>Témoignages Partenaires</h2>
      <div class="testimonials-grid">
        <div class="testimonial">
          <p>"Solimouv' incarne parfaitement nos valeurs d'inclusion. C'est un honneur de participer à cet événement qui change vraiment les mentalités."</p>
          <div class="testimonial-author">
            <strong>Marie Dubois</strong>
            <span>Présidente, Handi Club Paris</span>
          </div>
        </div>
        <div class="testimonial">
          <p>"Un événement qui nous permet de montrer que le sport est vraiment pour tous. L'organisation est remarquable et l'ambiance extraordinaire."</p>
          <div class="testimonial-author">
            <strong>Ahmed Ben Ali</strong>
            <span>Coordinateur, Boxing Solidaire</span>
          </div>
        </div>
        <div class="testimonial">
          <p>"Grâce à Solimouv', nous avons pu sensibiliser des centaines de personnes aux premiers secours. Une belle mission de service public."</p>
          <div class="testimonial-author">
            <strong>Claire Martin</strong>
            <span>Formatrice, Croix Rouge Paris</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .partners {
    min-height: 100vh;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .hero-partners {
    background: linear-gradient(135deg, #1B5E20, #4CAF50);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }
  
  .hero-partners h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto 3rem;
    line-height: 1.6;
  }
  
  .partners-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }
  
  .stat {
    text-align: center;
  }
  
  .stat strong {
    display: block;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .stat span {
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  .filters {
    padding: 3rem 0;
    background: #f8f9fa;
  }
  
  .filters h2 {
    color: #2E7D32;
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .filter-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .filter-btn {
    background: white;
    color: #2E7D32;
    border: 2px solid #2E7D32;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }
  
  .filter-btn:hover,
  .filter-btn.active {
    background: #2E7D32;
    color: white;
  }
  
  .partners-grid-section {
    padding: 4rem 0;
    background: white;
  }
  
  .partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }
  
  .partner-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
    border-left: 4px solid #4CAF50;
    transition: transform 0.2s;
  }
  
  .partner-card:hover {
    transform: translateY(-4px);
  }
  
  .partner-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .partner-header h3 {
    color: #2E7D32;
    font-size: 1.5rem;
    margin: 0;
  }
  
  .partner-type {
    background: #2E7D32;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .partner-description {
    color: #333;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .specialties h4 {
    color: #2E7D32;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .specialty-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .specialty-tag {
    background: #E8F5E8;
    color: #1B5E20;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .partner-contact {
    border-top: 1px solid #ddd;
    padding-top: 1rem;
  }
  
  .website-link {
    display: inline-block;
    color: #2E7D32;
    text-decoration: none;
    font-weight: 500;
    margin-bottom: 0.5rem;
    transition: color 0.2s;
  }
  
  .website-link:hover {
    color: #1B5E20;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }
  
  .social-links a {
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
  }
  
  .social-links a:hover {
    color: #2E7D32;
  }
  
  .email-contact {
    color: #666;
    font-size: 0.9rem;
  }
  
  .become-partner {
    padding: 4rem 0;
    background: #f8f9fa;
  }
  
  .become-partner h2 {
    color: #2E7D32;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .become-partner-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  
  .partner-benefits h3,
  .partner-criteria h3 {
    color: #2E7D32;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .benefit {
    text-align: center;
    padding: 1rem;
  }
  
  .benefit-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .benefit h4 {
    color: #2E7D32;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  
  .benefit p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .partner-criteria ul {
    list-style: none;
    padding: 0;
    margin-bottom: 2rem;
  }
  
  .partner-criteria li {
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
    color: #333;
  }
  
  .partner-criteria li:last-child {
    border-bottom: none;
  }
  
  .contact-cta {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    border: 2px solid #E8F5E8;
  }
  
  .contact-cta h4 {
    color: #2E7D32;
    margin-bottom: 1rem;
  }
  
  .contact-cta p {
    margin-bottom: 1.5rem;
    color: #666;
  }
  
  .btn-primary {
    display: inline-block;
    background: #2E7D32;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
  }
  
  .btn-primary:hover {
    background: #1B5E20;
    transform: translateY(-2px);
  }
  
  .testimonials {
    padding: 4rem 0;
    background: #2E7D32;
    color: white;
  }
  
  .testimonials h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .testimonial {
    background: rgba(255,255,255,0.1);
    padding: 2rem;
    border-radius: 12px;
  }
  
  .testimonial p {
    font-style: italic;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  .testimonial-author strong {
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .testimonial-author span {
    opacity: 0.8;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .hero-partners h1 {
      font-size: 2.5rem;
    }
    
    .partners-stats {
      gap: 2rem;
    }
    
    .partners-grid {
      grid-template-columns: 1fr;
    }
    
    .become-partner-content {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .benefits-grid {
      grid-template-columns: 1fr;
    }
    
    .partner-header {
      flex-direction: column;
      align-items: start;
    }
    
    .filter-buttons {
      justify-content: center;
    }
    
    .social-links {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>
