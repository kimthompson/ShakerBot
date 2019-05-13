const Discord = require("discord.js");
const config = require("./config.json");
const utils = require("./utils");
const process = require("./process");

const bot = new Discord.Client();

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

  let args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);

  const command = args.shift().toLowerCase();

  if (command in utils.validCommands) return;

  const guild = bot.guilds.get(config.guild);
  const roles = utils.getRoles(guild);

  process.command(command, message, roles, guild, bot);
});

bot.login(config.token);
