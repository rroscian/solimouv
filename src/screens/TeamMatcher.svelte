<script>
  import { onMount } from 'svelte';
  
  let currentStep = 1;
  let userProfile = {
    // Profil de base
    name: '',
    email: '',
    age: 25,
    
    // Préférences sportives
    preferredSports: [],
    skillLevel: 'beginner',
    availability: [],
    
    // Personnalité & social
    personality: 'balanced',
    teamSize: 'small',
    leadership: 'follower',
    competitiveness: 'recreational',
    
    // Objectifs & motivation
    goals: [],
    commitment: 'casual',
    
    // Accessibilité
    mobility: 'normal',
    accessibilityNeeds: [],
    
    // Localisation (simulation)
    location: 'paris_centre'
  };
  
  let matchingResults = [];
  let isMatching = false;
  let showResults = false;
  let selectedMatches = [];
  let emailSent = false;
  
  const sportOptions = [
    'Football', 'Basketball', 'Tennis', 'Volleyball', 'Badminton', 
    'Yoga', 'Danse', 'Course', 'Cyclisme', 'Escalade', 'Natation'
  ];
  
  const availabilitySlots = [
    'Lundi matin', 'Lundi soir', 'Mardi matin', 'Mardi soir',
    'Mercredi matin', 'Mercredi soir', 'Jeudi matin', 'Jeudi soir',
    'Vendredi matin', 'Vendredi soir', 'Samedi matin', 'Samedi soir',
    'Dimanche matin', 'Dimanche soir'
  ];
  
  const goalOptions = [
    'Rester en forme', 'Rencontrer des gens', 'Compétition', 
    'Dépassement de soi', 'Détente', 'Apprentissage', 'Fun'
  ];
  
  // Données simulées de participants
  const mockParticipants = [
    {
      id: 1,
      name: "Marie D.",
      age: 28,
      sports: ['Yoga', 'Course'],
      personality: 'calm',
      goals: ['Rester en forme', 'Détente'],
      compatibility: 95,
      avatar: "👩‍🦰",
      bio: "Passionnée de bien-être, recherche partenaire pour sessions yoga et course douce."
    },
    {
      id: 2,
      name: "Ahmed K.",
      age: 32,
      sports: ['Football', 'Basketball'],
      personality: 'energetic',
      goals: ['Compétition', 'Fun'],
      compatibility: 88,
      avatar: "🧑‍🦱",
      bio: "Ex-footballeur amateur, motivation et bonne humeur garanties !"
    },
    {
      id: 3,
      name: "Sophie L.",
      age: 24,
      sports: ['Danse', 'Volleyball'],
      personality: 'social',
      goals: ['Rencontrer des gens', 'Fun'],
      compatibility: 92,
      avatar: "👩‍🦳",
      bio: "Danseuse hip-hop, j'adore les sports d'équipe et l'énergie collective."
    },
    {
      id: 4,
      name: "Julien M.",
      age: 35,
      sports: ['Tennis', 'Cyclisme'],
      personality: 'competitive',
      goals: ['Compétition', 'Dépassement de soi'],
      compatibility: 79,
      avatar: "🧑‍🦲",
      bio: "Sportif régulier, cherche partenaires motivés pour progresser ensemble."
    },
    {
      id: 5,
      name: "Emma R.",
      age: 22,
      sports: ['Escalade', 'Yoga'],
      personality: 'adventurous',
      goals: ['Apprentissage', 'Dépassement de soi'],
      compatibility: 85,
      avatar: "👩‍🦱",
      bio: "Toujours prête pour de nouveaux défis, dans la bienveillance !"
    }
  ];
  
  function toggleArrayItem(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(item);
    }
    userProfile = { ...userProfile };
  }
  
  function calculateMatching() {
    isMatching = true;
    
    // Simulation d'algorithme de matching
    setTimeout(() => {
      matchingResults = mockParticipants
        .map(participant => ({
          ...participant,
          compatibility: calculateCompatibilityScore(participant)
        }))
        .filter(p => p.compatibility > 70)
        .sort((a, b) => b.compatibility - a.compatibility)
        .slice(0, 4);
      
      isMatching = false;
      showResults = true;
    }, 2000);
  }
  
  function calculateCompatibilityScore(participant) {
    let score = 0;
    
    // Sports en commun (30 points max)
    const commonSports = participant.sports.filter(sport => 
      userProfile.preferredSports.includes(sport)
    );
    score += Math.min(commonSports.length * 15, 30);
    
    // Objectifs similaires (25 points max)
    const commonGoals = participant.goals.filter(goal =>
      userProfile.goals.includes(goal)
    );
    score += Math.min(commonGoals.length * 8, 25);
    
    // Age compatible (20 points max)
    const ageDiff = Math.abs(participant.age - userProfile.age);
    if (ageDiff <= 5) score += 20;
    else if (ageDiff <= 10) score += 15;
    else if (ageDiff <= 15) score += 10;
    
    // Personnalité complémentaire (25 points max)
    if (userProfile.personality === participant.personality) score += 15;
    else if (
      (userProfile.personality === 'calm' && participant.personality === 'balanced') ||
      (userProfile.personality === 'social' && participant.personality === 'energetic')
    ) score += 20;
    else score += 10;
    
    return Math.min(Math.floor(score + Math.random() * 10), 100);
  }
  
  function toggleMatchSelection(matchId) {
    const index = selectedMatches.indexOf(matchId);
    if (index > -1) {
      selectedMatches.splice(index, 1);
    } else {
      selectedMatches.push(matchId);
    }
    selectedMatches = [...selectedMatches];
  }
  
  function sendMatchingEmail() {
    // Simulation d'envoi d'email
    emailSent = true;
    
    setTimeout(() => {
      emailSent = false;
      alert(`Email envoyé à ${userProfile.email} avec ${selectedMatches.length} contact(s) sélectionné(s) !`);
    }, 1500);
  }
  
  function resetMatcher() {
    currentStep = 1;
    showResults = false;
    selectedMatches = [];
    emailSent = false;
  }
</script>

<div class="team-matcher">
  <section class="hero">
    <div class="container">
      <h1>🤝 Trouvez Votre Équipe Solimouv'</h1>
      <p class="hero-subtitle">
        Connectez-vous avec d'autres participants qui partagent vos passions sportives 
        et vos objectifs. Le sport, c'est encore mieux ensemble !
      </p>
    </div>
  </section>
  
  {#if !showResults}
    <section class="questionnaire">
      <div class="container">
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress" style="width: {(currentStep / 6) * 100}%"></div>
          </div>
          <span class="step-indicator">Étape {currentStep}/6</span>
        </div>
        
        <div class="question-card">
          {#if currentStep === 1}
            <h2>👋 Présentez-vous</h2>
            <div class="form-grid">
              <div class="form-group">
                <label>Prénom *</label>
                <input type="text" bind:value={userProfile.name} placeholder="Marie" />
              </div>
              <div class="form-group">
                <label>Email *</label>
                <input type="email" bind:value={userProfile.email} placeholder="marie@email.com" />
              </div>
              <div class="form-group">
                <label>Age</label>
                <input type="number" bind:value={userProfile.age} min="16" max="80" />
              </div>
            </div>
            
          {:else if currentStep === 2}
            <h2>🏃‍♀️ Vos Sports Préférés</h2>
            <p>Sélectionnez 2-4 sports qui vous intéressent le plus :</p>
            <div class="sports-grid">
              {#each sportOptions as sport}
                <button 
                  class="sport-option"
                  class:selected={userProfile.preferredSports.includes(sport)}
                  on:click={() => toggleArrayItem(userProfile.preferredSports, sport)}
                >
                  {sport}
                </button>
              {/each}
            </div>
            <div class="form-group">
              <label>Niveau général</label>
              <select bind:value={userProfile.skillLevel}>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>
            
          {:else if currentStep === 3}
            <h2>📅 Vos Disponibilités</h2>
            <p>Quand êtes-vous généralement disponible ?</p>
            <div class="availability-grid">
              {#each availabilitySlots as slot}
                <button 
                  class="availability-slot"
                  class:selected={userProfile.availability.includes(slot)}
                  on:click={() => toggleArrayItem(userProfile.availability, slot)}
                >
                  {slot}
                </button>
              {/each}
            </div>
            
          {:else if currentStep === 4}
            <h2>🎭 Votre Personnalité Sportive</h2>
            <div class="personality-options">
              <label class="personality-card">
                <input type="radio" bind:group={userProfile.personality} value="calm" />
                <div class="card-content">
                  <h3>🧘‍♀️ Zen</h3>
                  <p>Privilégie la détente et la progression personnelle</p>
                </div>
              </label>
              <label class="personality-card">
                <input type="radio" bind:group={userProfile.personality} value="social" />
                <div class="card-content">
                  <h3>🎉 Social</h3>
                  <p>Adore rencontrer du monde et créer des liens</p>
                </div>
              </label>
              <label class="personality-card">
                <input type="radio" bind:group={userProfile.personality} value="energetic" />
                <div class="card-content">
                  <h3>⚡ Énergique</h3>
                  <p>Dynamique et motivant pour les autres</p>
                </div>
              </label>
              <label class="personality-card">
                <input type="radio" bind:group={userProfile.personality} value="competitive" />
                <div class="card-content">
                  <h3>🏆 Compétitif</h3>
                  <p>Aime la performance et les défis</p>
                </div>
              </label>
              <label class="personality-card">
                <input type="radio" bind:group={userProfile.personality} value="balanced" />
                <div class="card-content">
                  <h3>⚖️ Équilibré</h3>
                  <p>Un peu de tout selon l'humeur</p>
                </div>
              </label>
            </div>
            
          {:else if currentStep === 5}
            <h2>🎯 Vos Objectifs</h2>
            <p>Qu'est-ce qui vous motive dans le sport ?</p>
            <div class="goals-grid">
              {#each goalOptions as goal}
                <button 
                  class="goal-option"
                  class:selected={userProfile.goals.includes(goal)}
                  on:click={() => toggleArrayItem(userProfile.goals, goal)}
                >
                  {goal}
                </button>
              {/each}
            </div>
            
            <div class="form-group">
              <label>Engagement souhaité</label>
              <select bind:value={userProfile.commitment}>
                <option value="casual">Occasionnel (1x/mois)</option>
                <option value="regular">Régulier (1x/semaine)</option>
                <option value="intensive">Intensif (2-3x/semaine)</option>
              </select>
            </div>
            
          {:else if currentStep === 6}
            <h2>♿ Besoins Particuliers</h2>
            <div class="form-group">
              <label>Mobilité</label>
              <select bind:value={userProfile.mobility}>
                <option value="normal">Normale</option>
                <option value="reduced">Réduite</option>
                <option value="wheelchair">Fauteuil roulant</option>
              </select>
            </div>
            
            <p>Avez-vous des besoins d'accessibilité spécifiques ?</p>
            <div class="accessibility-options">
              {#each ['Accompagnement', 'Matériel adapté', 'Communication visuelle', 'Communication gestuelle', 'Rythme adapté'] as need}
                <button 
                  class="accessibility-option"
                  class:selected={userProfile.accessibilityNeeds.includes(need)}
                  on:click={() => toggleArrayItem(userProfile.accessibilityNeeds, need)}
                >
                  {need}
                </button>
              {/each}
            </div>
            
            <div class="final-check">
              <h3>🎯 Récapitulatif</h3>
              <div class="summary">
                <p><strong>Sports:</strong> {userProfile.preferredSports.join(', ')}</p>
                <p><strong>Disponibilités:</strong> {userProfile.availability.length} créneaux</p>
                <p><strong>Objectifs:</strong> {userProfile.goals.join(', ')}</p>
              </div>
            </div>
          {/if}
        </div>
        
        <div class="navigation">
          {#if currentStep > 1}
            <button class="btn-secondary" on:click={() => currentStep--}>
              ← Précédent
            </button>
          {/if}
          
          {#if currentStep < 6}
            <button 
              class="btn-primary"
              disabled={
                (currentStep === 1 && (!userProfile.name || !userProfile.email)) ||
                (currentStep === 2 && userProfile.preferredSports.length === 0) ||
                (currentStep === 5 && userProfile.goals.length === 0)
              }
              on:click={() => currentStep++}
            >
              Suivant →
            </button>
          {:else}
            <button 
              class="btn-primary btn-large"
              on:click={calculateMatching}
              disabled={isMatching || userProfile.preferredSports.length === 0}
            >
              {isMatching ? '🔍 Recherche en cours...' : '🤝 Trouver mon équipe !'}
            </button>
          {/if}
        </div>
      </div>
    </section>
    
  {:else}
    <section class="results">
      <div class="container">
        <div class="results-header">
          <h2>🎉 Vos Partenaires Sportifs</h2>
          <p>Voici {matchingResults.length} participant(s) compatibles avec votre profil :</p>
        </div>
        
        <div class="matches-grid">
          {#each matchingResults as match}
            <div class="match-card" class:selected={selectedMatches.includes(match.id)}>
              <div class="match-header">
                <span class="avatar">{match.avatar}</span>
                <div class="match-info">
                  <h3>{match.name}</h3>
                  <div class="compatibility">
                    <span class="score">{match.compatibility}%</span>
                    <span class="label">compatibilité</span>
                  </div>
                </div>
                <button 
                  class="select-btn"
                  class:selected={selectedMatches.includes(match.id)}
                  on:click={() => toggleMatchSelection(match.id)}
                >
                  {selectedMatches.includes(match.id) ? '✓' : '+'}
                </button>
              </div>
              
              <p class="bio">{match.bio}</p>
              
              <div class="match-details">
                <div class="detail-row">
                  <strong>Sports:</strong> 
                  <span class="tags">
                    {#each match.sports as sport}
                      <span class="tag">{sport}</span>
                    {/each}
                  </span>
                </div>
                <div class="detail-row">
                  <strong>Objectifs:</strong>
                  <span>{match.goals.join(', ')}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
        
        <div class="actions">
          <div class="email-section">
            <h3>📧 Recevoir les contacts</h3>
            <p>Sélectionnez les personnes qui vous intéressent et recevez leurs coordonnées par email.</p>
            
            <div class="email-controls">
              <input 
                type="email" 
                bind:value={userProfile.email} 
                placeholder="votre@email.com"
                class="email-input"
              />
              <button 
                class="btn-primary"
                disabled={selectedMatches.length === 0 || !userProfile.email || emailSent}
                on:click={sendMatchingEmail}
              >
                {#if emailSent}
                  ✅ Envoyé !
                {:else}
                  📤 Envoyer ({selectedMatches.length})
                {/if}
              </button>
            </div>
          </div>
          
          <div class="secondary-actions">
            <button class="btn-secondary" on:click={resetMatcher}>
              🔄 Refaire le test
            </button>
            <button class="btn-secondary" on:click={() => window.location.hash = 'contact'}>
              📞 Nous contacter
            </button>
          </div>
        </div>
      </div>
    </section>
  {/if}
</div>

<style>
  .team-matcher {
    min-height: 100vh;
    background: linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 50%, #E8F5E8 100%);
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .hero {
    padding: 3rem 0;
    text-align: center;
    background: linear-gradient(135deg, #2E7D32, #4CAF50);
    color: white;
  }
  
  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  .questionnaire {
    padding: 3rem 0;
  }
  
  .progress-container {
    margin-bottom: 2rem;
  }
  
  .progress-bar {
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  
  .progress {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #66BB6A);
    transition: width 0.3s ease;
  }
  
  .step-indicator {
    color: #666;
    font-size: 0.9rem;
  }
  
  .question-card {
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }
  
  .question-card h2 {
    color: #2E7D32;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
  
  .question-card p {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #4CAF50;
  }
  
  .sports-grid,
  .availability-grid,
  .goals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .sport-option,
  .availability-slot,
  .goal-option,
  .accessibility-option {
    padding: 0.75rem;
    border: 2px solid #ddd;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    font-size: 0.9rem;
  }
  
  .sport-option:hover,
  .availability-slot:hover,
  .goal-option:hover,
  .accessibility-option:hover {
    border-color: #4CAF50;
  }
  
  .sport-option.selected,
  .availability-slot.selected,
  .goal-option.selected,
  .accessibility-option.selected {
    background: #4CAF50;
    color: white;
    border-color: #4CAF50;
  }
  
  .personality-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .personality-card {
    cursor: pointer;
  }
  
  .personality-card input[type="radio"] {
    display: none;
  }
  
  .card-content {
    padding: 1.5rem;
    border: 2px solid #ddd;
    border-radius: 12px;
    text-align: center;
    transition: all 0.2s;
  }
  
  .card-content h3 {
    color: #2E7D32;
    margin-bottom: 0.5rem;
  }
  
  .card-content p {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
  }
  
  .personality-card:hover .card-content {
    border-color: #4CAF50;
  }
  
  .personality-card input[type="radio"]:checked + .card-content {
    background: #4CAF50;
    color: white;
    border-color: #4CAF50;
  }
  
  .personality-card input[type="radio"]:checked + .card-content h3,
  .personality-card input[type="radio"]:checked + .card-content p {
    color: white;
  }
  
  .accessibility-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .final-check {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #F1F8E9;
    border-radius: 8px;
  }
  
  .final-check h3 {
    color: #2E7D32;
    margin-bottom: 1rem;
  }
  
  .summary p {
    margin: 0.5rem 0;
    color: #333;
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
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
    background: #4CAF50;
    color: white;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: #45a049;
    transform: translateY(-2px);
  }
  
  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .btn-large {
    padding: 1.2rem 3rem;
    font-size: 1.1rem;
  }
  
  .btn-secondary {
    background: white;
    color: #4CAF50;
    border: 2px solid #4CAF50;
  }
  
  .btn-secondary:hover {
    background: #4CAF50;
    color: white;
  }
  
  .results {
    padding: 3rem 0;
  }
  
  .results-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .results-header h2 {
    color: #2E7D32;
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
  
  .matches-grid {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .match-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  
  .match-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  }
  
  .match-card.selected {
    border-color: #4CAF50;
    background: #F1F8E9;
  }
  
  .match-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .avatar {
    font-size: 3rem;
    flex-shrink: 0;
  }
  
  .match-info {
    flex: 1;
  }
  
  .match-info h3 {
    color: #2E7D32;
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
  }
  
  .compatibility {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .score {
    background: #4CAF50;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-weight: bold;
    font-size: 0.9rem;
  }
  
  .label {
    color: #666;
    font-size: 0.8rem;
  }
  
  .select-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #ddd;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.2s;
  }
  
  .select-btn:hover {
    border-color: #4CAF50;
  }
  
  .select-btn.selected {
    background: #4CAF50;
    color: white;
    border-color: #4CAF50;
  }
  
  .bio {
    color: #666;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-style: italic;
  }
  
  .match-details {
    space-y: 0.75rem;
  }
  
  .detail-row {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .detail-row strong {
    color: #2E7D32;
    flex-shrink: 0;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  
  .tag {
    background: #E8F5E8;
    color: #2E7D32;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
  }
  
  .actions {
    background: white;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }
  
  .email-section {
    margin-bottom: 2rem;
  }
  
  .email-section h3 {
    color: #2E7D32;
    margin-bottom: 1rem;
  }
  
  .email-section p {
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .email-controls {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .email-input {
    flex: 1;
    min-width: 200px;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  .email-input:focus {
    outline: none;
    border-color: #4CAF50;
  }
  
  .secondary-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }
    
    .question-card {
      padding: 2rem;
    }
    
    .form-grid,
    .sports-grid,
    .availability-grid,
    .goals-grid,
    .personality-options,
    .accessibility-options {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
    
    .navigation {
      justify-content: center;
    }
    
    .btn-primary,
    .btn-secondary {
      flex: 1;
      min-width: 120px;
    }
    
    .email-controls {
      flex-direction: column;
    }
    
    .email-input {
      min-width: auto;
    }
  }
</style>
