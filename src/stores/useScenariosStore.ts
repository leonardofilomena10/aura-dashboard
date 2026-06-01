import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDefaultConfigForTool } from '../utils/stepConfigs';

/**
 * Validates and cleans a scenario object, ensuring it has the expected shape.
 * @param {object} scenario - Raw scenario object
 * @returns {object} Cleaned scenario with guaranteed structure
 */
function cleanScenario(scenario) {
  return {
    id: scenario.id ?? '',
    name: scenario.name ?? '',
    category: scenario.category ?? '',
    steps: Array.isArray(scenario.steps)
      ? scenario.steps.map((step) => ({
          id: step.id ?? '',
          tool: step.tool ?? '',
          action: step.action ?? '',
          config: step.config ?? getDefaultConfigForTool(step.tool ?? '', step.action ?? ''),
        }))
      : [],
  };
}

/**
 * Generates a unique ID for new steps.
 * @returns {string} A unique step identifier
 */
function generateStepId() {
  return `step-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const useScenariosStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────────────────
      /** @type {Array<{ id: string, name: string, category: string, steps: Array<{ id: string, tool: string, action: string }> }>} */
      scenarios: [],
      /** @type {string} */
      selectedScenarioId: 'gmb-responder',
      /** @type {Array<object>} */
      deployedScenarios: [],
      /** @type {Array<object>} */
      scenarioExecutions: [],

      // ── Actions ────────────────────────────────────────────────────────

      /**
       * Initialize with base scenarios, merging with any already-persisted ones.
       * 1. Loads saved scenarios from the persisted state
       * 2. Merges missing initial scenarios (matched by id)
       * 3. Cleans and validates every scenario object
       * @param {Array<object>} initialScenarios - The default/base scenario list
       */
      initializeScenarios: (initialScenarios) => {
        const { scenarios: saved } = get();
        const savedIds = new Set(saved.map((s) => s.id));

        // Keep all saved scenarios, then append any initial ones that are missing
        const missing = (initialScenarios ?? []).filter(
          (s) => !savedIds.has(s.id),
        );
        const merged = [...saved, ...missing].map(cleanScenario);

        set({ scenarios: merged });
      },

      /** Add a new scenario to the list. */
      addScenario: (scenario) =>
        set((state) => ({
          scenarios: [...state.scenarios, cleanScenario(scenario)],
        })),

      /** Remove a scenario by its id. */
      removeScenario: (scenarioId) =>
        set((state) => ({
          scenarios: state.scenarios.filter((s) => s.id !== scenarioId),
        })),

      /**
       * Partially update a scenario (name, category, etc.).
       * Does NOT replace steps unless explicitly provided in `updates`.
       * @param {string} scenarioId
       * @param {object} updates - Fields to merge into the scenario
       */
      updateScenario: (scenarioId, updates) =>
        set((state) => ({
          scenarios: state.scenarios.map((s) =>
            s.id === scenarioId ? cleanScenario({ ...s, ...updates }) : s,
          ),
        })),

      /** Set the currently-selected scenario id. */
      setSelectedScenarioId: (id) => set({ selectedScenarioId: id }),

      /**
       * Update the tool and action of a specific step inside a scenario.
       * @param {string} scenarioId - Target scenario
       * @param {string} stepId     - Target step within the scenario
       * @param {string} tool       - New tool value
       * @param {string} action     - New action value
       */
      updateStepContent: (scenarioId, stepId, tool, action, config) =>
        set((state) => ({
          scenarios: state.scenarios.map((scenario) => {
            if (scenario.id !== scenarioId) return scenario;
            return {
              ...scenario,
              steps: scenario.steps.map((step) =>
                step.id === stepId ? { ...step, tool, action, config: config ?? step.config ?? getDefaultConfigForTool(tool, action) } : step,
              ),
            };
          }),
        })),

      /**
       * Insert a new step at a given index inside a scenario's steps array.
       * @param {string} scenarioId
       * @param {number} index - Position to insert at (0-based)
       * @param {string} tool
       * @param {string} action
       */
      insertStepAtIndex: (scenarioId, index, tool, action) =>
        set((state) => ({
          scenarios: state.scenarios.map((scenario) => {
            if (scenario.id !== scenarioId) return scenario;
            const newStep = {
              id: generateStepId(),
              tool,
              action,
              config: getDefaultConfigForTool(tool, action)
            };
            const steps = [...scenario.steps];
            const clampedIndex = Math.max(
              0,
              Math.min(Number(index), steps.length),
            );
            steps.splice(clampedIndex, 0, newStep);
            return { ...scenario, steps };
          }),
        })),

      /** Remove a step from a scenario by step id. */
      removeStep: (scenarioId, stepId) =>
        set((state) => ({
          scenarios: state.scenarios.map((scenario) => {
            if (scenario.id !== scenarioId) return scenario;
            return {
              ...scenario,
              steps: scenario.steps.filter((step) => step.id !== stepId),
            };
          }),
        })),

      /**
       * Reorder steps within a scenario (drag-and-drop support).
       * Handles string-to-number coercion and bounds checking.
       * @param {string} scenarioId
       * @param {number|string} fromIndex - Source index
       * @param {number|string} toIndex   - Destination index
       */
      reorderSteps: (scenarioId, fromIndex, toIndex) =>
        set((state) => ({
          scenarios: state.scenarios.map((scenario) => {
            if (scenario.id !== scenarioId) return scenario;

            const steps = [...scenario.steps];
            const from = Number(fromIndex);
            const to = Number(toIndex);

            // Bounds check – bail out silently if indices are invalid
            if (
              Number.isNaN(from) ||
              Number.isNaN(to) ||
              from < 0 ||
              from >= steps.length ||
              to < 0 ||
              to >= steps.length ||
              from === to
            ) {
              return scenario;
            }

            const [moved] = steps.splice(from, 1);
            steps.splice(to, 0, moved);
            return { ...scenario, steps };
          }),
        })),

      /** Record a deployment. */
      addDeployedScenario: (record) =>
        set((state) => ({
          deployedScenarios: [...state.deployedScenarios, record],
        })),

      /** Record an execution. */
      addScenarioExecution: (execution) =>
        set((state) => ({
          scenarioExecutions: [...state.scenarioExecutions, execution],
        })),

      // ── Direct setters (migration compatibility) ───────────────────────

      /** @param {Array<object>} scenarios */
      setScenarios: (scenarios) => set({ scenarios }),

      /** @param {Array<object>} scenarios */
      setDeployedScenarios: (scenarios) =>
        set({ deployedScenarios: scenarios }),

      /** @param {Array<object>} execs */
      setScenarioExecutions: (execs) => set({ scenarioExecutions: execs }),
    }),
    {
      name: 'aura_scenarios_store',
      partialize: (state) => ({
        scenarios: state.scenarios,
        selectedScenarioId: state.selectedScenarioId,
        deployedScenarios: state.deployedScenarios,
        scenarioExecutions: state.scenarioExecutions,
      }),
    },
  ),
);

export default useScenariosStore;
