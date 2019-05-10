const Discord = require("discord.js");
const config = require("./config.json");

const validCommands = [
  "sleep",
  "tankmain",
  "healermain",
  "dpsmain",
  "tank",
  "healer",
  "dps",
  "treasure",
  "journal",
  "cactpot",
  "roles"
];

// Based on the message, should return an object containing roles and their ids

function shouldIgnore(msg, cfg) {
  let isBot = msg.author.bot;
  let isBotChannel = msg.channel.id === (cfg.testchannel || cfg.botchannel);
  let isCommand = msg.content.startsWith(cfg.prefix);

  if (isBot || !isBotChannel) {
    return true;
  } else if (!isCommand) {
    msg.delete().catch(console.error);
    return true;
  } else {
    return false;
  }
}

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
  if (shouldIgnore(message, config)) return;

  let args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);

  const command = args.shift().toLowerCase();

  if (command in validCommands) return;

  const user = message.member.user;
  const guild = bot.guilds.get(config.guild);
  const roleIdLookup = [
    { Tank: guild.roles.find(r => r.name === "Tank").id },
    { Healer: guild.roles.find(r => r.name === "Healer").id },
    { DPS: guild.roles.find(r => r.name === "DPS").id }
  ];

  const roles = [
    {
      command: "tank",
      name: "Tank",
      id: guild.roles.find(r => r.name === "Tank").id
    },
    {
      command: "healer",
      name: "Healer",
      id: guild.roles.find(r => r.name === "Healer").id
    },
    {
      command: "dps",
      name: "DPS",
      id: guild.roles.find(r => r.name === "DPS").id
    }
  ];

  console.log(roles);

  switch (command) {
    case "tank":
    case "healer":
    case "dps":
      let thisRole = roles.find(role => role.command === command);

      if (message.member.roles.has(thisRole)) {
        message.member.removeRole(thisRole.id).catch(console.error);
        console.log(`Removing ${user.username} from ${thisRole.name} role`);
      } else {
        message.member.addRole(thisRole.id).catch(console.error);
        console.log(`Adding ${user.username} to ${thisRole.name} role.`);
      }
      message.delete().catch(console.error);
      break;
    // !tankmain
    case "tankmain":
      var mainrole = guild.roles.find(r => r.name === "Tank Main");
      var hrole = guild.roles.find(r => r.name === "Healer Main");
      var drole = guild.roles.find(r => r.name === "DPS Main");
      if (message.member.roles.has(mainrole.id)) {
        message.member.removeRole(mainrole.id).catch(console.error);
        console.log(`Removing ${user.username} from Tank Main role.`);
      } else if (message.member.roles.has(hrole.id)) {
        message.member.removeRole(hrole.id).catch(console.error);
        message.member.addRole(mainrole.id).catch(console.error);
        console.log(
          `Removed ${
            user.username
          } from Healer Main role, added to Tank Main role.`
        );
      } else if (message.member.roles.has(drole.id)) {
        message.member.removeRole(drole.id).catch(console.error);
        message.member.addRole(mainrole.id).catch(console.error);
        console.log(
          `Removed ${
            user.username
          } from DPS Main role, added to Tank Main role.`
        );
      } else {
        message.member.addRole(mainrole.id).catch(console.error);
        console.log(`Adding ${user.username} to Tank Main role.`);
      }
      message.delete().catch(console.error);
      break;
    // !healermain
    case "healermain":
      var mainrole = guild.roles.find(r => r.name === "Healer Main");
      var trole = guild.roles.find(r => r.name === "Tank Main");
      var drole = guild.roles.find(r => r.name === "DPS Main");
      if (message.member.roles.has(mainrole.id)) {
        message.member.removeRole(mainrole.id).catch(console.error);
        console.log(`Removing ${user.username} from Healer Main role.`);
      } else if (message.member.roles.has(trole.id)) {
        message.member.removeRole(trole.id).catch(console.error);
        message.member.addRole(mainrole.id).catch(console.error);
        console.log(
          `Removed ${
            user.username
          } from Tank Main role, added to Healer Main role.`
        );
      } else if (message.member.roles.has(drole.id)) {
        message.member.removeRole(drole.id).catch(console.error);
        message.member.addRole(mainrole.id).catch(console.error);
        console.log(
          `Removed ${
            user.username
          } from DPS Main role, added to Healer Main role.`
        );
      } else {
        message.member.addRole(mainrole.id).catch(console.error);
        console.log(`Adding ${user.username} to Healer Main role.`);
      }
      message.delete().catch(console.error);
      break;
    // !dpsmain
    case "dpsmain":
      var mainrole = guild.roles.find(r => r.name === "DPS Main");
      var hrole = guild.roles.find(r => r.name === "Healer Main");
      var trole = guild.roles.find(r => r.name === "Tank Main");
      if (message.member.roles.has(mainrole.id)) {
        message.member.removeRole(mainrole.id).catch(console.error);
        console.log(`Removing ${user.username} from DPS Main role.`);
      } else if (message.member.roles.has(hrole.id)) {
        message.member.removeRole(hrole.id).catch(console.error);
        message.member.addRole(mainrole.id).catch(console.error);
        console.log(
          `Removed ${
            user.username
          } from Healer Main role, added to DPS Main role.`
        );
      } else if (message.member.roles.has(trole.id)) {
        message.member.removeRole(trole.id).catch(console.error);
        message.member.addRole(mainrole.id).catch(console.error);
        console.log(
          `Removed ${
            user.username
          } from Tank Main role, added to DPS Main role.`
        );
      } else {
        message.member.addRole(mainrole.id).catch(console.error);
        console.log(`Adding ${user.username} to DPS Main role.`);
      }
      message.delete().catch(console.error);
      break;
    // !treasure
    case "treasure":
      var role = guild.roles.find(r => r.name === "Treasure");
      if (message.member.roles.has(role.id)) {
        message.member.removeRole(role.id).catch(console.error);
        console.log(`Removing ${user.username} from Treasure role.`);
      } else {
        message.member.addRole(role.id).catch(console.error);
        console.log(`Adding ${user.username} to Treasure role.`);
      }
      message.delete().catch(console.error);
      break;
    // !journal
    case "journal":
      var role = guild.roles.find(r => r.name === "Journal");
      if (message.member.roles.has(role.id)) {
        message.member.removeRole(role.id).catch(console.error);
        console.log(`Removing ${user.username} from Journal role.`);
      } else {
        message.member.addRole(role.id).catch(console.error);
        console.log(`Adding ${user.username} to Journal role.`);
      }
      message.delete().catch(console.error);
      break;
    // !cactpot
    case "cactpot":
      var role = guild.roles.find(r => r.name === "Cactpot");
      if (message.member.roles.has(role.id)) {
        message.member.removeRole(role.id).catch(console.error);
        console.log(`Removing ${user.username} from Cactpot role.`);
      } else {
        message.member.addRole(role.id).catch(console.error);
        console.log(`Adding ${user.username} to Cactpot role.`);
      }
      message.delete().catch(console.error);
      break;
    // !roles
    case "roles":
      var roleList = "Here is the list of your current roles:\n";
      message.member.roles.forEach(function(role, roleID) {
        roleList = roleList.concat(`${role.name}\n`);
      });
      message.member.send(roleList).catch(console.error);
      message.delete().catch(console.error);
      break;
    // !sleep <<ADMIN ONLY>>
    case "sleep":
      if (
        message.member.roles.has(guild.roles.find(r => r.name === "Admin").id)
      ) {
        guild.members
          .find(u => u.id === config.creator)
          .send(`Takin' a snooze!`)
          .catch(console.error);
        message.delete().catch(console.error);
        setTimeout(function() {
          console.log("Naptime!");
          bot.destroy();
        }, 5000);
      } else {
        guild.members
          .find(u => u.id === config.creator)
          .send(`${user.username} attempted to put me to sleep.`)
          .catch(console.error);
        message.delete().catch(console.error);
      }
      break;
    // DEFAULT
    default:
      message.delete().catch(console.error);
  }
});

bot.login(config.token);
