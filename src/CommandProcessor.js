const config = require("../config.json");
const utils = require("./utils");

class CommandProcessor {
  constructor(message, guild, roles, command, bot) {
    this.message = message;
    this.guild = guild;
    this.roles = roles;
    this.command = command;
    this.bot = bot;
  }

  basicCommand() {
    // Basic role addition/removal
    let role = this.roles.find(role => role.command === this.command);

    if (this.message.member.roles.has(role.id)) {
      this.message.member.removeRole(role.id);
      console.log(
        `Removing ${this.message.member.user.username} from ${role.name} role`
      );
    } else {
      this.message.member.addRole(role.id);
      console.log(
        `Adding ${this.message.member.user.username} to ${role.name} role.`
      );
    }

    this.message.delete().catch(console.error);
  }

  mainCommand() {
    // Main role addition/removal
    let offRoles = utils.mainCommands.filter(role => this.command !== role);

    let mainRole = this.roles.find(role => role.command === this.command);
    let otherRole = this.roles.find(role => role.command === offRoles[0]);
    let anotherRole = this.roles.find(
      role => role.command === offRoles[offRoles.length - 1]
    );

    if (this.message.member.roles.has(mainRole.id)) {
      this.message.member.removeRole(mainRole.id);
      console.log(
        `${
          this.message.member.user.username
        }'s main role is no longer ${mainRole.name.split(" ").shift()}`
      );
    } else {
      this.message.member.addRole(mainRole.id);
      this.message.member.removeRole(otherRole.id);
      this.message.member.removeRole(anotherRole.id);
      console.log(
        `Setting ${
          this.message.member.user.username
        }'s main role to ${mainRole.name.split(" ").shift()}`
      );
    }

    this.message.delete().catch(console.error);
  }

  roleCommand() {
    // Returns user's roles in a chat to them
    let roleList = "Here is the list of your current roles:\n";
    this.message.member.roles.forEach(function(role) {
      roleList = roleList.concat(`${role.name}\n`);
    });
    this.message.member.send(roleList).catch(console.error);
    this.message.delete().catch(console.error);
  }

  sleepCommand() {
    // *ADMIN ONLY* puts the bot to sleep
    let adminId = this.guild.roles.find(r => r.name === "Admin").id;

    if (this.message.member.roles.has(adminId)) {
      new Promise(resolve => {
        this.guild.members
          .find(u => u.id === config.creator)
          .send("Takin' a snooze!");
        resolve();
      }).then(() => {
        console.log("Naptime!");
        this.bot.destroy();
      });
    } else {
      this.guild.members
        .find(u => u.id === config.creator)
        .send(
          `${this.message.member.user.username} attempted to put me to sleep.`
        )
        .catch(console.error);
      this.message.delete().catch(console.error);
    }
  }

  runCommand() {
    if (utils.basicCommands.includes(this.command)) {
      this.basicCommand();
    } else if (utils.mainCommands.includes(this.command)) {
      this.mainCommand();
    } else if (this.command === "role") {
      this.roleCommand();
    } else if (this.command === "sleep") {
      this.sleepCommand();
    }
  }
}

module.exports = CommandProcessor;
