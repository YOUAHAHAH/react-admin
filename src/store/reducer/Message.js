const defaultToken = 0;

export default function userToken(state = defaultToken, action) {
  const { type, data } = action;

  switch (type) {
    case "getMsg":
      return (state = data);
  }

  return state;
}
