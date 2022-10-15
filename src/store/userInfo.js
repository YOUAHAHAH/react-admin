import { tokenGetInfo } from "../api/api";
import getToken from "../utils/getToken";

const defaultInfo = null;

export default (state = defaultInfo, action) => {
  let info = state;
  // const { type, dataInfo } = action;

  console.log(action);

  switch (action.type) {
    case "getUserInfo":
      info = dataInfo;
      return info;

    case "loseUserInfo":
      info = null;
      return info;
  }

  return info;
};
