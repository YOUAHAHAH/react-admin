import getToken from "../utils/getToken";

const defaultToken = getToken();

export default (state = defaultToken, action, data) => {
  let token = state;

  switch (action.type) {
    case "getUserToken":
      token = getToken();
      return token;

    case "loseUserToken":
      token = null;
      return token;
  }

  return token;
};
