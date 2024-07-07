const { prisma } = require("../db");
const verifyUser = require("./verifyUser");
// const { sendSlackMessage } = require("./slack");
const addError = require("./error");

const addUser = async ({
  date,
  id,
  ip,
  name,
  isOnload = false,
  isPortfolio = false,
}) => {
  const dateUTC = new Date(date);
  if (await verifyUser(id)) {
    try {
      const user = !isOnload
        ? await prisma.users.update({
            data: {
              // userVisits: {
              //   push: dateUTC,
              // },
              userNames: {
                push: name,
              },
              // visitCount: {
              //   increment: 1,
              // },
            },
            where: {
              userId: id,
            },
          })
        : await prisma.users.update({
            data: {
              userVisits: {
                push: dateUTC,
              },
              visitCount: {
                increment: 1,
              },
            },
            where: {
              userId: id,
            },
          });
      if (!user.isAdmin) {
        // await sendSlackMessage({
        //   isOnboard: false,
        //   country: user.countryName,
        //   region: user.region,
        //   city: user.city,
        //   userId: user.userId,
        //   userIP: user.userIP,
        //   netwokr: user.org,
        // });
      }

      return "user_visit";
    } catch (e) {
      console.log(e);
      await addError(e, ip, id, date);
      return false;
    }
  }
  try {
    const data = await getUserLocation({ ip, id, joinUTCDate: dateUTC, name });
    const user = !isOnload
      ? await prisma.users.create({
          data: {
            ...data,
            userNames: {
              push: name,
            },
            isPortfolio,
          },
        })
      : await prisma.users.create({
          data: {
            ...data,
            isPortfolio,
          },
        });
    // await sendSlackMessage({
    //   isOnboard: true,
    //   country: user.countryName,
    //   region: user.region,
    //   city: user.city,
    //   userId: user.userId,
    //   userIP: user.userIP,
    //   netwokr: user.org,
    // });
    return "user_onboard";
  } catch (e) {
    console.log(e);
    await addError(e, ip, id, date);
    return false;
  }
};

const getUserLocation = async ({ ip, joinUTCDate, name, id }) => {
  const data1 = await fetch(`https://ipapi.co/${ip}/json/`).then((res) =>
    res.json()
  );
  console.log(data1);
  if (data1.error) {
    const data2 = await fetch(`http://ip-api.com/json/${ip}`).then((res) =>
      res.json()
    );
    console.log(data2);
    return {
      city: data2.city,
      countryName: data2.country,
      latitude: `${data2.lat}`,
      longitude: `${data2.lon}`,
      org: data2.org,
      postal: data2.zip,
      region: data2.regionName,
      timezone: data2.timezone,
      userIP: data2.query,
      countryCode: data2.countryCode,
      regionCode: data2.region,
      joinUTCDate: joinUTCDate,
      userVisits: [joinUTCDate],
      userId: id,
    };
  } else {
    return {
      city: data1.city,
      countryName: data1.country_name,
      latitude: `${data1.latitude}`,
      longitude: `${data1.longitude}`,
      org: data1.org,
      postal: data1.postal,
      region: data1.region,
      timezone: data1.timezone,
      userIP: data1.ip,
      countryCode: data1.country_code,
      regionCode: data1.region_code,
      joinUTCDate: joinUTCDate,
      userVisits: [joinUTCDate],
      userId: id,
    };
  }
};

module.exports = addUser;
