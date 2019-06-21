const Discord = require("discord.js");
const config = require("../config.json");
const utils = require("./utils");
const timers = require("./timers");
const CommandProcessor = require("./CommandProcessor");

const bot = new Discord.Client();

bot.on("ready", () => {
  bot.users
    .get(config.creator)
    .send("I'm awake!")
    .catch(console.error);
  bot.user.setActivity("FC chat", { type: "LISTENING" });
  console.log("I am awake and ready to work!");

  const guild = bot.guilds.get(config.guild);

  timers.startTimers(guild);
});

bot.on("message", message => {
  let isBot = message.author.bot;
  let isBotChannel =
    message.channel.id === config.testchannel ||
    message.channel.id === config.botchannel;
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

  if (!utils.validCommands.includes(command)) {
    message.delete().catch(console.error);
    return;
  }

  const guild = bot.guilds.get(config.guild);
  const roles = utils.getRoles(guild);

  const processor = new CommandProcessor(message, guild, roles, command, bot);
  processor.runCommand();

  // message.delete().catch(console.error);
  return;
});

bot.on("disconnect", function(event) {
  console.log(
    `The WebSocket has closed and Shaker will no longer attempt to reconnect`
  );
});

bot.on("reconnecting", function() {
  console.log(`Shaker is trying to reconnect to the WebSocket`);
});

bot.on("resume", function(replayed) {
  console.log(`Shaker resumed the WebSocket: ${replayed}`);
});

bot.on("error", function(error) {
  console.error(`Shaker's WebSocket encountered a connection error: ${error}`);
});

bot.on("warn", function(info) {
  console.log(`warn: ${info}`);
});

bot.login(config.token);
