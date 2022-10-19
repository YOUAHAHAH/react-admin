/*
    未读信息
*/

import { unreadMessages } from "../../api/api";

export const createMessage = (data) => ({ type: "getMsg", data });

export const createMessageAsync = () => {
  return (dispatch) => {
    unreadMessages().then((res) => {
      const { code, data } = res;
      if (code === 200) {
        dispatch(createMessage(data.length));
      }
    });
  };
};
