import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// IDs and location keywords to filter out during rehydration
const BLOCKED_IDS = ['prof-default', 'prof-1'];
const BLOCKED_LOCATION_KEYWORDS = ['pizzeria', 'votre entreprise cible'];

/**
 * Checks whether a profile should be filtered out during rehydration.
 * Profiles matching blocked IDs or containing blocked location keywords are removed.
 * @param {object} profile - A GMB profile object
 * @returns {boolean} true if the profile should be kept
 */
function isValidProfile(profile) {
  if (BLOCKED_IDS.includes(profile.id)) return false;
  const loc = (profile.location || '').toLowerCase();
  return !BLOCKED_LOCATION_KEYWORDS.some((kw) => loc.includes(kw));
}

/**
 * Sanitises persisted state on rehydration.
 * Removes blocked profiles and prunes orphaned rules / voices / reviews.
 * @param {object} persisted - The raw state read from localStorage
 * @returns {object} cleaned state ready to merge
 */
function sanitizePersistedState(persisted) {
  if (!persisted) return persisted;

  const profiles = (persisted.gmbProfiles || []).filter(isValidProfile);
  const validIds = new Set(profiles.map((p) => p.id));

  // Prune maps so they only reference profiles that survived filtering
  const pruneMap = (map) => {
    if (!map || typeof map !== 'object') return {};
    return Object.fromEntries(
      Object.entries(map).filter(([id]) => validIds.has(id)),
    );
  };

  return {
    ...persisted,
    gmbProfiles: profiles,
    activeProfileId: validIds.has(persisted.activeProfileId)
      ? persisted.activeProfileId
      : profiles[0]?.id || '',
    scrapedReviews: pruneMap(persisted.scrapedReviews),
    gbpRules: pruneMap(persisted.gbpRules),
    brandVoices: pruneMap(persisted.brandVoices),
  };
}

// Default values returned when no custom config exists for a profile
const DEFAULT_RULES = Object.freeze({
  minRating: 4,
  notifySlack: false,
  sensitiveKeywords: [],
});

const DEFAULT_BRAND_VOICE = Object.freeze({
  tone: 'professionnel',
  emojiUsage: 'faible',
  tabooWords: [],
  signature: '',
});

const useGmbStore = create(
  persist(
    (set, get) => ({
      // ── State ───────────────────────────────────────────────────────
      gmbProfiles: [],
      activeProfileId: '',
      scrapedReviews: {},
      gbpRules: {},
      brandVoices: {},

      // ── Actions ─────────────────────────────────────────────────────

      /**
       * Add a new GMB profile and auto-select it if it is the first one.
       * @param {object} profile - Full profile object
       */
      addProfile: (profile) =>
        set((state) => {
          const updated = [...state.gmbProfiles, profile];
          return {
            gmbProfiles: updated,
            activeProfileId: state.activeProfileId || profile.id,
          };
        }),

      /**
       * Remove a profile by ID and clean up associated rules, voices, and reviews.
       * If the removed profile was active, auto-reset to the first remaining profile.
       * @param {string} profileId
       */
      removeProfile: (profileId) =>
        set((state) => {
          const gmbProfiles = state.gmbProfiles.filter(
            (p) => p.id !== profileId,
          );

          // Clone maps and delete the removed profile's entries
          const scrapedReviews = { ...state.scrapedReviews };
          delete scrapedReviews[profileId];

          const gbpRules = { ...state.gbpRules };
          delete gbpRules[profileId];

          const brandVoices = { ...state.brandVoices };
          delete brandVoices[profileId];

          // Auto-reset activeProfileId when current selection is removed
          const activeProfileId =
            state.activeProfileId === profileId
              ? gmbProfiles[0]?.id || ''
              : state.activeProfileId;

          return {
            gmbProfiles,
            activeProfileId,
            scrapedReviews,
            gbpRules,
            brandVoices,
          };
        }),

      /**
       * Partially update a profile's properties.
       * @param {string} profileId
       * @param {object} updates - Fields to merge into the profile
       */
      updateProfile: (profileId, updates) =>
        set((state) => ({
          gmbProfiles: state.gmbProfiles.map((p) =>
            p.id === profileId ? { ...p, ...updates } : p,
          ),
        })),

      /**
       * Set the currently active profile ID.
       * @param {string} id
       */
      setActiveProfileId: (id) => set({ activeProfileId: id }),

      /**
       * Set (replace) the reviews array for a single profile.
       * @param {string} profileId
       * @param {Array} reviews
       */
      setScrapedReviews: (profileId, reviews) =>
        set((state) => ({
          scrapedReviews: { ...state.scrapedReviews, [profileId]: reviews },
        })),

      /**
       * Replace the entire scraped reviews map at once.
       * @param {object} reviewsMap - { [profileId]: review[] }
       */
      setAllScrapedReviews: (reviewsMap) =>
        set({ scrapedReviews: reviewsMap }),

      /**
       * Update a single rule property for a profile.
       * Creates the rule entry with defaults if it doesn't exist yet.
       * @param {string} profileId
       * @param {string} key   - Rule property name (e.g. 'minRating')
       * @param {*}      value - New value
       */
      updateRule: (profileId, key, value) =>
        set((state) => ({
          gbpRules: {
            ...state.gbpRules,
            [profileId]: {
              ...DEFAULT_RULES,
              ...state.gbpRules[profileId],
              [key]: value,
            },
          },
        })),

      /**
       * Get the rules for a profile, merged with defaults.
       * Uses get() to read the current state snapshot.
       * @param {string} profileId
       * @returns {{ minRating: number, notifySlack: boolean, sensitiveKeywords: string[] }}
       */
      getProfileRules: (profileId) => {
        const { gbpRules } = get();
        return { ...DEFAULT_RULES, ...gbpRules[profileId] };
      },

      /**
       * Partially update the brand voice config for a profile.
       * @param {string} profileId
       * @param {object} updates - Fields to merge
       */
      updateBrandVoice: (profileId, updates) =>
        set((state) => ({
          brandVoices: {
            ...state.brandVoices,
            [profileId]: {
              ...DEFAULT_BRAND_VOICE,
              ...state.brandVoices[profileId],
              ...updates,
            },
          },
        })),

      /**
       * Get the brand voice config for a profile, merged with defaults.
       * Uses get() to read the current state snapshot.
       * @param {string} profileId
       * @returns {{ tone: string, emojiUsage: string, tabooWords: string[], signature: string }}
       */
      getBrandVoice: (profileId) => {
        const { brandVoices } = get();
        return { ...DEFAULT_BRAND_VOICE, ...brandVoices[profileId] };
      },
    }),
    {
      name: 'aura_gmb_store',

      /**
       * Only persist the domain-relevant slices — actions and derived data
       * are excluded automatically.
       */
      partialize: (state) => ({
        gmbProfiles: state.gmbProfiles,
        activeProfileId: state.activeProfileId,
        scrapedReviews: state.scrapedReviews,
        gbpRules: state.gbpRules,
        brandVoices: state.brandVoices,
      }),

      /**
       * Custom merge that sanitises rehydrated data:
       * - Removes blocked / placeholder profiles
       * - Prunes orphaned map entries
       * - Resets activeProfileId when it points to a removed profile
       */
      merge: (persistedState, currentState) => {
        const clean = sanitizePersistedState(persistedState);
        return { ...currentState, ...clean };
      },
    },
  ),
);

// ── Auto-sync: reset activeProfileId when it becomes stale ──────────────
/**
 * Subscribe to gmbProfiles changes.  When the active profile ID no longer
 * matches any existing profile, fall back to the first profile or ''.
 */
useGmbStore.subscribe(
  (state) => {
    const { gmbProfiles, activeProfileId, setActiveProfileId } = state;
    if (activeProfileId === '') return;
    const exists = gmbProfiles.some((p) => p.id === activeProfileId);
    if (!exists) {
      setActiveProfileId(gmbProfiles[0]?.id || '');
    }
  },
);

export default useGmbStore;
