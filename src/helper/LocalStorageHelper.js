const _defaultKey = "token";
const setItemToLocalStorage = (value, key = _defaultKey) => {
  localStorage.setItem(key, value);
};

const getTokenFromStorage = (key = _defaultKey) => {
  return sessionStorage.getItem(key);
};

export { setItemToLocalStorage, getTokenFromStorage };
