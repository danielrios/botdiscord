const Discord = require('discord.js');
const bot = new Discord.Client();
const axios = require('axios');
const { prefix, token, steamkey } = require('./config.json');

bot.login(token);

bot.once('ready', () => {
    console.log('Pronto!');
})

bot.on('message', async msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const comando = args.shift().toLowerCase();

    if (comando === "jogosrecentes") {
        if (!args.length) {
            return msg.channel.send(`O comando precisa de um user da steam, ${msg.author}!`);
        }

        //Função para pegar o id de algum usuário da steam
        let getSteamID = async () => {
            let response = await axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamkey}&vanityurl=${args}`);
            steamid = response.data.response.steamid;
            return steamid;
        }
        let id = await getSteamID();
        console.log(id);

        //Função para pegar os jogos mais recentes
        let getRecentlyPlayedGames = async () => {
            let response = await axios.get(`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamkey}&steamid=${id}&format=json`);
            let info = response.data.response;
            return info;
        }
        let info = await getRecentlyPlayedGames();
        const count = info.total_count;
        let games;
        for (var game in info.games) {
            games += info.games[game].name.split(',');
        }
        
        console.log(`Os ${count} jogos recentes de ${args} são: `);
      
        console.log(games);
    }
});