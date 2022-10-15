import request from "./request";

// 卡片列表展示
export const cardList = () => request.get("/api/cardList");

// 添加至卡片列表
export const addCardList = (params) => request.post("/api/addCardList", params);

// 删除卡片
export const delCardList = (params) => request.post("/api/delCardList", params);

// 查询列表展示
export const tableList = (params) => request.get("/api/tableList", { params });

// 编辑列表
export const editTableList = (params) =>
  request.post("/api/editTableList", params);

// 删除列表
export const delTableList = (params) =>
  request.post("/api/delTableList", params);

// 添加列表
export const addTableList = (params) =>
  request.post("/api/addTableList", params);

// 搜索列表
export const searchTableList = (params) =>
  request.post("/api/searchTableList", params);

// 用户列表
export const userTableList = (params) =>
  request.get("/api/userTableList", { params });

// 用户状态
export const userState = (params) => request.post("/api/userState", params);

// 查找编辑用户
export const userEditId = (params) =>
  request.get("/api/userEditId", { params });

// 编辑用户
export const userEdit = (params) => request.post("/api/userEdit", params);

// 添加用户
export const userAdd = (params) => request.post("/api/userAdd", params);

// 删除用户
export const userDelete = (params) => request.post("/api/userDelete", params);

// 分步列表查找用户
export const stepsGetUser = (params) =>
  request.get("/api/stepsGetUser", { params });

// 分步列表提交
export const stepsSubmit = (params) => request.post("/api/stepsSubmit", params);

// 分布列表查询
export const stepsBill = (params) => request.get("/api/stepsBill", { params });

// 发布消息搜索可发布对象
export const serachMessageUser = () => request.get("/api/serachMessageUser");

// 消息发布
export const publicMessage = (params) =>
  request.post("/api/serachMessageUser", params);

// 未读消息
export const unreadMessages = () => request.get("/api/UnreadMessages");

// 标记已读
export const TaggedMessage = (params) =>
  request.post("/api/TaggedMessage", params);

// 已读消息
export const receivedReadMessage = () =>
  request.get("/api/receivedReadMessage");

// 标记删除
export const markingForDeletion = (params) =>
  request.post("/api/markingForDeletion", params);

// 回收站
export const recyclingStation = () => request.get("/api/recyclingStation");

// 还原
export const restoreMessage = (params) =>
  request.post("/api/restoreMessage", params);

// 彻底删除
export const deleteMessage = (params) =>
  request.post("/api/deleteMessage", params);

// 查看消息
export const selectMessage = (params) =>
  request.post("/api/selectMessage", params);

// 清空消息 - 全部删除 - 清空回收站
export const dAllMessage = (params) => request.post("/api/dAllMessage", params);

// 登录
export const loginUser = (params) => request.post("/api/loginUser", params);

// 注册
export const regUser = (params) => request.post("/api/regUser", params);

// token查找用户信息
export const tokenGetInfo = (params) =>
  request.post("/api/tokenGetInfo", params);
