const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

bot.once('ready', () => {
    console.log('Pronto!');
})

bot.login(config.token);