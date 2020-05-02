module.exports = {
    name: 'jogosrecentes',
    description: 'Mostra os jogos recentes de um determinado usuário steam',
    async execute(msg, args) {
        const axios = require('axios');
        require('dotenv').config();

        if (!args.length) {
            return msg.channel.send(`O comando precisa de um user da steam, ${msg.author}!`);
        }
        //Função para pegar o id de algum usuário da steam pelo seu username
        let getSteamID = async () => {
            let response = await axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_KEY}&vanityurl=${args}`);
            steamid = response.data.response.steamid;
            return steamid;
        }

        let id = await getSteamID();

        //Função para pegar os jogos mais recentes
        let getRecentlyPlayedGames = async () => {
            let response = await axios.get(`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${id}&format=json`);
            let info = response.data.response;
            return info;
        }

        let info = await getRecentlyPlayedGames();
        const count = info.total_count;
        let games = info.games.map(e => e.name).join(", ");

        msg.channel.send(`Os ${count} jogos recentes de ${args} são: ${games}`);
    }
}