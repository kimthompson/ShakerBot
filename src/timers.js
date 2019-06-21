const schedule = require("node-schedule");
const fetch = require("node-fetch");
const { format } = require("date-fns");

function cactpotTimer(guild) {
  let cactpotRule = new schedule.RecurrenceRule();
  cactpotRule.dayOfWeek = [6];
  cactpotRule.hour = 20;
  cactpotRule.minute = 0;

  schedule.scheduleJob(cactpotRule, function() {
    let now = new Date();
    console.log(`Cactpot reminder ran at ${format(now, "H:mm on dddd")}.`);
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
}

function urgentCactpotTimer(guild) {
  let urgentCactpotRule = new schedule.RecurrenceRule();
  urgentCactpotRule.dayOfWeek = [6];
  urgentCactpotRule.hour = 20;
  urgentCactpotRule.minute = 55;

  schedule.scheduleJob(urgentCactpotRule, function() {
    let now = new Date();
    console.log(
      `Urgent Cactpot reminder ran at ${format(now, "H:mm on dddd")}.`
    );

    const role = guild.roles.find(r => r.name === "Cactpot");
    role.members.forEach(member => {
      new Promise(resolve => {
        member.user
          .send(
            `Hello, ${
              member.user.username
            }! The Jumbo Cactpot drawing is in five minutes! See you at the Gold Saucer!`
          )
          .catch(console.error);
        resolve();
      }).then(() => {
        console.log(`Urgent Cactpot reminder sent to ${member.user.username}.`);
      });
    });
  });
}

function tailsTimer(guild) {
  let tailsRule = new schedule.RecurrenceRule();
  tailsRule.dayOfWeek = [2, 5];
  tailsRule.hour = 18;
  tailsRule.minute = 0;

  schedule.scheduleJob(tailsRule, function() {
    let now = new Date();
    console.log(
      `Wondrous Tails reminder ran at ${format(now, "H:mm on dddd")}.`
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

function fashionTimer(guild) {
  let fashionRule = new schedule.RecurrenceRule();
  fashionRule.dayOfWeek = [5];
  fashionRule.hour = 10;
  fashionRule.minute = 0;

  schedule.scheduleJob(fashionRule, async function() {
    let now = new Date();
    console.log(
      `Fashion Report reminder ran at ${format(now, "H:mm on dddd")}.`
    );

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

function testTimer(guild) {
  let testRule = new schedule.RecurrenceRule();

  schedule.scheduleJob(testRule, function() {
    let now = new Date();
    let testChannelId = "571461836592119809";
    let channel = guild.channels.get(testChannelId);

    console.log(`Test timer ran at ${format(now, "H:mm on dddd")}.`);

    channel.send(`Test timer ran at ${format(now, "H:mm on dddd")}.`);
  });
}

function startTimers(guild) {
  console.log("Starting timers . . .");

  cactpotTimer(guild);
  urgentCactpotTimer(guild);
  tailsTimer(guild);
  fashionTimer(guild);
  testTimer(guild);
}

module.exports = {
  startTimers
};
