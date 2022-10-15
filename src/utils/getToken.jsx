// 从localstorage中取token
const getToken = () => {
  return localStorage.getItem("react-token");
};

export default getToken;
