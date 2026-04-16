// Rust WASM integration for sport matching
let wasmModule = null;
let SportMatcher = null;

export async function initWasm() {
  try {
    // Try to load WASM module - use dynamic import with error handling
    const wasmPath = '../../rust-wasm/pkg/solimouv_wasm.js';
    
    // Check if the module exists by trying to import it
    const wasm = await import(/* @vite-ignore */ wasmPath);
    await wasm.default(); // Initialize WASM
    
    wasmModule = wasm;
    SportMatcher = wasm.SportMatcher;
    console.log('🦀 Rust WASM module loaded successfully');
    return true;
  } catch (error) {
    console.warn('⚠️ WASM module not available, using JavaScript fallback:', error.message);
    return false;
  }
}

// JavaScript fallback for sport matching
class JsSportMatcher {
  constructor() {
    this.activities = [
      {
        name: "Football Inclusif",
        category: "team_sport",
        intensity: "medium",
        groupSize: "large",
        accessibility: ["pmr", "beginner"],
        beginnerFriendly: true,
        equipmentProvided: true
      },
      {
        name: "Yoga Adapté",
        category: "wellness",
        intensity: "low", 
        groupSize: "small",
        accessibility: ["pmr", "senior", "beginner"],
        beginnerFriendly: true,
        equipmentProvided: true
      },
      {
        name: "Basketball en Fauteuil",
        category: "adapted_sport",
        intensity: "high",
        groupSize: "small",
        accessibility: ["wheelchair"],
        beginnerFriendly: true,
        equipmentProvided: true
      },
      {
        name: "Boxe Éducative",
        category: "combat_sport",
        intensity: "medium",
        groupSize: "small",
        accessibility: ["beginner"],
        beginnerFriendly: true,
        equipmentProvided: true
      },
      {
        name: "Danse Hip-Hop",
        category: "dance",
        intensity: "medium",
        groupSize: "small",
        accessibility: ["beginner", "creative"],
        beginnerFriendly: true,
        equipmentProvided: false
      },
      {
        name: "Tennis de Table",
        category: "racket_sport",
        intensity: "medium",
        groupSize: "individual",
        accessibility: ["intergenerational", "beginner"],
        beginnerFriendly: true,
        equipmentProvided: true
      }
    ];
  }

  findMatchingSports(profile) {
    const matches = [];
    
    for (const activity of this.activities) {
      const score = this.calculateScore(profile, activity);
      if (score > 0) {
        matches.push({ name: activity.name, score });
      }
    }
    
    return matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(match => match.name);
  }
  
  calculateScore(profile, activity) {
    let score = 0;
    
    // Age compatibility
    if (profile.age < 18 && activity.beginnerFriendly) score += 20;
    else if (profile.age >= 60 && activity.intensity === "low") score += 25;
    else if (profile.age >= 18 && profile.age < 60) score += 15;
    
    // Mobility level
    if (profile.mobilityLevel === "adapted" && 
        (activity.accessibility.includes("pmr") || activity.accessibility.includes("wheelchair"))) {
      score += 30;
    } else if (profile.mobilityLevel === "low" && activity.intensity === "low") {
      score += 25;
    } else if (profile.mobilityLevel === "medium" && 
               (activity.intensity === "low" || activity.intensity === "medium")) {
      score += 20;
    } else if (profile.mobilityLevel === "high") {
      score += 15;
    }
    
    // Experience level
    if (profile.experienceLevel === "beginner" && activity.beginnerFriendly) {
      score += 20;
    }
    
    // Interest matching
    for (const interest of profile.interests) {
      if (activity.category.includes(interest) || 
          activity.name.toLowerCase().includes(interest.toLowerCase())) {
        score += 15;
      }
    }
    
    // Accessibility needs
    for (const need of profile.accessibilityNeeds) {
      if (activity.accessibility.includes(need)) {
        score += 25;
      }
    }
    
    // Social preferences
    if (profile.socialPreferences === "individual" && activity.groupSize === "individual") score += 15;
    else if (profile.socialPreferences === "small_group" && activity.groupSize === "small") score += 15;
    else if (profile.socialPreferences === "large_group" && activity.groupSize === "large") score += 15;
    else if (profile.socialPreferences === "any") score += 5;
    
    return score;
  }
  
  getAllActivities() {
    return this.activities.map(a => a.name);
  }
}

// Unified API
let matcher = null;
let useWasm = false;

export async function getSportMatcher() {
  if (!matcher) {
    useWasm = await initWasm();
    
    if (useWasm && SportMatcher) {
      matcher = new SportMatcher();
    } else {
      matcher = new JsSportMatcher();
    }
  }
  
  return matcher;
}

export async function findMatchingSports(userProfile) {
  const sportMatcher = await getSportMatcher();
  
  if (useWasm) {
    try {
      const profileJson = JSON.stringify({
        age: userProfile.age,
        mobility_level: userProfile.mobilityLevel,
        experience_level: userProfile.experienceLevel,
        interests: userProfile.interests,
        accessibility_needs: userProfile.accessibilityNeeds,
        social_preferences: userProfile.socialPreferences
      });
      
      const result = sportMatcher.find_matching_sports(profileJson);
      return JSON.parse(result);
    } catch (error) {
      console.error('WASM error, falling back to JS:', error);
      return new JsSportMatcher().findMatchingSports(userProfile);
    }
  } else {
    return sportMatcher.findMatchingSports(userProfile);
  }
}

export async function getAllActivities() {
  const sportMatcher = await getSportMatcher();
  
  if (useWasm) {
    try {
      const result = sportMatcher.get_all_activities();
      return JSON.parse(result);
    } catch (error) {
      console.error('WASM error, falling back to JS:', error);
      return new JsSportMatcher().getAllActivities();
    }
  } else {
    return sportMatcher.getAllActivities();
  }
}
