const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

require('dotenv').config();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
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
    if(dice.d.message_id != "705849947857354773") return

    let server = bot.guilds.cache.get('705492041081290791');
    let member = server.members.cache.get(dice.d.user_id);

    let role1 = server.roles.cache.get('705848506367082617'),
        role2 = server.roles.cache.get('705848541729521754'),
        role3 = server.roles.cache.get('705848566505275422');

    if(dice.t === "MESSAGE_REACTION_ADD"){
        if(dice.d.emoji.name === "😀"){
            if (member.roles.cache.has(role1)) return;
            member.roles.add(role1);
        }else if(dice.d.emoji.name === "😃"){
            if (member.roles.cache.has(role2)) return;
            member.roles.add(role2);
        }else if(dice.d.emoji.name === "😄"){
            if (member.roles.cache.has(role3)) return;
            member.roles.add(role3);
        }
    }
    if(dice.t === "MESSAGE_REACTION_REMOVE"){
        if(dice.d.emoji.name === "😀"){
            if (member.roles.cache.has(role1)) return;
            member.roles.remove(role1);
        }else if(dice.d.emoji.name === "😃"){
            if (member.roles.cache.has(role2)) return;
            member.roles.remove(role2);
        }else if(dice.d.emoji.name === "😄"){
            if (member.roles.cache.has(role3)) return;
            member.roles.remove(role3);
        }
    }

})

bot.login(process.env.TOKEN);