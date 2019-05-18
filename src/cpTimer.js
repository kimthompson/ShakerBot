/* A timer to remind players to gamble! */

const Discord = require("discord.js");
const config = require("../config.json");
const bot = new Discord.Client();

bot.login(config.token).then(() => {
  console.log("Cactpot reminder running!");
  const guild = bot.guilds.get(config.guild);
  const role = guild.roles.find(r => r.name === "Cactpot");

  role.members.forEach(function(member) {
    new Promise(resolve => {
      console.log(`Messaging ${member.user} re: Cactpot...`);
      member.user
        .send(
          `Hello, ${
            member.user
          }! The Jumbo Cactpot drawing is in an hour. Make sure you have your numbers ready!`
        )
        .catch(console.error);
      resolve();
    }).then(() => {
      console.log("Message sent!");
      bot.destroy();
    });
  });
});
