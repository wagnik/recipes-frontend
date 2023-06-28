export const PATH = {
  main: '/',
  login: '/login',
  register: '/register',
  edit: '/edit/',
  addRecipe: '/add-recipe',
  recipe: '/recipe/',
  allRecipes: '/recipes',
  typeRecipes: '/recipes/',
};

export const TRANSLATION = {
  logo: 'Logo',
  backMainPage: 'Wróć na stronę główną',
  login: 'Zaloguj się',
  register: 'Zarejestruj się',
  logout: 'Wyloguj się',
  hasAccount: 'Posiadasz konto?',
  hasNoAccount: 'Nie posiadasz konta?',
  save: 'Zapisz',
  cancel: 'Anuluj',
  edit: 'Edytuj',
  remove: 'Usuń',
  addRecipe: 'Dodaj przepis',
  viewAll: 'Wyświetl wszystkie',
  searchInput: 'Wyszukaj przepis',
  showPassword: 'Ukryj hasło',
  hidePassword: 'Ukryj hasło',
  footerCopyright: 'Copyright © 2023, domoweprzepisy.pl',
};

export const FORM_TITLES = {
  title: 'Tytuł',
  ingredients: 'Składniki',
  description: 'Przygotowanie',
  image: 'Zdjęcie',
  category: 'Kategoria',
  addRecipe: 'Dodaj przepis',
};

export const PLACEHOLDER = {
  addTitle: 'Dodaj tytuł',
  noIngredients: 'Kliknij checkbox by dodać i wyświetlić składniki',
  addDescription: 'Dodaj instrukcję krok po kroku',
  email: 'Adres mailowy',
  password: 'Hasło',
  name: 'Imię',
  exampleTitle: 'Przykładowy tytuł',
  addCategories: 'Wybierz pasujące kategorie',
  noMoreCategories: 'Brak więcej kategorii',
};

export const TYPE_OPTIONS = [
  { value: 'Śniadanie', label: 'Śniadanie' },
  { value: 'Obiad', label: 'Obiad' },
  { value: 'Deser', label: 'Deser' },
];

export const WARNING_MESSAGE = {
  missingField: 'To pole jest wymagane.',
  wrongEmail: 'Nieprawidłowy adres mailowy.',
  wrongPassword:
    'Hasło min. 8 znaków, zawierające małe i duże litery oraz min. 1 liczbę.',
  wrongName: 'Min. 3 znaki, bez znaków specjalnych @#$%^&*.',
};

export const SUCCESS_MESSAGE = {
  'User is succesfully saved': 'Użytkownik został poprawnie zarejestrowany!',
  'You have logged in successfully': 'Uzytkownik został pomyślnie zalogowany!',
  'User has been logged out': 'Użytkownik został wylogowany!',
};

export const ERROR_MESSAGE = {
  'Password, name and email are required':
    'Imię, adres mailowy i hasło są wymagane. Uzupełnij brakujące pola!',
  'Password should be at least 8 characters long':
    'Hasło powinno mieć co najmniej 8 znaków.',
  'Email is invalid': 'Nieprawidłowy adres mailowy.',
  'The entered e-mail already exists in the database':
    'Wprowadzony adres mailowy jest już w bazie.',
  'Login and/or password are incorrect': 'Email i/lub hasło są niepoprawne',
  'Password and email are required':
    'Adres mailowy i hasło są wymagane. Uzupełnij brakujące pola!',
};
