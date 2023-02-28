const PATH = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTRATION: '/register',
  EDIT: '/edit/',
  ADD_RECIPE: '/add-recipe',
  RECIPE: '/recipe/',
  ALL_RECIPES: '/recipes',
  TYPE_RECIPES: '/recipes/',
};

const TRANSLATION = {
  LOGIN: 'Zaloguj się',
  REGISTER: 'Zarejestruj się',
  LOGOUT: 'Wyloguj się',
  ADD_RECIPE: 'Dodaj przepis',
  SAVE: 'Zapisz',
  REMOVE: 'Usuń',
  CONFIRM: 'Potwiedź',
  EDIT: 'Edytuj',
  SUBMIT_LOGIN: 'Zaloguj się',
  SUBMIT_REGISTER: 'Zarejestruj się',
  SEARCH_INPUT: 'Wyszukaj przepis',
  RETURN: 'Powrót',
  RETURN_MAIN_PAGE: '< wróć na stronę główną',
  RETURN_PREV_PAGE: 'Powrót na poprzednią stronę',
  LOGO: 'Logo',
};

const SUCCESS_MESSAGE = {
  'User is succesfully saved': 'Użytkownik został poprawnie zarejestrowany!',
  'You have logged in successfully': 'Uzytkownik został pomyślnie zalogowany!',
  'User has been logged out': 'Użytkownik został wylogowany!',
};

const ERROR_MESSAGE = {
  'Password, name and email are required':
    'Imię, adres mailowy i hasło są wymagane. Uzupełnij brakujące pola!',
  'Password should be at least 8 characters long':
    'Hasło powinno mieć co najmniej 8 znaków.',
  'Email is not correct, it does not contain a sign @':
    'Adres mailowy jest niepoprawny, uwzględnij w adresie znak @.',
  'User already exist': 'Użytkownik już istnieje.',
  'User not found': 'Użytkownik nie istnieje.',
  'Password and email are required':
    'Adres mailowy i hasło są wymagane. Uzupełnij brakujące pola!',
};

module.exports = {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  PATH,
  TRANSLATION,
};
