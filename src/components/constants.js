const PATH = {
  main: '/',
  login: '/login',
  register: '/register',
  edit: '/edit/',
  addRecipe: '/add-recipe',
  recipe: '/recipe/',
  allRecipes: '/recipes',
  typeRecipes: '/recipes/',
};

const TRANSLATION = {
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

const FORM_TITLES = {
  title: 'Tytuł',
  ingredients: 'Składniki',
  description: 'Przygotowanie',
  image: 'Zdjęcie',
  category: 'Kategoria',
  addRecipe: 'Dodaj przepis',
};

const PLACEHOLDER = {
  addTitle: 'Dodaj tytuł',
  addIngredients: "Dodawaj kolejne składniki po kliknięciu 'Enter'",
  noIngredients: 'Kliknij checkbox by dodać i wyświetlić składniki',
  addDescription: 'Dodaj instrukcję krok po kroku',
  email: 'Adres mailowy',
  password: 'Hasło',
  name: 'Imię',
  exampleTitle: 'Przykładowy tytuł',
  addCategories: 'Wybierz pasujące kategorie',
  noMoreCategories: 'Brak więcej kategorii',
};

const TYPE_OPTIONS = [
  { value: 'Śniadanie', label: 'Śniadanie' },
  { value: 'Obiad', label: 'Obiad' },
  { value: 'Deser', label: 'Deser' },
];

const WARNING_MESSAGE = {
  missingField: 'To pole jest wymagane.',
  wrongEmail: 'Nieprawidłowy adres mailowy.',
  wrongPassword:
    'Hasło min. 8 znaków, zawierające małe i duże litery oraz min. 1 liczbę.',
  wrongName: 'Min. 3 znaki, bez znaków specjalnych @#$%^&*.',
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
  'User not found': 'Niepoprawny login.',
  'Password and email are required':
    'Adres mailowy i hasło są wymagane. Uzupełnij brakujące pola!',
  'Wrong password': 'Niepoprawne hasło.',
};

module.exports = {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  PATH,
  FORM_TITLES,
  PLACEHOLDER,
  TRANSLATION,
  TYPE_OPTIONS,
  WARNING_MESSAGE,
};
