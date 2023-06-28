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

export const fetchTypeRecipes = async (type) => {
  const response = await fetch(`${apiUrl}/${type}`);

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};

export const fetchRecipe = async (id) => {
  const response = await fetch(`${config.apiEndpoint}/recipe/${id}`);
  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};

export const addRecipe = async (
  title,
  description,
  image,
  ingredients,
  type,
  author
) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('img', image);
  ingredients.forEach((ingredient) => {
    formData.append('ingredients', ingredient);
  });
  type.forEach((typeItem) => {
    formData.append('type', typeItem);
  });
  console.log(author);
  formData.append('author[id]', author.id);
  formData.append('author[name]', author.name);

  const response = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    body: formData,
    header: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};

export const editRecipe = async (
  id,
  title,
  description,
  img,
  ingredients,
  showIngredients
) => {
  const formData = new FormData();
  formData.append('id', id);
  title && formData.append('title', title);
  description && formData.append('description', description);
  img && formData.append('img', img);
  ingredients &&
    ingredients.forEach((ingredient) => {
      formData.append('ingredients', ingredient);
    });
  showIngredients && formData.append('showIngredients', showIngredients);

  const body = {
    method: 'PUT',
    headers: {
      // 'Content-Type': 'multipart/form-data'
      // 'Content-Type': 'application/json',
    },
    body: formData,
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
