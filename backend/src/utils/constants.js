const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const UNAUTHORIZED_STATUS = 401;
const FORBIDDEN_STATUS = 403;
const NOT_FOUND_STATUS = 404;
const CONFLICT_STATUS = 409;
const INTERNAL_SERVER_ERROR_STATUS = 500;

const DUPLICATE_RECORD_CODE = 11000;
const SALT_ROUNDS = 10;

const JWT_SECRET = '3aae658639ed01fabf210d4c477f1dec';

const USER_CREATION_ERROR_TEXT = 'Переданы некорректные данные при создании пользователя.';
const USER_UPDATE_PROFILE_ERROR_TEXT = 'Переданы некорректные данные при обновлении профиля пользователя.';
const USER_UPDATE_AVATAR_ERROR_TEXT = 'Переданы некорректные данные при обновлении аватара пользователя.';

const AUTHORIZATION_WARNING_TEXT = 'Вам нужно авторизоваться.';
const AUTHORIZATION_FAILED_TEXT = 'Пользователь с такой почтой или паролем не найден.';

const INCORRECT_USER_ID_ERROR_TEXT = 'Неправильно указан _id пользователя.';
const MISSING_USER_ID_ERROR_TEXT = 'По указанному _id пользователь не найден.';

const CARD_CREATION_ERROR_TEXT = 'Переданы некорректные данные при создании карточки.';
const CARD_DELETION_ERROR_TEXT = 'Нельзя удалить карточку другого пользователя.';
const INCORRECT_CARD_ID_ERROR_TEXT = 'Неправильно указан _id карточки.';
const MISSING_CARD_ID_ERROR_TEXT = 'По указанному _id карточка не найдена.';

const EXISTING_USER_ERROR = 'Такой пользователь уже существует.';

const SERVER_ERROR_TEXT = 'Внутренняя ошибка сервера.';

const limiterOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = {
  CREATED_STATUS,
  UNAUTHORIZED_STATUS,
  FORBIDDEN_STATUS,
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  CONFLICT_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,

  DUPLICATE_RECORD_CODE,
  SALT_ROUNDS,

  JWT_SECRET,

  AUTHORIZATION_WARNING_TEXT,
  AUTHORIZATION_FAILED_TEXT,

  USER_CREATION_ERROR_TEXT,
  USER_UPDATE_PROFILE_ERROR_TEXT,
  USER_UPDATE_AVATAR_ERROR_TEXT,
  INCORRECT_USER_ID_ERROR_TEXT,
  MISSING_USER_ID_ERROR_TEXT,
  EXISTING_USER_ERROR,

  CARD_CREATION_ERROR_TEXT,
  CARD_DELETION_ERROR_TEXT,
  INCORRECT_CARD_ID_ERROR_TEXT,
  MISSING_CARD_ID_ERROR_TEXT,

  SERVER_ERROR_TEXT,

  limiterOptions,
  corsOptions,
};
