import getToken from "../../utils/getToken";

const defaultToken = getToken();

export default function userToken(state = defaultToken, action) {
  const { type, data } = action;

  switch (type) {
    case "getUserToken":
      return (state = data);
    case "loseUserToken":
      return (state = null);
  }

  return state;
}
