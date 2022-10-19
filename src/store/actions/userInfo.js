/*
    获取用户信息
*/

import getToken from "../../utils/getToken";
import { tokenGetInfo } from "../../api/api";

export const createUserInfo = (data) => ({ type: "getUserInfo", data });

export const createUserInfoAsync = (UserInfoObj) => {
  return (dispatch) => {
    tokenGetInfo({ token: getToken() }).then((res) => {
      const { code, data } = res;
      if (code === 200) {
        dispatch(createUserInfo(data));
      }
    });
  };
};
