import { generateN8nWorkflow, generateMakeBlueprint } from '../utils/automationGenerators';

export const useDeployPipeline = ({
  activeScenario,
  automationPlatform,
  apiKeys,
  setAutomationJSON,
  setIsLaunchingAutomation,
  setAutomationError,
  setShowAutomationModal,
  setDeployLogs,
  setDeployedWorkflowId,
  setDeployedWorkflowUrl,
  triggerToast
}) => {
  const handleLaunchAutomationPipeline = async () => {
    if (!activeScenario) return;
    setIsLaunchingAutomation(true);
    setAutomationError(null);

    const platform = automationPlatform;
    const generatedCode = platform === 'n8n' 
      ? generateN8nWorkflow(activeScenario)
      : generateMakeBlueprint(activeScenario);
      
    setAutomationJSON(generatedCode);
    
    // Copy to clipboard
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(generatedCode);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = generatedCode;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }
    } catch(err) {
      console.error(err);
    }
    
    const n8nApiKey = apiKeys["n8n"];
    const n8nUrl = (apiKeys["n8n_url"] || "").replace(/\/$/, "");
    const hasValidN8nUrl = n8nUrl && !n8nUrl.includes('localhost') && !n8nUrl.includes('127.0.0.1');
    
    if (platform === 'n8n') {
      if (!n8nApiKey || n8nApiKey.trim() === '') {
        setAutomationError("Clé API n8n non configurée. Le scénario JSON a été copié dans votre presse-papiers. Collez-le (Ctrl+V) dans n8n.");
        triggerToast("✓ Scénario JSON copié !");
        setIsLaunchingAutomation(false);
        setShowAutomationModal(true);
        if (n8nUrl) {
          window.open(n8nUrl, "_blank");
        } else {
          setAutomationError("Clé API et URL n8n non configurées. Le scénario JSON a été copié dans votre presse-papiers. (Configurez votre instance dans l'onglet Paramètres).");
        }
        return;
      }

      triggerToast("Déploiement automatique sur votre n8n...");
      try {
        const parsedWorkflow = JSON.parse(generatedCode);
        const response = await fetch('/api/n8n-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            n8nUrl: n8nUrl,
            apiKey: n8nApiKey,
            workflow: {
              name: `[AURA] ${activeScenario.name}`,
              nodes: parsedWorkflow.nodes,
              connections: parsedWorkflow.connections,
              settings: {}
            }
          })
        });
        
        if (response.ok) {
          const resData = await response.json();
          triggerToast(`✓ Déploiement automatique réussi sur n8n !`);
          setDeployLogs(prev => [
            ...prev,
            `[PROD] Déploiement direct réussi sur n8n.`,
            `[PROD] Workflow ID : ${resData.id}`
          ]);
          if (resData.id) setDeployedWorkflowId(resData.id);
          if (hasValidN8nUrl) setDeployedWorkflowUrl(`${n8nUrl}/workflow/${resData.id}`);
          setIsLaunchingAutomation(false);
          setShowAutomationModal(true);
          if (n8nUrl) {
            window.open((hasValidN8nUrl ? `${n8nUrl}/workflow/${resData.id}` : n8nUrl), "_blank");
          }
          return;
        } else {
          let errorMsg = "Erreur de configuration ou réseau";
          try {
            const errText = await response.text();
            try { const errJson = JSON.parse(errText); errorMsg = errJson.message || errJson.error || errorMsg; } 
            catch (_) { errorMsg = errText || errorMsg; }
          } catch (__) {}
          setAutomationError(`L'API n8n a retourné une erreur : "${errorMsg}". Le JSON a été copié.`);
          triggerToast("⚠️ Déploiement direct impossible. Mode manuel activé.");
        }
      } catch (e) {
        setAutomationError(`Proxy injoignable : ${e.message || e}. Le JSON a été copié.`);
        triggerToast("⚠️ Erreur réseau. Mode manuel activé.");
      }
      
      setIsLaunchingAutomation(false);
      setShowAutomationModal(true);
      if (n8nUrl) window.open(n8nUrl, "_blank");
      return;
    }
    
    triggerToast("✓ Blueprint Make.com copié !");
    setIsLaunchingAutomation(false);
    setShowAutomationModal(true);
    window.open("https://www.make.com/en/login", "_blank");
  };

  return { handleLaunchAutomationPipeline };
};
