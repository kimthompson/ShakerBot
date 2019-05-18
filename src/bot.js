const Discord = require("discord.js");
const config = require("../config.json");
const utils = require("./utils");
const CommandProcessor = require("./CommandProcessor");
const cron = require("node-cron");

const bot = new Discord.Client();
const guild = bot.guilds.get(config.guild);

bot.on("ready", () => {
  bot.users
    .get(config.creator)
    .send("I'm awake!")
    .catch(console.error);
  bot.user.setActivity("FC chat", { type: "LISTENING" });
  console.log("I am awake and ready to work!");
});

bot.on("message", message => {
  let isBot = message.author.bot;
  let isBotChannel =
    message.channel.id === (config.testchannel || config.botchannel);
  let isCommand = message.content.startsWith(config.prefix);

  if (isBot || !isBotChannel) return;
  if (!isCommand) {
    message.delete().catch(console.error);
    return;
  }

  const command = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g)
    .shift()
    .toLowerCase();

  if (command in utils.validCommands) return;

  const roles = utils.getRoles(guild);

  const processor = new CommandProcessor(message, guild, roles, command, bot);
  processor.runCommand();
});

cron.schedule("0 20 * * SAT", () => {
  console.log("Cactpot reminder running at 8:00 PM on Saturdays");
  const role = guild.roles.find(r => r.name === "Cactpot");

  role.members.forEach(member => {
    new Promise(resolve => {
      member.user
        .send(
          `Hello, ${
            member.user
          }! The Jumbo Cactpot drawing is in an hour. Make sure you have your numbers ready!`
        )
        .catch(console.error);
      resolve();
    }).then(() => {
      console.log(`Cactpot reminder sent to ${member.user}.`);
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
            member.user
          }! You should work on your Wondrous Tails journal for Khloe!`
        )
        .catch(console.error);
      resolve();
    }).then(() => {
      console.log(`Wondrous Tails reminder sent to ${member.user}`);
    });
  });
});

bot.login(config.token);
