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
const GetRequest = async (endpoint) => {
  return await HttpRequest(endpoint, { method: "GET" });
};
const SendRequest = async (endpoint, data, method, options = {}) => {
  if (ValidatedOptions(options)) return await HttpRequest(endpoint, options);
  options.method = method || "POST";
  options.headers = {
    "Content-Type": "application/json",
  };
  options.body = JSON.stringify(data);
  return await HttpRequest(endpoint, options);
};
const DeleteRequest = async (endpoint, options = {}) => {
  if (ValidatedOptions(options)) return await HttpRequest(endpoint, options);
  options.method = "DELETE";
  options.headers = {
    "Content-Type": "application/json",
  };
  return await HttpRequest(endpoint, options);
};

export { GetRequest, SendRequest, DeleteRequest };
