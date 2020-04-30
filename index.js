const Discord = require('discord.js');
const bot = new Discord.Client();
const { prefix, token } = require('./config.json');

bot.once('ready', () => {
    console.log('Pronto!');
})

bot.login(token);

bot.on('message', msg => {
    if (!msg.content.startsWith(prefix) || message.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const comando = args.shift().toLowerCase();

    if (comando === "oi") {
        msg.channel.send(`Olá ${msg.author.username}!`);
    }
});