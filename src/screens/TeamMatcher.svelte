<script>
  let currentStep = 1;
  let showConfirmation = false;
  let formData = {
    // Étape 1: L'ambiance (2 choix maximum)
    ambiance: [],
    
    // Étape 2: Le rythme (1 choix maximum)  
    rythme: '',
    
    // Étape 3: Le sport - activités problématiques (4 choix maximum)
    activitesProblematiques: [],
    
    // Étape 4: L'équipe (1 choix maximum)
    retrouverTeam: ''
  };
  
  // Options pour chaque étape selon l'image
  const ambianceOptions = ['Douceur', 'Partage', 'Énergie', 'Échange', 'Calme', 'Dynamisme'];
  const rythmeOptions = ['Tranquille', 'Modéré', 'Intense'];
  const activitesOptions = ['Sport de contact', 'Hauteur', 'Eau', 'Grands groupes', 'Efforts cardio intenses', 'Bruit fort'];
  const equipeOptions = ['Accompagné(e) du capitaine', 'Je rejoins le groupe', 'En mode explorateur'];
  
  // Fonction pour gérer la sélection multiple avec limites
  function toggleSelection(array, item, maxSelections) {
    const index = array.indexOf(item);
    if (index > -1) {
      // Retirer l'item
      array.splice(index, 1);
    } else if (array.length < maxSelections) {
      // Ajouter l'item si on n'a pas atteint la limite
      array.push(item);
    }
    formData = { ...formData };
  }
  
  // Navigation
  function goNext() {
    if (currentStep < 4) {
      currentStep++;
    }
  }
  
  function goBack() {
    if (currentStep > 1) {
      currentStep--;
    }
  }
  
  function submitForm() {
    // Logique pour traiter le formulaire final
    console.log('Données du formulaire:', formData);
    showConfirmation = true;
  }
  
  function goToHome() {
    window.location.hash = '';
  }
  
  function goToProgram() {
    window.location.hash = 'program';
  }
  
  // Validation pour activer/désactiver le bouton suivant
  $: canProceed = {
    1: formData.ambiance.length > 0,
    2: formData.rythme !== '',
    3: true, // Cette étape est optionnelle
    4: formData.retrouverTeam !== ''
  }[currentStep] ?? false;
  
</script>

<div class="team-matcher">
  {#if !showConfirmation}
    <!-- Header avec icône de retour et barre de progression -->
    <header class="form-header">
      <button class="back-arrow" on:click={() => window.history.back()}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <!-- Barre de progression -->
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress" style="width: {(currentStep / 4) * 100}%"></div>
        </div>
      </div>
    </header>

    <!-- Formulaire principal -->
    <div class="form-container">
    <div class="form-content">
      <!-- Étape 1: L'ambiance -->
      {#if currentStep === 1}
        <div class="step">
          <div class="step-tag ambiance">L'ambiance</div>
          <h1 class="step-title">QUELLE ATMOSPHÈRE VOUS CORRESPOND LE PLUS AUJOURD'HUI ?</h1>
          <p class="step-subtitle">2 choix maximum</p>
          
          <div class="options-grid six-items">
            {#each ambianceOptions as option}
              <button 
                class="option-btn"
                class:selected={formData.ambiance.includes(option)}
                on:click={() => toggleSelection(formData.ambiance, option, 2)}
              >
                {option}
              </button>
            {/each}
          </div>
        </div>
      
      <!-- Étape 2: Le rythme -->
      {:else if currentStep === 2}
        <div class="step">
          <div class="step-tag rythme">Le rythme</div>
          <h1 class="step-title">À QUEL RYTHME AVEZ VOUS ENVIE DE BOUGER ?</h1>
          <p class="step-subtitle">1 choix maximum</p>
          
          <div class="options-grid three-items">
            {#each rythmeOptions as option}
              <button 
                class="option-btn"
                class:selected={formData.rythme === option}
                on:click={() => formData.rythme = option}
              >
                {option}
              </button>
            {/each}
          </div>
        </div>
      
      <!-- Étape 3: Le sport -->
      {:else if currentStep === 3}
        <div class="step">
          <div class="step-tag sport">Le sport</div>
          <h1 class="step-title">Y A-T-IL DES ACTIVITÉS AVEC LESQUELLES VOUS N'ÊTES PAS À L'AISE ?</h1>
          <p class="step-subtitle">4 choix maximum</p>
          
          <div class="options-grid six-items">
            {#each activitesOptions as option}
              <button 
                class="option-btn"
                class:selected={formData.activitesProblematiques.includes(option)}
                on:click={() => toggleSelection(formData.activitesProblematiques, option, 4)}
              >
                {option}
              </button>
            {/each}
          </div>
        </div>
      
      <!-- Étape 4: L'équipe -->
      {:else if currentStep === 4}
        <div class="step">
          <div class="step-tag equipe">L'équipe</div>
          <h1 class="step-title">COMMENT SOUHAITEZ-VOUS RETROUVER VOTRE TEAM AU FESTIVAL ?</h1>
          <p class="step-subtitle">1 choix maximum</p>
          
          <div class="options-grid single-column">
            {#each equipeOptions as option}
              <button 
                class="option-btn"
                class:selected={formData.retrouverTeam === option}
                on:click={() => formData.retrouverTeam = option}
              >
                {option}
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Navigation immédiatement après les options -->
    <div class="form-navigation">
      {#if currentStep > 1}
        <button class="nav-btn secondary" on:click={goBack}>
          Retour
        </button>
      {:else}
        <div></div>
      {/if}
      
      {#if currentStep < 4}
        <button 
          class="nav-btn primary" 
          class:disabled={!canProceed}
          disabled={!canProceed}
          on:click={goNext}
        >
          Suivant 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      {:else}
        <button 
          class="nav-btn primary" 
          class:disabled={!canProceed}
          disabled={!canProceed}
          on:click={submitForm}
        >
          Terminer
        </button>
      {/if}
    </div>
  </div>

  {:else}
    <!-- Page de confirmation -->
    <div class="confirmation-container">
      <div class="confirmation-content">
        <!-- Illustration des mains qui se serrent -->
        <div class="handshake-illustration">
          <img src="/handshake.png" alt="Handshake" class="handshake-img" />
        </div>
        
        <!-- Titre de confirmation -->
        <h1 class="confirmation-title">SUPER ! VOTRE TEAM VOUS ATTEND AU FESTIVAL, AMUSEZ-VOUS BIEN !</h1>
        
        <!-- Boutons d'action -->
        <div class="confirmation-actions">
          <button class="btn-program" on:click={goToProgram}>
            Voir le programme
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <button class="btn-home" on:click={goToHome}>
            Retourner à l'accueil
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=League+Gothic:wght@400;700&family=Poppins:wght@400;500;600;700;900&display=swap');
  
  .team-matcher {
    min-height: 100vh;
    background: white;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
  }
  
  /* Header avec bouton retour */
  .form-header {
    padding: 1rem 1rem 1.5rem;
    background: white;
  }
  
  .back-arrow {
    background: none;
    border: none;
    cursor: pointer;
    color: #FF5722;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s;
  }
  
  .back-arrow:hover {
    background: #FFF3E0;
  }
  
  /* Barre de progression */
  .progress-container {
    margin-top: 1rem;
  }
  
  .progress-bar {
    width: 100%;
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
  }
  
  .progress {
    height: 100%;
    background: #FF5722;
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  /* Container principal du formulaire */
  .form-container {
    flex: 1;
    padding: 1.5rem 1.5rem 1rem;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 120px);
  }
  
  /* Contenu du formulaire */
  .form-content {
    flex: 0 0 auto;
  }
  
  /* Étapes */
  .step {
    text-align: center;
  }
  
  .step-tag {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 20px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: white;
  }
  
  .step-tag.ambiance {
    background: #FF5722;
  }
  
  .step-tag.rythme {
    background: #FF5722;
  }
  
  .step-tag.sport {
    background: #FF5722;
  }
  
  .step-tag.equipe {
    background: #FF5722;
  }
  
  .step-title {
    font-family: 'League Gothic', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.2;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin: 0 0 1rem 0;
  }
  
  .step-subtitle {
    font-family: 'Poppins', sans-serif;
    color: #666;
    font-size: 16px;
    margin-bottom: 2.5rem;
  }
  
  /* Grille d'options */
  .options-grid {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 0;
    justify-content: center;
  }
  
  /* 6 éléments - grille 3x2 compacte */
  .options-grid.six-items {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }
  
  /* 3 éléments - grille 3x1 avec plus d'espace */
  .options-grid.three-items {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    max-width: 90%;
    margin: 0 auto;
  }
  
  /* Éléments en une seule colonne - dernière étape */
  .options-grid.single-column {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 80%;
    margin: 0 auto;
  }
  
  .option-btn {
    padding: 1rem 0.75rem;
    border: 1px solid #e0e0e0;
    background: white;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    text-align: center;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .option-btn:hover {
    border-color: #FF5722;
    background: #FFF3E0;
  }
  
  .option-btn.selected {
    background: #FF5722;
    color: white;
    border-color: #FF5722;
  }
  
  /* Navigation collée aux options */
  .form-navigation {
    background: white;
    padding: 0.75rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-top: 0;
  }
  
  .nav-btn {
    border: none;
    border-radius: 25px;
    padding: 12px 24px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .nav-btn.secondary {
    background: white;
    color: #666;
    border: 1px solid #e0e0e0;
  }
  
  .nav-btn.secondary:hover {
    background: #f5f5f5;
  }
  
  .nav-btn.primary {
    background: #FF5722;
    color: white;
  }
  
  .nav-btn.primary:hover:not(.disabled) {
    background: #E64A19;
  }
  
  .nav-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Responsive Design */
  @media (max-width: 360px) {
    .form-container {
      padding: 1.5rem 1rem;
    }
    
    /* Très petits écrans - garde 3 colonnes mais ajuste les tailles */
    .options-grid.six-items {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.4rem;
    }
    
    .options-grid.three-items {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.4rem;
    }
    
    .options-grid.single-column {
      grid-template-columns: 1fr;
      gap: 0.6rem;
      max-width: 100%;
    }
    
    .option-btn {
      padding: 0.8rem 0.3rem;
      font-size: 14px;
    }
    
    .form-navigation {
      padding: 0.5rem 0;
    }
    
    .nav-btn {
      flex: 1;
      min-width: auto;
    }
  }
  
  @media (min-width: 361px) and (max-width: 768px) {
    .form-container {
      max-width: 500px;
      padding: 2rem;
    }
    
    .options-grid.six-items {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.6rem;
    }
    
    .options-grid.three-items {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.8rem;
    }
    
    .options-grid.single-column {
      grid-template-columns: 1fr;
      gap: 1rem;
      max-width: 70%;
    }
    
    .option-btn {
      padding: 1rem 0.5rem;
    }
  }
  
  @media (min-width: 769px) {
    .form-container {
      max-width: 600px;
      padding: 3rem 2rem;
    }
    
    .options-grid.six-items {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    
    .options-grid.three-items {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.2rem;
    }
    
    .options-grid.single-column {
      grid-template-columns: 1fr;
      gap: 1.2rem;
      max-width: 60%;
    }
    
    .option-btn {
      padding: 1.2rem;
    }
  }

  /* Page de confirmation */
  .confirmation-container {
    min-height: 100vh;
    background: #E8F4E8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
  }

  .confirmation-content {
    text-align: center;
    max-width: 400px;
    width: 100%;
    background: white;
    padding: 3rem 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    position: relative;
  }

  .handshake-illustration {
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 80px;
  }

  .handshake-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .confirmation-title {
    font-family: 'League Gothic', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #2C3E50;
    line-height: 1.3;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin: 0 0 2.5rem 0;
  }

  .confirmation-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .btn-program {
    background: #2C3E50;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 16px 24px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn-program:hover {
    background: #34495e;
    transform: translateY(-2px);
  }

  .btn-home {
    background: none;
    color: #FF5722;
    border: none;
    padding: 16px 24px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn-home:hover {
    background: #FFF3E0;
    border-radius: 25px;
  }

  /* Responsive pour la confirmation */
  @media (max-width: 480px) {
    .confirmation-content {
      padding: 2rem 1.5rem;
    }
    
    .confirmation-title {
      font-size: 22px;
    }
  }
</style>
