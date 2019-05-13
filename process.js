const config = require("./config.json");
const utils = require("./utils");

function basicCommand(command, roles, message) {
  // Basic role addition/removal
  let role = roles.find(role => role.command === command);

  if (message.member.roles.has(role.id)) {
    message.member.removeRole(role.id);
    console.log(
      `Removing ${message.member.user.username} from ${role.name} role`
    );
  } else {
    message.member.addRole(role.id);
    console.log(`Adding ${message.member.user.username} to ${role.name} role.`);
  }

  message.delete().catch(console.error);
}

function mainCommand(command, roles, message) {
  // Main role addition/removal
  let offRoles = utils.mainCommands.filter(role => command !== role);

  let mainRole = roles.find(role => role.command === command);
  let otherRole = roles.find(role => role.command === offRoles[0]);
  let anotherRole = roles.find(
    role => role.command === offRoles[offRoles.length - 1]
  );

  if (message.member.roles.has(mainRole.id)) {
    message.member.removeRole(mainRole.id);

    console.log(
      `${
        message.member.user.username
      }'s main role is no longer ${mainRole.name.split(" ").shift()}`
    );
  } else {
    message.member.addRole(mainRole.id);
    message.member.removeRole(otherRole.id);
    message.member.removeRole(anotherRole.id);

    console.log(
      `Setting ${
        message.member.user.username
      }'s main role to ${mainRole.name.split(" ").shift()}`
    );
  }

  message.delete().catch(console.error);
}

function roleCommand(message) {
  // Returns user's roles in a chat to them
  let roleList = "Here is the list of your current roles:\n";
  message.member.roles.forEach(function(role) {
    roleList = roleList.concat(`${role.name}\n`);
  });
  message.member.send(roleList).catch(console.error);
  message.delete().catch(console.error);
}

function sleepCommand(message, guild, bot) {
  // *ADMIN ONLY* puts the bot to sleep
  let adminId = guild.roles.find(r => r.name === "Admin").id;

  if (message.member.roles.has(adminId)) {
    new Promise((resolve, reject) => {
      guild.members.find(u => u.id === config.creator).send("Takin' a snooze!");
      resolve();
    }).then(() => {
      console.log("Naptime!");
      bot.destroy();
    });
  } else {
    guild.members
      .find(u => u.id === config.creator)
      .send(`${message.member.user.username} attempted to put me to sleep.`)
      .catch(console.error);
    message.delete().catch(console.error);
  }
}

function command(command, message, roles, guild, bot) {
  if (utils.basicCommands.includes(command)) {
    basicCommand(command, roles, message);
  } else if (utils.mainCommands.includes(command)) {
    mainCommand(command, roles, message);
  } else if (command === "role") {
    roleCommand(message);
  } else if (command === "sleep") {
    sleepCommand(message, guild, bot);
  }
}

module.exports = {
  command
};
