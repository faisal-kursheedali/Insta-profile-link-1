// const objectHash = require("object-hash");
const { prisma } = require("../db");
// const { sendSlackError } = require("./slack");
// const addUser = require("./addUser");

const dateTime = new Date();

const addError = async (error, ip = null, id = null, date) => {
  // if (ip != null) {
  try {
    await insertError(error, ip, id, date);
    return true;
  } catch (e) {
    console.log(e);
    // if (e?.meta?.field_name?.includes("userIP_fkey")) {
    //   try {
    //     console.log("Insert user then insert data");
    //     if (await addUser({ ip, date, id })) {
    //       await insertError(error, ip, id, date);
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } catch (e) {
    //     console.log(e);
    //     return false;
    //   }
    // }
  }
};
// else {
//   try {
//     await insertError(error, ip, id, date);
//     return true;
//   } catch (e) {
//     console.log(e);
//     return false;
//   }
// }
// };

const insertError = async (e, ip, id, date) => {
  const { message, name, stack } = e;
  await prisma.error.create({
    data: {
      message,
      name,
      stack,
      dateTime: date,
      userIP: ip,
      userId: id,
    },
  });
  // sendSlackError(e);
};

module.exports = addError;
