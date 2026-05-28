import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand store for client management and agency settings.
 *
 * Manages:
 * - Client records (CRUD operations)
 * - Agency pricing configuration (base price + per-review price)
 * - Telemetry run history for automation scenarios
 *
 * Persisted to localStorage under the key `aura_clients_store`.
 */
const useClientsStore = create(
  persist(
    (set) => ({
      // ── State ──────────────────────────────────────────────

      /** @type {Array<{id: string, name: string, contact: string, email: string, phone: string, status: string, assignedProfiles: string[]}>} */
      clientsList: [
        {
          id: 'cli-1',
          name: 'Alimentation & Co',
          contact: 'Marc Rossi',
          email: 'marc@aliment-co.com',
          phone: '06 12 34 56 78',
          status: 'active',
          assignedProfiles: ['prof-1'],
        },
        {
          id: 'cli-2',
          name: 'Artisans du Rhône',
          contact: 'Stéphane Bernard',
          email: 's.bernard@rhone-artisan.fr',
          phone: '07 89 45 12 36',
          status: 'active',
          assignedProfiles: ['prof-2'],
        },
        {
          id: 'cli-3',
          name: 'Influenceur HairStyle Paris',
          contact: 'Jessica Miller',
          email: 'jessica@hairstyle-paris.fr',
          phone: '06 99 88 77 66',
          status: 'pending',
          assignedProfiles: [],
        },
      ],

      /** @type {number} Base monthly price in EUR */
      agencyPricingBase: 49,

      /** @type {number} Price per review in EUR */
      agencyPricingPerReview: 0.50,

      /** @type {Array<{id: string, timestamp: string, scenarioName: string, status: string, durationMs: number, tokensUsed: number, costEur: number, logs: string[]}>} */
      telemetryRuns: [
        {
          id: 'run-1',
          timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
          scenarioName: 'GMB Auto-Pilot Responder',
          status: 'success',
          durationMs: 820,
          tokensUsed: 450,
          costEur: 0.00135,
          logs: [
            'Détection d\'un nouvel avis Google Business Profile entrant',
            'Traitement et génération d\'une réponse par Claude 3.5 Sonnet',
            'Envoi automatique de la réponse via le webhook Make.com',
            'Réponse publiée avec succès',
          ],
        },
        {
          id: 'run-2',
          timestamp: new Date(Date.now() - 12 * 3600000).toISOString(),
          scenarioName: 'TikTok Faceless Video Generator',
          status: 'success',
          durationMs: 1450,
          tokensUsed: 1200,
          costEur: 0.00360,
          logs: [
            'Recherche automatisée de tendances par Perplexity Pro',
            'Génération du script vidéo sur Claude 3.5 Sonnet',
            'Synthèse vocale (Rachel) réalisée via ElevenLabs Voice Engine',
            'Rendu vidéo et mise en ligne programmée avec Make.com',
          ],
        },
        {
          id: 'run-3',
          timestamp: new Date(Date.now() - 28 * 3600000).toISOString(),
          scenarioName: 'B2B Outreach Sequence',
          status: 'error',
          durationMs: 250,
          tokensUsed: 0,
          costEur: 0.00000,
          logs: [
            'Extraction de leads LinkedIn Sales Navigator via n8n',
            'Erreur d\'accès : Clé API LinkedIn introuvable ou expirée',
          ],
        },
      ],

      // ── Actions ────────────────────────────────────────────

      /**
       * Add a new client record to the list.
       * @param {object} client - The client object to add
       */
      addClient: (client) =>
        set((state) => ({ clientsList: [...state.clientsList, client] })),

      /**
       * Remove a client by its ID.
       * @param {string} clientId - The ID of the client to remove
       */
      removeClient: (clientId) =>
        set((state) => ({
          clientsList: state.clientsList.filter((c) => c.id !== clientId),
        })),

      /**
       * Partially update a client record.
       * @param {string} clientId - The ID of the client to update
       * @param {object} updates  - An object containing the fields to merge
       */
      updateClient: (clientId, updates) =>
        set((state) => ({
          clientsList: state.clientsList.map((c) =>
            c.id === clientId ? { ...c, ...updates } : c
          ),
        })),

      /**
       * Replace the entire clients list.
       * @param {Array} list - The new clients array
       */
      setClientsList: (list) => set({ clientsList: list }),

      /**
       * Set the base monthly price.
       * @param {number} price - New base price in EUR
       */
      setAgencyPricingBase: (price) => set({ agencyPricingBase: price }),

      /**
       * Set the per-review price.
       * @param {number} price - New per-review price in EUR
       */
      setAgencyPricingPerReview: (price) => set({ agencyPricingPerReview: price }),

      /**
       * Append a new telemetry run to the history.
       * @param {object} run - The telemetry run object to add
       */
      addTelemetryRun: (run) =>
        set((state) => ({ telemetryRuns: [...state.telemetryRuns, run] })),

      /**
       * Replace the entire telemetry runs array.
       * @param {Array} runs - The new telemetry runs array
       */
      setTelemetryRuns: (runs) => set({ telemetryRuns: runs }),
    }),
    {
      name: 'aura_clients_store',
      partialize: (state) => ({
        clientsList: state.clientsList,
        agencyPricingBase: state.agencyPricingBase,
        agencyPricingPerReview: state.agencyPricingPerReview,
        telemetryRuns: state.telemetryRuns,
      }),
    }
  )
);

// ── Selectors ──────────────────────────────────────────────

export const selectClientsList = (state) => state.clientsList;
export const selectAgencyPricingBase = (state) => state.agencyPricingBase;
export const selectAgencyPricingPerReview = (state) => state.agencyPricingPerReview;
export const selectTelemetryRuns = (state) => state.telemetryRuns;

export default useClientsStore;
