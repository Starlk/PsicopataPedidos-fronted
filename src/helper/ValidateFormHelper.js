const ValidateForm = (form = {}) => {
  let FormValue = Object.values(form);
  for (const value of FormValue) {
    if (!value) return false;
  }
  return true;
};

export default ValidateForm;
