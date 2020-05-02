const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

require('dotenv').config();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.id, command);
}

bot.once('ready', () => {
    console.log('Pronto!');
})

bot.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;

	try {
		bot.commands.get(command).execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

bot.on('raw', async dice => {
    if(dice.t !== "MESSAGE_REACTION_ADD" && dice.t !== "MESSAGE_REACTION_REMOVE") return
    if(dice.d.message_id != "705917017215074384") return

    let server = bot.guilds.cache.get('402549646058323990');
    let member = server.members.cache.get(dice.d.user_id);

    let role1 = server.roles.cache.get('705912193664811089'), //CSGO
        role2 = server.roles.cache.get('705912119807311894'), //GTAV
        role3 = server.roles.cache.get('705911244548210698'), //LOL
        role4 = server.roles.cache.get('705911826142986243'), //Roblox
        role5 = server.roles.cache.get('705912266477928498'); //Valorant

    if(dice.t === "MESSAGE_REACTION_ADD"){
        if(dice.d.emoji.id === "705909492960722954"){
            if (member.roles.cache.has(role1)) return;
            member.roles.add(role1);
        } else if(dice.d.emoji.id === "7705910080423460904"){
            if (member.roles.cache.has(role2)) return;
            member.roles.add(role2);
        } else if(dice.d.emoji.id === "705910319070838846"){
            if (member.roles.cache.has(role3)) return;
            member.roles.add(role3);
        } else if(dice.d.emoji.id === "705909533192749066"){
            if (member.roles.cache.has(role4)) return;
            member.roles.add(role4);
        } else if(dice.d.emoji.id === "705912578685272074"){
            if (member.roles.cache.has(role5)) return;
            member.roles.add(role5);
        }
    }

    if(dice.t === "MESSAGE_REACTION_REMOVE"){
        if(dice.d.emoji.id === "705909492960722954"){
            if (member.roles.cache.has(role1)) return;
            member.roles.remove(role1);
        } else if(dice.d.emoji.id === "705910080423460904"){
            if (member.roles.cache.has(role2)) return;
            member.roles.remove(role2);
        } else if(dice.d.emoji.id === "705910319070838846"){
            if (member.roles.cache.has(role3)) return;
            member.roles.remove(role3);
        } else if(dice.d.emoji.id === "705909533192749066"){
            if (member.roles.cache.has(role4)) return;
            member.roles.remove(role4);
        } else if(dice.d.emoji.id === "705912578685272074"){
            if (member.roles.cache.has(role5)) return;
            member.roles.remove(role5);
        }
    }

})

bot.login(process.env.TOKEN);