const HandleChange = (form, name, value) => {
  return { ...form, [name]: value };
};

export default HandleChange;
