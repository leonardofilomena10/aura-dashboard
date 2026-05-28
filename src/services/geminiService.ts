export const callGeminiAPI = async (prompt, systemInstruction, activeKey, selectedGeminiModel = "gemini-2.5-flash-preview-09-2025") => {
  if (!activeKey || activeKey.trim() === '') {
    throw new Error("Clé API Gemini manquante. Impossible d'appeler l'API.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedGeminiModel}:generateContent?key=${activeKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "Aucun contenu n'a pu être renvoyé par l'IA.";
  } else {
    const errorText = await response.text();
    let parsedError;
    try {
      parsedError = JSON.parse(errorText);
    } catch (e) {
      parsedError = { error: { message: "Erreur brute du serveur." } };
    }
    throw new Error(`Erreur API Google (${response.status}) : ${parsedError.error?.message || "Veuillez vérifier votre clé d'accès."}`);
  }
};

// Fallback mock function to simulate AI response if API key is missing
export const getMockAiResponse = async (prompt) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Ceci est une réponse générée localement en simulation, car votre clé API est manquante.\n\nContenu basé sur votre prompt : "${prompt.substring(0, 50)}..."`);
    }, 1500);
  });
};
