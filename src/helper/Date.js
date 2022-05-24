import moment from "moment";
const getCurrentTime = () => {
  return moment().format();
};
export default getCurrentTime;
