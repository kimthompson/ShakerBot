const Discord = require("discord.js");
const config = require("../config.json");
const utils = require("./utils");
const CommandProcessor = require("./CommandProcessor");

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

  const command = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g)
    .shift()
    .toLowerCase();

  if (command in utils.validCommands) return;

  const guild = bot.guilds.get(config.guild);
  const roles = utils.getRoles(guild);

  const processor = new CommandProcessor(message, guild, roles, command, bot);
  processor.runCommand();
});

bot.login(config.token);