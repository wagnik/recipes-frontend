import config from '../config.json';

const apiUrl = `${config.apiEndpoint}/recipes`;

export const fetchAllRecipes = () => {
  const response = fetch(apiUrl).then((response) => response.json());

  return response;
};

export const fetchRecipe = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`).then((response) =>
    response.json()
  );

  return response;
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

  const response = await fetch(apiUrl, body).then((response) =>
    response.json()
  );

  return response;
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

  const response = await fetch(`${apiUrl}/${id}`, body).then((response) =>
    response.json()
  );

  return response;
};

export const deleteRecipe = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });

  return response;
};
