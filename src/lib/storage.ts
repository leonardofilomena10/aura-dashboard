// ---------------------------------------------------------------------------
// storage.js – Centralized localStorage abstraction for AURA Dashboard
// ---------------------------------------------------------------------------
// Replaces all scattered localStorage.getItem / setItem calls across the
// codebase.  Every aura_* key is wrapped with:
//   • JSON parse / serialize
//   • try / catch with console.error
//   • Type validation (Array, Object, string, …)
//   • Sensible default on any error
// ---------------------------------------------------------------------------

// ---- Internal helpers -----------------------------------------------------

const AURA_PREFIX = 'aura_';

/**
 * List of all known localStorage keys managed by this module.
 * Used by clearAll / exportAll / importAll.
 */
const ALL_KEYS = [
  'aura_scenarios',
  'aura_key_methods',
  'aura_api_keys',
  'aura_gmb_profiles',
  'aura_google_token',
  'aura_telemetry_runs',
  'aura_gbp_rules',
  'aura_deployed_scenarios',
  'aura_active_profile_id',
  'aura_scraped_reviews',
  'aura_agency_name',
  'aura_brand_theme',
  'aura_clients_list',
  'aura_brand_voices',
  'aura_pricing_base',
  'aura_pricing_per_review',
  'aura_scenario_executions',
];

/**
 * Placeholder / demo profile IDs that should never surface in production data.
 */
const BLOCKED_PROFILE_IDS = ['prof-default', 'prof-1'];

/**
 * Substrings in the `location` field that flag a profile as demo / placeholder.
 */
const BLOCKED_LOCATION_KEYWORDS = ['pizzeria', 'votre entreprise cible'];

/**
 * Returns true if a GMB profile object should be filtered out.
 * @param {{ id?: string, location?: string }} profile
 * @returns {boolean}
 */
function isDemoProfile(profile) {
  if (!profile || typeof profile !== 'object') return true;
  if (BLOCKED_PROFILE_IDS.includes(profile.id)) return true;
  if (
    typeof profile.location === 'string' &&
    BLOCKED_LOCATION_KEYWORDS.some((kw) =>
      profile.location.toLowerCase().includes(kw)
    )
  ) {
    return true;
  }
  return false;
}

// ---- 1. aura_scenarios – Array of scenario objects ------------------------

/**
 * @returns {Array<{ id: string, name: string, category: string, steps: Array<{ id: string, tool: string, action: string }> }>}
 */
export function getScenarios() {
  try {
    const saved = localStorage.getItem('aura_scenarios');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading scenarios:', e);
  }
  return [];
}

/** @param {Array} scenarios */
export function setScenarios(scenarios) {
  localStorage.setItem('aura_scenarios', JSON.stringify(scenarios));
}

// ---- 2. aura_key_methods – Object map toolId → method ---------------------

/**
 * @returns {Record<string, string>}  e.g. { 'gemini-omni': 'api_key' }
 */
export function getKeyMethods() {
  try {
    const saved = localStorage.getItem('aura_key_methods');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading key methods:', e);
  }
  return {};
}

/** @param {Record<string, string>} methods */
export function setKeyMethods(methods) {
  localStorage.setItem('aura_key_methods', JSON.stringify(methods));
}

// ---- 3. aura_api_keys – Object map toolId → key string --------------------

/**
 * @returns {Record<string, string>}  e.g. { 'gemini-omni': 'AIzaSy...' }
 */
export function getApiKeys() {
  try {
    const saved = localStorage.getItem('aura_api_keys');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading API keys:', e);
  }
  return {};
}

/** @param {Record<string, string>} keys */
export function setApiKeys(keys) {
  localStorage.setItem('aura_api_keys', JSON.stringify(keys));
}

// ---- 4. aura_gmb_profiles – Array of profile objects ----------------------
// Filters out placeholder / demo profiles on read.

/**
 * @returns {Array<{ id: string, email: string, location: string, category: string, address: string, phone: string, website: string, siret: string, autoReply: boolean, rating: number, totalReviews: number, pendingReviews: number, status: string, connectionStatus: string }>}
 */
export function getGmbProfiles() {
  try {
    const saved = localStorage.getItem('aura_gmb_profiles');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.filter((p) => !isDemoProfile(p));
      }
    }
  } catch (e) {
    console.error('Error loading GMB profiles:', e);
  }
  return [];
}

/** @param {Array} profiles */
export function setGmbProfiles(profiles) {
  localStorage.setItem('aura_gmb_profiles', JSON.stringify(profiles));
}

// ---- 5. aura_google_token – Plain string (OAuth token) --------------------

/** @returns {string} */
export function getGoogleToken() {
  try {
    const saved = localStorage.getItem('aura_google_token');
    if (saved) return saved;
  } catch (e) {
    console.error('Error loading Google token:', e);
  }
  return '';
}

/** @param {string} token */
export function setGoogleToken(token) {
  localStorage.setItem('aura_google_token', token);
}

// ---- 6. aura_telemetry_runs – Array of run objects ------------------------

/**
 * @returns {Array<{ id: string, timestamp: string, scenarioName: string, status: string, durationMs: number, tokensUsed: number, costEur: number, logs: string[] }>}
 */
export function getTelemetryRuns() {
  try {
    const saved = localStorage.getItem('aura_telemetry_runs');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading telemetry runs:', e);
  }
  return [];
}

/** @param {Array} runs */
export function setTelemetryRuns(runs) {
  localStorage.setItem('aura_telemetry_runs', JSON.stringify(runs));
}

// ---- 7. aura_gbp_rules – Object map profileId → rules --------------------

/**
 * @returns {Record<string, { minRating: number, notifySlack: boolean, sensitiveKeywords: string[] }>}
 */
export function getGbpRules() {
  try {
    const saved = localStorage.getItem('aura_gbp_rules');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading GBP rules:', e);
  }
  return {};
}

/** @param {Record<string, object>} rules */
export function setGbpRules(rules) {
  localStorage.setItem('aura_gbp_rules', JSON.stringify(rules));
}

// ---- 8. aura_deployed_scenarios – Array of deployment objects --------------

/**
 * @returns {Array<{ id: string, scenarioId: string, name: string, platform: string, deployedAt: string, status: string, workflowUrl: string }>}
 */
export function getDeployedScenarios() {
  try {
    const saved = localStorage.getItem('aura_deployed_scenarios');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading deployed scenarios:', e);
  }
  return [];
}

/** @param {Array} deployments */
export function setDeployedScenarios(deployments) {
  localStorage.setItem('aura_deployed_scenarios', JSON.stringify(deployments));
}

// ---- 9. aura_active_profile_id – Plain string -----------------------------
// Filters out placeholder IDs on read.

/** @returns {string} */
export function getActiveProfileId() {
  try {
    const saved = localStorage.getItem('aura_active_profile_id');
    if (saved && !BLOCKED_PROFILE_IDS.includes(saved)) return saved;
  } catch (e) {
    console.error('Error loading active profile ID:', e);
  }
  return '';
}

/** @param {string} profileId */
export function setActiveProfileId(profileId) {
  localStorage.setItem('aura_active_profile_id', profileId);
}

// ---- 10. aura_scraped_reviews – Object map profileId → review[] -----------

/**
 * @returns {Record<string, Array>}
 */
export function getScrapedReviews() {
  try {
    const saved = localStorage.getItem('aura_scraped_reviews');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading scraped reviews:', e);
  }
  return {};
}

/** @param {Record<string, Array>} reviews */
export function setScrapedReviews(reviews) {
  localStorage.setItem('aura_scraped_reviews', JSON.stringify(reviews));
}

// ---- 11. aura_agency_name – Plain string ----------------------------------

/** @returns {string} */
export function getAgencyName() {
  try {
    const saved = localStorage.getItem('aura_agency_name');
    if (saved) return saved;
  } catch (e) {
    console.error('Error loading agency name:', e);
  }
  return 'AURA Agency Autopilot';
}

/** @param {string} name */
export function setAgencyName(name) {
  localStorage.setItem('aura_agency_name', name);
}

// ---- 12. aura_brand_theme – Plain string ----------------------------------

/** @returns {string} */
export function getBrandTheme() {
  try {
    const saved = localStorage.getItem('aura_brand_theme');
    if (saved) return saved;
  } catch (e) {
    console.error('Error loading brand theme:', e);
  }
  return 'indigo';
}

/** @param {string} theme */
export function setBrandTheme(theme) {
  localStorage.setItem('aura_brand_theme', theme);
}

// ---- 13. aura_clients_list – Array of client objects ----------------------

/**
 * @returns {Array<{ id: string, name: string, contact: string, email: string, phone: string, status: string, assignedProfiles: string[] }>}
 */
export function getClientsList() {
  try {
    const saved = localStorage.getItem('aura_clients_list');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading clients list:', e);
  }
  return [];
}

/** @param {Array} clients */
export function setClientsList(clients) {
  localStorage.setItem('aura_clients_list', JSON.stringify(clients));
}

// ---- 14. aura_brand_voices – Object map profileId → voice -----------------

/**
 * @returns {Record<string, { tone: string, emojiUsage: string, tabooWords: string[], signature: string }>}
 */
export function getBrandVoices() {
  try {
    const saved = localStorage.getItem('aura_brand_voices');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading brand voices:', e);
  }
  return {};
}

/** @param {Record<string, object>} voices */
export function setBrandVoices(voices) {
  localStorage.setItem('aura_brand_voices', JSON.stringify(voices));
}

// ---- 15. aura_pricing_base – Number stored as string ----------------------

/** @returns {string} */
export function getPricingBase() {
  try {
    const saved = localStorage.getItem('aura_pricing_base');
    if (saved) return saved;
  } catch (e) {
    console.error('Error loading pricing base:', e);
  }
  return '49';
}

/** @param {string} price */
export function setPricingBase(price) {
  localStorage.setItem('aura_pricing_base', price);
}

// ---- 16. aura_pricing_per_review – Number stored as string ----------------

/** @returns {string} */
export function getPricingPerReview() {
  try {
    const saved = localStorage.getItem('aura_pricing_per_review');
    if (saved) return saved;
  } catch (e) {
    console.error('Error loading pricing per review:', e);
  }
  return '0.50';
}

/** @param {string} price */
export function setPricingPerReview(price) {
  localStorage.setItem('aura_pricing_per_review', price);
}

// ---- 17. aura_scenario_executions – Array ---------------------------------

/** @returns {Array} */
export function getScenarioExecutions() {
  try {
    const saved = localStorage.getItem('aura_scenario_executions');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error loading scenario executions:', e);
  }
  return [];
}

/** @param {Array} executions */
export function setScenarioExecutions(executions) {
  localStorage.setItem('aura_scenario_executions', JSON.stringify(executions));
}

// ---- Utility functions ----------------------------------------------------

/**
 * Removes every `aura_*` key from localStorage.
 */
export function clearAll() {
  ALL_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing ${key}:`, e);
    }
  });
}

/**
 * Returns a snapshot of all stored data keyed by their localStorage key.
 * @returns {Record<string, any>}
 */
export function exportAll() {
  const data = {};
  ALL_KEYS.forEach((key) => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        // Try to parse JSON; fall back to the raw string for plain-string keys
        try {
          data[key] = JSON.parse(raw);
        } catch {
          data[key] = raw;
        }
      }
    } catch (e) {
      console.error(`Error exporting ${key}:`, e);
    }
  });
  return data;
}

/**
 * Imports data from an object previously created by `exportAll()`.
 * Each property key must be a valid `aura_*` localStorage key.
 * @param {Record<string, any>} data
 */
export function importAll(data) {
  if (!data || typeof data !== 'object') return;

  Object.entries(data).forEach(([key, value]) => {
    // Only import known aura_* keys for safety
    if (!key.startsWith(AURA_PREFIX)) return;
    try {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (e) {
      console.error(`Error importing ${key}:`, e);
    }
  });
}
