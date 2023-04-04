const INCORRECT_DATA_ERROR_CODE = 400; // переданы некорректные данные
const NOT_FOUND_ERROR_CODE = 404; // карточка или пользователь не найден.
const DEFAULT_ERROR_CODE = 500; // ошибка по-умолчанию.

const regex = /^https?:\/\/(www.)?[-a-z0-9:%._+~#=]{1,}\.[a-z0-9()]{1,}([-a-z0-9()\-._~:/?#[\]@!$&'()*+,;=]*)/i;

module.exports = {
  regex,
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
};
