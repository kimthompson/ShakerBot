const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client();
bot.on('ready', () => {
	bot.users.get(config.creator).send("I'm awake!").catch(console.error);
	bot.user.setActivity('FC chat', { type: 'LISTENING' })
	console.log("I am awake and ready to work!");
});
bot.on('message', (message) => {
	// Bot will listen for messages that start with `!`
	// Ignores messages from bots, or from channels that aren't the test channel or bot-commands channel
	if (message.author.bot) return;
	if (!message.channel.id === (config.testchannel || config.botchannel)) return;
	if (!message.content.startsWith(config.prefix)) {
		message.delete().catch(console.error);
		return;
	}
	if (message.content.startsWith(config.prefix)) {
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		
		var guild = bot.guilds.get(config.guild);
		var user = message.member.user;
			
		switch(cmd) {
			// !sleep <<ADMIN ONLY>>
			case "sleep" :
				if (message.member.roles.has(message.guild.roles.find(r => r.name === "Admin").id)) {
					guild.members.find(u => u.id === config.creator).send(`Takin' a snooze!`).catch(console.error);
					message.delete().catch(console.error);
					setTimeout(function(){
						console.log("Naptime!");
						bot.destroy();
					}, 5000);
				} else {
					guild.members.find(u => u.id === config.creator).send(`${user.username} attempted to put me to sleep.`).catch(console.error);
					message.delete().catch(console.error);
				};
			break;
			// !tankmain
			case "tankmain" :
				var mainrole = message.guild.roles.find(r => r.name === "Tank Main");
				var hrole = message.guild.roles.find(r => r.name === "Healer Main");
				var drole = message.guild.roles.find(r => r.name === "DPS Main");
				if(message.member.roles.has(mainrole.id)) {
					message.member.removeRole(mainrole.id).catch(console.error);
					console.log(`Removing ${user.username} from Tank Main role.`);
				} else if (message.member.roles.has(hrole.id)) {
					message.member.removeRole(hrole.id).catch(console.error);
					message.member.addRole(mainrole.id).catch(console.error);
					console.log(`Removed ${user.username} from Healer Main role, added to Tank Main role.`);
				} else if (message.member.roles.has(drole.id)) {
					message.member.removeRole(drole.id).catch(console.error);
					message.member.addRole(mainrole.id).catch(console.error);
					console.log(`Removed ${user.username} from DPS Main role, added to Tank Main role.`);
				} else {
					message.member.addRole(mainrole.id).catch(console.error);
					console.log(`Adding ${user.username} to Tank Main role.`);
				};
				message.delete().catch(console.error);
			break;
			// !healermain
			case "healermain" :
				var mainrole = message.guild.roles.find(r => r.name === "Healer Main");
				var trole = message.guild.roles.find(r => r.name === "Tank Main");
				var drole = message.guild.roles.find(r => r.name === "DPS Main");
				if (message.member.roles.has(mainrole.id)) {
					message.member.removeRole(mainrole.id).catch(console.error);
					console.log(`Removing ${user.username} from Healer Main role.`);
				} else if (message.member.roles.has(trole.id)) {
					message.member.removeRole(trole.id).catch(console.error);
					message.member.addRole(mainrole.id).catch(console.error);
					console.log(`Removed ${user.username} from Tank Main role, added to Healer Main role.`);
				} else if (message.member.roles.has(drole.id)) {
					message.member.removeRole(drole.id).catch(console.error);
					message.member.addRole(mainrole.id).catch(console.error);
					console.log(`Removed ${user.username} from DPS Main role, added to Healer Main role.`);
				} else {
					message.member.addRole(mainrole.id).catch(console.error);
					console.log(`Adding ${user.username} to Healer Main role.`);
				};
				message.delete().catch(console.error);
			break;
			// !dpsmain
			case "dpsmain" :
				var mainrole = message.guild.roles.find(r => r.name === "DPS Main");
				var hrole = message.guild.roles.find(r => r.name === "Healer Main");
				var trole = message.guild.roles.find(r => r.name === "Tank Main");
				if (message.member.roles.has(mainrole.id)) {
					message.member.removeRole(mainrole.id).catch(console.error);
					console.log(`Removing ${user.username} from DPS Main role.`);
				} else if (message.member.roles.has(hrole.id)) {
					message.member.removeRole(hrole.id).catch(console.error);
					message.member.addRole(mainrole.id).catch(console.error);
					console.log(`Removed ${user.username} from Healer Main role, added to DPS Main role.`);
				} else if (message.member.roles.has(trole.id)) {
					message.member.removeRole(trole.id).catch(console.error);
					message.member.addRole(mainrole.id).catch(console.error);
					console.log(`Removed ${user.username} from Tank Main role, added to DPS Main role.`);
				} else {
					message.member.addRole(mainrole.id).catch(console.error);
					console.log(`Adding ${user.username} to DPS Main role.`);
				};
				message.delete().catch(console.error);
			break;
			// !tank
			case "tank" :
				var role = message.guild.roles.find(r => r.name === "Tank");
				if (message.member.roles.has(role.id)) {
					message.member.removeRole(role.id).catch(console.error);
					console.log(`Removing ${user.username} from Tank role.`);
				} else {
					message.member.addRole(role.id).catch(console.error);
					console.log(`Adding ${user.username} to Tank role.`);
				};
				message.delete().catch(console.error);
			break;
			// !healer
			case "healer" :
				var role = message.guild.roles.find(r => r.name === "Healer");
				if (message.member.roles.has(role.id)) {
					message.member.removeRole(role.id).catch(console.error);
					console.log(`Removing ${user.username} from Healer role.`);
				} else {
					message.member.addRole(role.id).catch(console.error);
					console.log(`Adding ${user.username} to Healer role.`);
				};
				message.delete().catch(console.error);
            break;
			// !dps
			case "dps" :
				var role = message.guild.roles.find(r => r.name === "DPS");
				if (message.member.roles.has(role.id)) {
					message.member.removeRole(role.id).catch(console.error);
					console.log(`Removing ${user.username} from DPS role.`);
				} else {
					message.member.addRole(role.id).catch(console.error);
					console.log(`Adding ${user.username} to DPS role.`);
				};
				message.delete().catch(console.error);
            break;
			// !treasure
			case "treasure" :
				var role = message.guild.roles.find(r => r.name === "Treasure");
				if (message.member.roles.has(role.id)) {
					message.member.removeRole(role.id).catch(console.error);
					console.log(`Removing ${user.username} from Treasure role.`);
				} else {
					message.member.addRole(role.id).catch(console.error);
					console.log(`Adding ${user.username} to Treasure role.`);
				};
				message.delete().catch(console.error);
			break;
			// !journal
			case "journal" :
				var role = message.guild.roles.find(r => r.name === "Journal");
				if (message.member.roles.has(role.id)) {
					message.member.removeRole(role.id).catch(console.error);
					console.log(`Removing ${user.username} from Journal role.`);
				} else {
					message.member.addRole(role.id).catch(console.error);
					console.log(`Adding ${user.username} to Journal role.`);
				};
				message.delete().catch(console.error);
			break;
			// !cactpot
			case "cactpot" :
				var role = message.guild.roles.find(r => r.name === "Cactpot");
				if (message.member.roles.has(role.id)) {
					message.member.removeRole(role.id).catch(console.error);
					console.log(`Removing ${user.username} from Cactpot role.`);
				} else {
					message.member.addRole(role.id).catch(console.error);
					console.log(`Adding ${user.username} to Cactpot role.`);
				};
				message.delete().catch(console.error);
			break;
			// !roles
			case "roles" :
				var roleList = "Here is the list of your current roles:\n";
				message.member.roles.forEach(function(role, roleID) {
					roleList = roleList.concat(`${role.name}\n`);					
				})
				message.member.send(roleList).catch(console.error);
				message.delete().catch(console.error);
			break;
			// DEFAULT
			default:
				message.delete().catch(console.error);
         }
     }
});

bot.login(config.token);