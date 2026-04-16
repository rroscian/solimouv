use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UserProfile {
    pub age: u32,
    pub mobility_level: String,    // "high", "medium", "low", "adapted"
    pub experience_level: String,  // "beginner", "intermediate", "advanced"
    pub interests: Vec<String>,    // sport categories
    pub accessibility_needs: Vec<String>,
    pub social_preferences: String, // "individual", "small_group", "large_group", "any"
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SportActivity {
    pub name: String,
    pub category: String,
    pub intensity: String,         // "low", "medium", "high"
    pub group_size: String,        // "individual", "small", "large"
    pub accessibility: Vec<String>,
    pub beginner_friendly: bool,
    pub equipment_provided: bool,
}

#[wasm_bindgen]
pub struct SportMatcher {
    activities: Vec<SportActivity>,
}

#[wasm_bindgen]
impl SportMatcher {
    #[wasm_bindgen(constructor)]
    pub fn new() -> SportMatcher {
        console_log!("🦀 Sport Matcher initialized!");
        
        let activities = vec![
            SportActivity {
                name: "Football Inclusif".to_string(),
                category: "team_sport".to_string(),
                intensity: "medium".to_string(),
                group_size: "large".to_string(),
                accessibility: vec!["pmr".to_string(), "beginner".to_string()],
                beginner_friendly: true,
                equipment_provided: true,
            },
            SportActivity {
                name: "Yoga Adapté".to_string(),
                category: "wellness".to_string(),
                intensity: "low".to_string(),
                group_size: "small".to_string(),
                accessibility: vec!["pmr".to_string(), "senior".to_string(), "beginner".to_string()],
                beginner_friendly: true,
                equipment_provided: true,
            },
            SportActivity {
                name: "Basketball en Fauteuil".to_string(),
                category: "adapted_sport".to_string(),
                intensity: "high".to_string(),
                group_size: "small".to_string(),
                accessibility: vec!["wheelchair".to_string()],
                beginner_friendly: true,
                equipment_provided: true,
            },
            SportActivity {
                name: "Boxe Éducative".to_string(),
                category: "combat_sport".to_string(),
                intensity: "medium".to_string(),
                group_size: "small".to_string(),
                accessibility: vec!["beginner".to_string()],
                beginner_friendly: true,
                equipment_provided: true,
            },
            SportActivity {
                name: "Danse Hip-Hop".to_string(),
                category: "dance".to_string(),
                intensity: "medium".to_string(),
                group_size: "small".to_string(),
                accessibility: vec!["beginner".to_string(), "creative".to_string()],
                beginner_friendly: true,
                equipment_provided: false,
            },
            SportActivity {
                name: "Tennis de Table".to_string(),
                category: "racket_sport".to_string(),
                intensity: "medium".to_string(),
                group_size: "individual".to_string(),
                accessibility: vec!["intergenerational".to_string(), "beginner".to_string()],
                beginner_friendly: true,
                equipment_provided: true,
            },
        ];

        SportMatcher { activities }
    }
    
    #[wasm_bindgen]
    pub fn find_matching_sports(&self, profile_json: &str) -> String {
        console_log!("🔍 Finding sports for profile: {}", profile_json);
        
        let profile: UserProfile = match serde_json::from_str(profile_json) {
            Ok(p) => p,
            Err(_) => {
                return serde_json::to_string(&Vec::<String>::new()).unwrap_or_default();
            }
        };
        
        let mut matches: Vec<(String, u32)> = Vec::new();
        
        for activity in &self.activities {
            let score = self.calculate_compatibility_score(&profile, activity);
            if score > 0 {
                matches.push((activity.name.clone(), score));
            }
        }
        
        // Sort by score (descending)
        matches.sort_by(|a, b| b.1.cmp(&a.1));
        
        let recommendations: Vec<String> = matches.into_iter()
            .take(5) // Top 5 recommendations
            .map(|(name, _)| name)
            .collect();
            
        serde_json::to_string(&recommendations).unwrap_or_default()
    }
    
    fn calculate_compatibility_score(&self, profile: &UserProfile, activity: &SportActivity) -> u32 {
        let mut score = 0u32;
        
        // Age compatibility
        if profile.age < 18 && activity.beginner_friendly {
            score += 20;
        } else if profile.age >= 60 && activity.intensity == "low" {
            score += 25;
        } else if profile.age >= 18 && profile.age < 60 {
            score += 15;
        }
        
        // Mobility level compatibility
        match profile.mobility_level.as_str() {
            "adapted" => {
                if activity.accessibility.contains(&"pmr".to_string()) || 
                   activity.accessibility.contains(&"wheelchair".to_string()) {
                    score += 30;
                }
            },
            "low" => {
                if activity.intensity == "low" {
                    score += 25;
                }
            },
            "medium" => {
                if activity.intensity == "low" || activity.intensity == "medium" {
                    score += 20;
                }
            },
            "high" => {
                score += 15;
            },
            _ => {}
        }
        
        // Experience level
        if profile.experience_level == "beginner" && activity.beginner_friendly {
            score += 20;
        }
        
        // Interest matching
        for interest in &profile.interests {
            if activity.category.contains(interest) || activity.name.to_lowercase().contains(interest) {
                score += 15;
            }
        }
        
        // Accessibility needs
        for need in &profile.accessibility_needs {
            if activity.accessibility.contains(need) {
                score += 25;
            }
        }
        
        // Social preferences
        match profile.social_preferences.as_str() {
            "individual" => {
                if activity.group_size == "individual" {
                    score += 15;
                }
            },
            "small_group" => {
                if activity.group_size == "small" {
                    score += 15;
                }
            },
            "large_group" => {
                if activity.group_size == "large" {
                    score += 15;
                }
            },
            "any" => {
                score += 5;
            },
            _ => {}
        }
        
        score
    }
    
    #[wasm_bindgen]
    pub fn get_all_activities(&self) -> String {
        let activity_names: Vec<String> = self.activities.iter()
            .map(|a| a.name.clone())
            .collect();
        serde_json::to_string(&activity_names).unwrap_or_default()
    }
}
