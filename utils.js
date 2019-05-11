module.exports = {
  shouldIgnore: function(msg, cfg) {
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
  },
  validCommands: [
    "tank",
    "healer",
    "dps",
    "treasure",
    "journal",
    "cactpot",
    "tankmain",
    "healermain",
    "dpsmain",
    "roles",
    "sleep"
  ],
  getRoles: function(guild) {
    return [
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
      },
      {
        command: "tankmain",
        name: "Tank Main",
        id: guild.roles.find(r => r.name === "Tank Main").id
      },
      {
        command: "healermain",
        name: "Healer Main",
        id: guild.roles.find(r => r.name === "Healer Main").id
      },
      {
        command: "dpsmain",
        name: "DPS Main",
        id: guild.roles.find(r => r.name === "DPS Main").id
      },
      {
        command: "journal",
        name: "Journal",
        id: guild.roles.find(r => r.name === "Journal").id
      },
      {
        command: "cactpot",
        name: "Cactpot",
        id: guild.roles.find(r => r.name === "Cactpot").id
      },
      {
        command: "treasure",
        name: "Treasure",
        id: guild.roles.find(r => r.name === "Treasure").id
      }
    ];
  }
};
