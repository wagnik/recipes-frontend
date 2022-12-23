import config from '../config.json';

const apiUrl = config.apiEndpoint;

export const fetchAuthUser = async () => {
  const response = await fetch(`${apiUrl}/isAuth`);

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};

export const logoutUser = async () => {
  const response = await fetch(`${apiUrl}/logout`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};

export const loginUser = async (email, password) => {
  const body = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password,
    }),
  };

  const result = await fetch(`${apiUrl}/login`, body).then(
    async (response) => await response.json()
  );

  return result;
};

export const registerUser = async (name, email, password) => {
  const body = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  };

  const response = await fetch(`${apiUrl}/register`, body).then((res) =>
    res.json()
  );

  return response;
};
