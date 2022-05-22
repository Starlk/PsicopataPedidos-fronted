import jwt_decode from "jwt-decode";

const DecodeToken = (toke) => {
  return jwt_decode(toke, { header: true });
};
export default DecodeToken;
