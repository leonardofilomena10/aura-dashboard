export const testN8nConnection = async (toolKey, n8nUrl) => {
  let n8nBase = (n8nUrl || "").trim().replace(/\/$/, "");
  if (!n8nBase) {
    throw new Error("Veuillez renseigner l'URL de votre instance n8n.");
  }
  
  if (!/^https?:\/\//i.test(n8nBase)) {
    if (n8nBase.startsWith("localhost") || n8nBase.startsWith("127.0.0.1") || n8nBase.includes("192.168.") || n8nBase.includes("10.")) {
      n8nBase = "http://" + n8nBase;
    } else {
      n8nBase = "https://" + n8nBase;
    }
  }

  // Accept JWT Bearer tokens (eyJ...), n8n_api_ keys, or any 16+ char alphanumeric string
  const isJWT = toolKey.startsWith("eyJ");
  if (!isJWT && !toolKey.startsWith("n8n_api_") && !/^[a-zA-Z0-9_-]{16,}$/.test(toolKey)) {
    throw new Error("Format de clé API n8n invalide. Formats acceptés : clé n8n_api_*, JWT Bearer Token (eyJ...), ou clé de 16+ caractères.");
  }

  // Use X-N8N-API-KEY for all n8n API keys
  const n8nHeaders = { "X-N8N-API-KEY": toolKey };

  try {
    const res = await fetch(`${n8nBase}/api/v1/workflows?limit=1`, {
      headers: n8nHeaders
    });

    if (res.status === 401) {
      throw new Error("Clé API n8n invalide (401). Vérifiez dans n8n → Settings → API Keys.");
    }
  } catch (e) {
    if (e instanceof TypeError || e.message?.includes('fetch') || e.name === 'TypeError') {
      return { success: true, url: n8nBase, corsFallback: true };
    }
    throw e;
  }

  return { success: true, url: n8nBase };
};
