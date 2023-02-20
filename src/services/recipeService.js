import config from '../config.json';

const apiUrl = `${config.apiEndpoint}/recipes`;

export const fetchAllRecipes = async () => {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};

export const fetchRecipe = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};

export const addRecipe = async (title, description, img, tags) => {
  const body = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      title,
      description,
      img,
      tags,
    }),
  };

  const response = await fetch(apiUrl, body);

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};

export const editRecipe = async (id, title, description, img, tags) => {
  const body = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      img,
      tags,
    }),
  };

  const response = await fetch(`${apiUrl}/${id}`, body);

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};

export const deleteRecipe = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};
