import ValidatedOptions from "./OptionsValidate";

const HttpRequest = async (endpoint, options = {}) => {
  const res = await fetch(endpoint, options);
  if (!res.ok)
    throw {
      title: options.method || "there's some error anywhere",
      descripcion: res.statusText || "failed request",
      code: res.status,
    };
  return await res.json();
};
const GetRequest = async (endpoint, token, option = {}) => {
  if (ValidatedOptions(option)) return await HttpRequest(endpoint, option);
  return await HttpRequest(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  });
};
const SendRequest = async (endpoint, data, method, token, options = {}) => {
  if (ValidatedOptions(options)) return await HttpRequest(endpoint, options);
  options.method = method || "POST";
  options.headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };
  options.body = JSON.stringify(data);
  const datos = `bearer ${token}`;
  return await HttpRequest(endpoint, options);
};
const DeleteRequest = async (endpoint, token, options = {}) => {
  if (ValidatedOptions(options)) return await HttpRequest(endpoint, options);
  options.method = "DELETE";
  options.headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };
  return await HttpRequest(endpoint, options);
};
const GetToken = async (endpoint, options) => {
  return await HttpRequest(endpoint, options);
};

export { GetRequest, SendRequest, DeleteRequest, GetToken };
