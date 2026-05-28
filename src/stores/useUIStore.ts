import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand store for UI and navigation state.
 *
 * Persisted states (saved to localStorage under key 'aura_ui_store'):
 *   - activeTab, primaryBrandTheme, agencyName, selectedGeminiModel
 *
 * Volatile states (reset on page reload):
 *   - searchTerm, selectedCategory, selectedTool,
 *     toastMessage, toastVisible, showScrollTop
 */
const useUIStore = create(
  persist(
    (set, get) => ({
      // ──────────────────────────────────────
      //  Persisted states
      // ──────────────────────────────────────

      /** Current active tab identifier */
      activeTab: 'catalog',

      /** Brand color theme name */
      primaryBrandTheme: 'indigo',

      /** Agency display name */
      agencyName: 'AURA Agency Autopilot',

      /** Selected Gemini AI model identifier */
      selectedGeminiModel: 'gemini-2.5-flash-preview-09-2025',

      // ──────────────────────────────────────
      //  Volatile (non-persisted) states
      // ──────────────────────────────────────

      /** Catalog search filter text */
      searchTerm: '',

      /** Currently active catalog category filter */
      selectedCategory: 'all',

      /** Tool object shown in the detail view, or null */
      selectedTool: null,

      /** Text content of the current toast notification */
      toastMessage: '',

      /** Whether the toast notification is currently visible */
      toastVisible: false,

      /** Whether the scroll-to-top button should be displayed */
      showScrollTop: false,

      // ──────────────────────────────────────
      //  Actions
      // ──────────────────────────────────────

      /** Set the active navigation tab. */
      setActiveTab: (tab) => set({ activeTab: tab }),

      /** Set the brand color theme. */
      setPrimaryBrandTheme: (theme) => set({ primaryBrandTheme: theme }),

      /** Set the agency display name. */
      setAgencyName: (name) => set({ agencyName: name }),

      /** Set the selected Gemini AI model. */
      setSelectedGeminiModel: (model) => set({ selectedGeminiModel: model }),

      /** Set the catalog search filter term. */
      setSearchTerm: (term) => set({ searchTerm: term }),

      /** Set the catalog category filter. */
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),

      /** Set or clear the currently selected tool for the detail view. */
      setSelectedTool: (tool) => set({ selectedTool: tool }),

      /**
       * Show a toast notification that auto-hides after a given duration.
       * @param {string}  message  - Notification text to display.
       * @param {number} [duration=4000] - Time in ms before the toast hides.
       */
      triggerToast: (message, duration = 4000) => {
        set({ toastMessage: message, toastVisible: true });
        setTimeout(() => {
          set({ toastVisible: false });
        }, duration);
      },

      /** Toggle visibility of the scroll-to-top button. */
      setShowScrollTop: (show) => set({ showScrollTop: show }),
    }),
    {
      name: 'aura_ui_store',
      // Only persist the settings that should survive a page reload.
      partialize: (state) => ({
        activeTab: state.activeTab,
        primaryBrandTheme: state.primaryBrandTheme,
        agencyName: state.agencyName,
        selectedGeminiModel: state.selectedGeminiModel,
      }),
    }
  )
);

export default useUIStore;
