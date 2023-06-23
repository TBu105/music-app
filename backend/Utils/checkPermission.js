const checkPermissonToChangeInfo = (currentUser, idUserBeChangeInfo) => {
  if (currentUser.userId === idUserBeChangeInfo) return;
  if (currentUser.role == "admin") return;
  throw Error("Do not have permisson");
};

const checkAdminRightPermission = (currentUser) => {
  if (currentUser.role === "admin") return;
  throw Error("Do not have permisson to change the user role");
};

module.exports = { checkPermissonToChangeInfo, checkAdminRightPermission };
