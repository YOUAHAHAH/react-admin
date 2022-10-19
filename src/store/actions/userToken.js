/*
    获取用户 token
*/

export const createUserToken = (UserTokenObj) => ({
  type: "getUserToken",
  data: UserTokenObj,
});

export const loseUserToken = (UserTokenObj) => ({
  type: "loseUserToken",
  data: UserTokenObj,
});
