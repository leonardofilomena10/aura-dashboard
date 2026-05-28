export const fetchRealGoogleMyBusinessReviews = async (googleToken, locationId) => {
  if (!googleToken) {
    throw new Error("Aucun jeton Google OAuth valide.");
  }
  
  if (!locationId || locationId.includes('pizzeria') || locationId.includes('votre entreprise cible')) {
    throw new Error("ID de l'établissement invalide ou de démonstration.");
  }

  // Example API call according to Google Business Profile API specs
  // GET https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews
  // But here we use v4 or a generic endpoint
  const url = `https://mybusiness.googleapis.com/v4/${locationId}/reviews`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${googleToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Erreur API Google My Business (${response.status})`);
  }

  const data = await response.json();
  return data.reviews || [];
};

export const replyToRealGoogleMyBusinessReview = async (googleToken, locationId, reviewId, replyText) => {
  if (!googleToken) {
    throw new Error("Aucun jeton Google OAuth valide.");
  }

  const url = `https://mybusiness.googleapis.com/v4/${locationId}/reviews/${reviewId}/reply`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${googleToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: replyText
    })
  });

  if (!response.ok) {
    throw new Error(`Erreur API lors de la publication de la réponse (${response.status})`);
  }

  return await response.json();
};
