export const executeRealElevenLabsTTS = async (textToSpeak, activeElevenKey) => {
  if (!activeElevenKey || activeElevenKey.trim() === '') {
    throw new Error("Clé API ElevenLabs manquante dans vos configurations.");
  }

  const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel Voice
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': activeElevenKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: textToSpeak,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Erreur ElevenLabs API (${response.status})`);
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  return audioUrl;
};
