const cron = require("node-cron");
const fetch = require("node-fetch");

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

  cron.schedule("55 20 * * SAT", () => {
    console.log("Cactpot reminder running at 8:55 PM on Saturdays");
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

  cron.schedule("0 10 * * FRI", async () => {
    console.log("Fashion Report reminder running at 10:00 AM on Friday");
    let res = await fetch(
      "https://www.reddit.com/r/ffxiv/search.json?q=title:Fashion Report - Full Details - For Week Of&sort=new&restrict_sr=on&limit=1"
    );
    let data = await res.json();
    let reportLink = data.data.children[0].data.url;
    let ffxivDiscussionChannelId = "335118290164776961";

    let channel = guild.channels.get(ffxivDiscussionChannelId);

    channel.send(
      `Happy Thursday! It's almost Friday! Have you turned it out for your Fashion Report and some sweet, sweet MGP? This week's guide can be found here --> ${reportLink}`
    );
  });
}

module.exports = {
  startTimers
};
