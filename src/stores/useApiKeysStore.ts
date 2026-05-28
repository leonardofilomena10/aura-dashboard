import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand store for managing API keys, connection methods, and connection test statuses.
 *
 * Persisted state (survives page reload):
 *   - apiKeys: Map of toolId -> API key string
 *   - keyConfigMethod: Map of toolId -> connection method
 *   - googleAccessToken: Google OAuth token
 *
 * Transient state (reset on reload):
 *   - testStatus: Map of toolId -> test result status
 */
const useApiKeysStore = create(
  persist(
    (set, get) => ({
      // ──────────────────────────── State ────────────────────────────

      /** @type {Record<string, string>} Map of toolId -> API key string */
      apiKeys: {},

      /** @type {Record<string, 'api_key' | 'credentials' | 'google_sso'>} Map of toolId -> connection method */
      keyConfigMethod: {},

      /** @type {Record<string, 'idle' | 'testing' | 'success' | 'error'>} Map of toolId -> test status (NOT persisted) */
      testStatus: {},

      /** @type {string} Google OAuth access token */
      googleAccessToken: '',

      // ──────────────────────────── Actions ────────────────────────────

      /**
       * Update a single API key for a given tool.
       * @param {string} toolId - The tool identifier
       * @param {string} value - The API key value
       */
      setKey: (toolId, value) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [toolId]: value },
        })),

      /**
       * Merge multiple API keys at once.
       * @param {Record<string, string>} keysObject - Object of toolId -> key pairs to merge
       */
      setKeys: (keysObject) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, ...keysObject },
        })),

      /**
       * Update the connection method for a specific tool.
       * @param {string} toolId - The tool identifier
       * @param {'api_key' | 'credentials' | 'google_sso'} method - The connection method
       */
      setKeyMethod: (toolId, method) =>
        set((state) => ({
          keyConfigMethod: { ...state.keyConfigMethod, [toolId]: method },
        })),

      /**
       * Update the test status for a specific tool.
       * @param {string} toolId - The tool identifier
       * @param {'idle' | 'testing' | 'success' | 'error'} status - The test result status
       */
      setTestStatus: (toolId, status) =>
        set((state) => ({
          testStatus: { ...state.testStatus, [toolId]: status },
        })),

      /**
       * Set the Google OAuth access token.
       * @param {string} token - The OAuth token
       */
      setGoogleToken: (token) => set({ googleAccessToken: token }),

      /**
       * Clear the Google OAuth access token.
       */
      removeGoogleToken: () => set({ googleAccessToken: '' }),

      /**
       * Merge environment variable keys into the store.
       * Keys from env are only applied when the currently saved value is empty or absent.
       * This prevents overwriting user-provided keys with defaults on each reload.
       *
       * @param {Record<string, string>} envKeys - Object of toolId -> env key value
       * @example
       * loadFromEnv({
       *   'gemini-omni': import.meta.env.VITE_GEMINI_API_KEY || '',
       *   'gpt-4o': import.meta.env.VITE_OPENAI_API_KEY || '',
       * });
       */
      loadFromEnv: (envKeys) =>
        set((state) => {
          const merged = { ...state.apiKeys };
          for (const [toolId, envValue] of Object.entries(envKeys)) {
            // Only fill in if the saved value is empty or missing
            if (!merged[toolId]) {
              merged[toolId] = envValue;
            }
          }
          return { apiKeys: merged };
        }),

      /**
       * Get a specific API key, trimmed of whitespace.
       * @param {string} toolId - The tool identifier
       * @returns {string} The trimmed API key, or an empty string if not found
       */
      getKey: (toolId) => {
        const key = get().apiKeys[toolId];
        return key ? key.trim() : '';
      },
    }),
    // ──────────────────────────── Persist config ────────────────────────────
    {
      name: 'aura_api_keys_store',
      /**
       * Only persist the keys, methods, and Google token.
       * testStatus is intentionally excluded so it resets on page reload.
       */
      partialize: (state) => ({
        apiKeys: state.apiKeys,
        keyConfigMethod: state.keyConfigMethod,
        googleAccessToken: state.googleAccessToken,
      }),
    }
  )
);

export default useApiKeysStore;
