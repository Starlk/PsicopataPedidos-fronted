export default {
  redirectUri: import.meta.env.VITE_APP_BASE_URL,
  clientid: import.meta.env.VITE_APP_ADB2C_CLIENT_ID,
  authority: import.meta.env.VITE_APP_ADB2C_AUTHORITY,
  authorityForgotPassword: "",
  scopes: [import.meta.env.VITE_APP_AD_SCOPE],
  codeErrorForgotPassword: "AADB2C90118",
  cacheLocation: "localStorage",
};
