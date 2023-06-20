const checkPermissonToChangeInfo = (currentUser, userBeChangeInfo) => {
  if (currentUser.userId === userBeChangeInfo) return;
  if (currentUser.role == "admin") return;
  throw Error("Do not have permisson to change the user role");
};

const checkAdminRightPermission = (currentUser) => {
  if (currentUser.role === "admin") return;
  throw Error("Do not have permisson to change the user role");
};

module.exports = { checkPermissonToChangeInfo, checkAdminRightPermission };
