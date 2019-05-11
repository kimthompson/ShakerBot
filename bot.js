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
      let role = roles.find(role => role.command === command);

      if (message.member.roles.has(role.id)) {
        message.member.removeRole(role.id);
        console.log(`Removing ${user.username} from ${role.name} role`);
      } else {
        message.member.addRole(role.id);
        console.log(`Adding ${user.username} to ${role.name} role.`);
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
        message.member.removeRole(mainRole.id);

        console.log(
          `${user.username}'s main role is no longer ${mainRole.name
            .split(" ")
            .shift()}`
        );
      } else {
        message.member.addRole(mainRole.id);
        message.member.removeRole(otherRole.id);
        message.member.removeRole(anotherRole.id);

        console.log(
          `Setting ${user.username}'s main role to ${mainRole.name
            .split(" ")
            .shift()}`
        );
      }

      message.delete().catch(console.error);
      break;
    case "roles":
      let roleList = "Here is the list of your current roles:\n";
      message.member.roles.forEach(function(role) {
        roleList = roleList.concat(`${role.name}\n`);
      });
      message.member.send(roleList).catch(console.error);
      message.delete().catch(console.error);
      break;
    case "sleep":
      // ADMIN ONLY
      let adminId = roles.find(role => role.name === "Admin").id;

      if (message.member.roles.has(adminId)) {
        utils.alertAdmin(guild, config, "Takin' a snooze!");
        message.delete();

        setTimeout(() => {
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
