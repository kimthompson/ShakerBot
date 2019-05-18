/* A timer to remind players of Wondrous Tails */

const Discord = require("discord.js");
const config = require("../config.json");
const bot = new Discord.Client();

bot.login(config.token).then(() => {
  console.log("Wonderous Tales reminder running!");
  const guild = bot.guilds.get(config.guild);
  const role = guild.roles.find(r => r.name === "Journal");

  role.members.forEach(function(member) {
    new Promise(resolve => {
      console.log(`Messaging ${member.user} re: Wonderous Tales...`);
      member.user
        .send(
          `Hello, ${
            member.user
          }! You should work on your Wondrous Tails journal for Khloe!`
        )
        .catch(console.error);
      resolve();
    }).then(() => {
      console.log("Message sent!");
      bot.destroy();
    });
  });
});
