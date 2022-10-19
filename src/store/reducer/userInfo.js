const defaultInfo = null;

export default function userInfo(state = defaultInfo, action) {
  const { type, data } = action;

  switch (type) {
    case "getUserInfo":
      return (state = data);
    case "loseUserInfo":
      return (state = null);
    default:
      return (state = null);
  }
}
