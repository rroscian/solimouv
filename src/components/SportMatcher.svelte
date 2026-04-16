<script>
  import { onMount } from 'svelte';
  import { findMatchingSports } from '../utils/rustMatcher.js';
  
  let currentStep = 1;
  let userProfile = {
    age: 25,
    mobilityLevel: 'medium',
    experienceLevel: 'beginner',
    interests: [],
    accessibilityNeeds: [],
    socialPreferences: 'any'
  };
  
  let recommendations = [];
  let isLoading = false;
  let showResults = false;
  
  const sportInterests = [
    'football', 'basketball', 'tennis', 'dance', 'yoga', 'boxe', 
    'escalade', 'natation', 'course', 'musculation', 'cyclisme'
  ];
  
  const accessibilityOptions = [
    'pmr', 'wheelchair', 'senior', 'beginner', 'visual_impairment', 
    'hearing_impairment', 'cognitive_support'
  ];
  
  function toggleInterest(interest) {
    if (userProfile.interests.includes(interest)) {
      userProfile.interests = userProfile.interests.filter(i => i !== interest);
    } else {
      userProfile.interests = [...userProfile.interests, interest];
    }
  }
  
  function toggleAccessibility(option) {
    if (userProfile.accessibilityNeeds.includes(option)) {
      userProfile.accessibilityNeeds = userProfile.accessibilityNeeds.filter(n => n !== option);
    } else {
      userProfile.accessibilityNeeds = [...userProfile.accessibilityNeeds, option];
    }
  }
  
  async function getRecommendations() {
    isLoading = true;
    try {
      recommendations = await findMatchingSports(userProfile);
      showResults = true;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      recommendations = ['Football Inclusif', 'Yoga Adapté', 'Tennis de Table'];
      showResults = true;
    } finally {
      isLoading = false;
    }
  }
  
  function resetQuiz() {
    currentStep = 1;
    showResults = false;
    userProfile = {
      age: 25,
      mobilityLevel: 'medium',
      experienceLevel: 'beginner',
      interests: [],
      accessibilityNeeds: [],
      socialPreferences: 'any'
    };
    recommendations = [];
  }
</script>

{#if !showResults}
  <div class="sport-matcher">
    <div class="progress-bar">
      <div class="progress" style="width: {(currentStep / 4) * 100}%"></div>
    </div>
    
    <div class="step-content">
      {#if currentStep === 1}
        <h2>Parlez-nous de vous</h2>
        <div class="form-group">
          <label for="age">Votre âge :</label>
          <input type="number" id="age" bind:value={userProfile.age} min="5" max="100" />
        </div>
        
        <div class="form-group">
          <label for="mobility">Niveau de mobilité :</label>
          <select id="mobility" bind:value={userProfile.mobilityLevel}>
            <option value="high">Haute mobilité</option>
            <option value="medium">Mobilité moyenne</option>
            <option value="low">Mobilité réduite</option>
            <option value="adapted">Besoin d'adaptation spécifique</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="experience">Expérience sportive :</label>
          <select id="experience" bind:value={userProfile.experienceLevel}>
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
          </select>
        </div>
        
      {:else if currentStep === 2}
        <h2>Vos centres d'intérêt</h2>
        <p>Sélectionnez les sports qui vous attirent :</p>
        <div class="interests-grid">
          {#each sportInterests as interest}
            <button 
              class="interest-btn"
              class:selected={userProfile.interests.includes(interest)}
              on:click={() => toggleInterest(interest)}
            >
              {interest}
            </button>
          {/each}
        </div>
        
      {:else if currentStep === 3}
        <h2>Besoins d'accessibilité</h2>
        <p>Sélectionnez si vous avez des besoins spécifiques :</p>
        <div class="accessibility-grid">
          {#each accessibilityOptions as option}
            <button 
              class="accessibility-btn"
              class:selected={userProfile.accessibilityNeeds.includes(option)}
              on:click={() => toggleAccessibility(option)}
            >
              {#if option === 'pmr'}
                Personne à mobilité réduite
              {:else if option === 'wheelchair'}
                Fauteuil roulant
              {:else if option === 'senior'}
                Senior (60+)
              {:else if option === 'beginner'}
                Grand débutant
              {:else if option === 'visual_impairment'}
                Déficience visuelle
              {:else if option === 'hearing_impairment'}
                Déficience auditive
              {:else if option === 'cognitive_support'}
                Accompagnement cognitif
              {:else}
                {option}
              {/if}
            </button>
          {/each}
        </div>
        
      {:else if currentStep === 4}
        <h2>Préférences sociales</h2>
        <p>Comment préférez-vous pratiquer ?</p>
        <div class="social-options">
          <label class="radio-option">
            <input type="radio" bind:group={userProfile.socialPreferences} value="individual" />
            <span>Activité individuelle</span>
          </label>
          <label class="radio-option">
            <input type="radio" bind:group={userProfile.socialPreferences} value="small_group" />
            <span>Petit groupe (2-8 personnes)</span>
          </label>
          <label class="radio-option">
            <input type="radio" bind:group={userProfile.socialPreferences} value="large_group" />
            <span>Grand groupe (8+ personnes)</span>
          </label>
          <label class="radio-option">
            <input type="radio" bind:group={userProfile.socialPreferences} value="any" />
            <span>Peu importe</span>
          </label>
        </div>
      {/if}
    </div>
    
    <div class="navigation-buttons">
      {#if currentStep > 1}
        <button class="btn-secondary" on:click={() => currentStep--}>
          Précédent
        </button>
      {/if}
      
      {#if currentStep < 4}
        <button class="btn-primary" on:click={() => currentStep++}>
          Suivant
        </button>
      {:else}
        <button class="btn-primary" on:click={getRecommendations} disabled={isLoading}>
          {isLoading ? 'Calcul en cours...' : 'Obtenir mes recommandations'}
        </button>
      {/if}
    </div>
  </div>

{:else}
  <div class="results">
    <h2>Vos Sports Recommandés</h2>
    <p>Basé sur votre profil, voici les activités Solimouv' qui vous correspondent le mieux :</p>
    
    <div class="recommendations">
      {#each recommendations as sport, index}
        <div class="recommendation-card" style="animation-delay: {index * 0.1}s">
          <div class="rank">#{index + 1}</div>
          <h3>{sport}</h3>
          <p>Cette activité correspond parfaitement à votre profil !</p>
        </div>
      {/each}
    </div>
    
    <div class="results-actions">
      <button class="btn-primary" on:click={resetQuiz}>
        Refaire le Test
      </button>
      <button class="btn-secondary" on:click={() => window.location.hash = 'program'}>
        Voir le Programme Complet
      </button>
    </div>
  </div>
{/if}

<style>
  .sport-matcher {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .progress-bar {
    width: 100%;
    height: 8px;
    background: #f0f0f0;
    border-radius: 4px;
    margin-bottom: 2rem;
    overflow: hidden;
  }
  
  .progress {
    height: 100%;
    background: linear-gradient(90deg, #2E7D32, #4CAF50);
    transition: width 0.3s ease;
  }
  
  .step-content {
    min-height: 300px;
    margin-bottom: 2rem;
  }
  
  .step-content h2 {
    color: #2E7D32;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .step-content p {
    color: #666;
    margin-bottom: 1.5rem;
    text-align: center;
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
  
  .interests-grid,
  .accessibility-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
  
  .interest-btn,
  .accessibility-btn {
    padding: 0.75rem;
    border: 2px solid #ddd;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    font-size: 0.9rem;
  }
  
  .interest-btn:hover,
  .accessibility-btn:hover {
    border-color: #4CAF50;
  }
  
  .interest-btn.selected,
  .accessibility-btn.selected {
    background: #4CAF50;
    color: white;
    border-color: #4CAF50;
  }
  
  .social-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .radio-option:hover {
    border-color: #4CAF50;
  }
  
  .radio-option input[type="radio"]:checked + span {
    color: #2E7D32;
    font-weight: 600;
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
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
    flex: 1;
  }
  
  .btn-primary {
    background: #2E7D32;
    color: white;
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
  
  .results {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  .results h2 {
    color: #2E7D32;
    margin-bottom: 1rem;
    font-size: 2rem;
  }
  
  .results p {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .recommendations {
    margin-bottom: 3rem;
  }
  
  .recommendation-card {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    border-left: 4px solid #4CAF50;
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: slideIn 0.5s ease forwards;
    opacity: 0;
    transform: translateY(20px);
  }
  
  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .rank {
    background: #2E7D32;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .recommendation-card h3 {
    color: #2E7D32;
    margin: 0;
    flex: 1;
    text-align: left;
  }
  
  .recommendation-card p {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
    text-align: left;
  }
  
  .results-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    .sport-matcher,
    .results {
      padding: 1rem;
    }
    
    .interests-grid,
    .accessibility-grid {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
    
    .navigation-buttons,
    .results-actions {
      flex-direction: column;
    }
    
    .recommendation-card {
      flex-direction: column;
      text-align: center;
    }
    
    .recommendation-card h3,
    .recommendation-card p {
      text-align: center;
    }
  }
</style>
