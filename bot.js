const Discord = require("discord.js");
const config = require("./config.json");
const utils = require("./utils");

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
  if (utils.shouldIgnore(message, config)) return;

  let args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);

  const command = args.shift().toLowerCase();

  if (command in utils.validCommands) return;

  const user = message.member.user;
  const guild = bot.guilds.get(config.guild);
  const roles = utils.getRoles(guild);

  switch (command) {
    case "tank":
    case "healer":
    case "dps":
    case "treasure":
    case "journal":
    case "cactpot":
      let aRole = roles.find(role => role.command === command);

      if (message.member.roles.has(aRole)) {
        message.member.removeRole(aRole.id).catch(console.error);
        console.log(`Removing ${user.username} from ${aRole.name} role`);
      } else {
        message.member.addRole(aRole.id).catch(console.error);
        console.log(`Adding ${user.username} to ${aRole.name} role.`);
      }
      message.delete().catch(console.error);
      break;
    case "tankmain":
    case "healermain":
    case "dpsmain":
      let offRoles = ["tankmain", "healermain", "dpsmain"].filter(
        role => command !== role
      );

      let mainRole = roles.find(role => role.command === command);
      let otherRole = roles.find(role => role.command === offRoles[0]);
      let anotherRole = roles.find(
        role => role.command === offRoles[offRoles.length - 1]
      );

      if (message.member.roles.has(mainRole.id)) {
        message.member.removeRole(mainRole.id).catch(console.error);
        console.log(`Removing ${user.username} from ${mainRole.name} role.`);
      } else if (message.member.roles.has(otherRole.id)) {
        message.member.removeRole(otherRole.id).catch(console.error);
        message.member.addRole(mainRole.id).catch(console.error);
        console.log(
          `Removed ${user.username} from ${otherRole.name} role, added to ${
            mainRole.name
          } role.`
        );
      } else if (message.member.roles.has(anotherRole.id)) {
        message.member.removeRole(anotherRole.id).catch(console.error);
        message.member.addRole(mainRole.id).catch(console.error);
        console.log(
          `Removed ${user.username} from ${anotherRole.name} role, added to ${
            mainRole.name
          } role.`
        );
      } else {
        message.member.addRole(mainRole.id).catch(console.error);
        console.log(`Adding ${user.username} to ${mainRole.name} role.`);
      }
      message.delete().catch(console.error);
      break;
    case "roles":
      var roleList = "Here is the list of your current roles:\n";
      message.member.roles.forEach(function(role, roleID) {
        roleList = roleList.concat(`${role.name}\n`);
      });
      message.member.send(roleList).catch(console.error);
      message.delete().catch(console.error);
      break;
    // ADMIN ONLY
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
    default:
      message.delete().catch(console.error);
  }
});

bot.login(config.token);
