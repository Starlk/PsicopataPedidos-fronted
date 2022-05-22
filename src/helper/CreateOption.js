const CreateOptions = (method, headers, data = {}) => {
  return {
    method,
    headers,
    body: JSON.stringify(data),
  };
};

export default CreateOptions;
