export const useScenarioSimulator = ({
  activeScenario,
  setIsSimulating,
  setSimLogs,
  setSimCurrentStep,
  setSimEfficiency,
  triggerToast
}: any) => {
  const runScenarioSimulation = () => {

    if (!activeScenario || activeScenario.steps.length === 0) {

      triggerToast("Impossible de simuler un scénario vide !");

      return;

    }

    setIsSimulating(true);

    setSimCurrentStep(0);

    setSimLogs([{

      time: new Date().toLocaleTimeString(),

      text: `[SYSTEM] Démarrage de la simulation pour : "${activeScenario.name}"`,

      type: 'system'

    }]);

    setSimEfficiency(null);

  };

  return { runScenarioSimulation };
};
