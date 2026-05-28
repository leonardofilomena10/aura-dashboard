export const fetchGmailRecentMails = async (googleToken) => {
  if (!googleToken) {
    throw new Error("Aucun jeton OAuth valide. Connectez d'abord votre compte Google.");
  }

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5&q=is:unread', {
    headers: {
      'Authorization': `Bearer ${googleToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Erreur API Gmail (${response.status}). Le jeton a peut-être expiré.`);
  }

  const data = await response.json();
  
  if (data.messages && data.messages.length > 0) {
    const detailPromises = data.messages.map(async (msg) => {
      const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
        headers: { 'Authorization': `Bearer ${googleToken}` }
      });
      return detailRes.json();
    });

    const details = await Promise.all(detailPromises);
    return details.map((m) => {
      const headers = m.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || 'Sans objet';
      const from = headers.find(h => h.name === 'From')?.value || 'Expéditeur Inconnu';
      const snippet = m.snippet || '';
      return { id: m.id, from, subject, snippet };
    });
  }
  
  return []; // No unread messages
};
