const cron = require("node-cron");

function startTimers(guild) {
  console.log("Starting timers . . .");

  cron.schedule("0 20 * * SAT", () => {
    console.log("Cactpot reminder running at 8:00 PM on Saturdays");
    const role = guild.roles.find(r => r.name === "Cactpot");

    role.members.forEach(member => {
      new Promise(resolve => {
        member.user
          .send(
            `Hello, ${
              member.user.username
            }! The Jumbo Cactpot drawing is in an hour. Make sure you have your numbers ready!`
          )
          .catch(console.error);
        resolve();
      }).then(() => {
        console.log(`Cactpot reminder sent to ${member.user.username}.`);
      });
    });
  });

  cron.schedule("0 18 * * TUE,FRI", () => {
    console.log(
      "Wondrous Tails reminder running at 6:00 PM on Tuesdays and Fridays"
    );
    const role = guild.roles.find(r => r.name === "Journal");

    role.members.forEach(member => {
      new Promise(resolve => {
        member.user
          .send(
            `Hello, ${
              member.user.username
            }! You should work on your Wondrous Tails journal for Khloe!`
          )
          .catch(console.error);
        resolve();
      }).then(() => {
        console.log(`Wondrous Tails reminder sent to ${member.user.username}`);
      });
    });
  });
}

module.exports = {
  startTimers
};
