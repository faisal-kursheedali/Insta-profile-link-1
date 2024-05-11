const { prisma } = require("../db");

const verifyUser = async (id) => {
  const user = await prisma.users.findFirst({
    where: {
      userId: id,
    },
  });
  console.log(user);
  console.log(user);
  if (user) {
    return user.userId;
  } else {
    return false;
  }
};

module.exports = verifyUser;
