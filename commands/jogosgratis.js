module.exports = {
    name: 'jogosgratis',
    description: 'Mostra os top jogos grátis da steam',
    async execute(msg) {
        const axios = require("axios").default;
        const cheerio = require("cheerio");

        const fethHtml = async url => {
            try {
                const {
                    data
                } = await axios.get(url);
                return data;
            } catch {
                console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
            }
        };


        const extractDeal = selector => {
            const title = selector
                .find(".responsive_search_name_combined")
                .find("div[class='col search_name ellipsis'] > span[class='title']")
                .text()
                .trim();

            return {
                title
            };
        }

        const steamUrl = "https://store.steampowered.com/search/?category1=998&filter=topsellers&genre=Free+to+Play";

        const html = await fethHtml(steamUrl);

        const selector = cheerio.load(html);

        const searchResults = selector("body").find(
            "#search_result_container > #search_resultsRows > a"
        );

        const deals = searchResults
            .map((idx, el) => {
                const elementSelector = selector(el);
                return extractDeal(elementSelector);
            })
            .get();

        let topgames10 = deals.slice(0,10)
        
        let games = topgames10.map(e => e.title);

        var text = "";
      
        for(let game in games) {
            text += `\n${parseInt(game) + 1}-${games[game]}`;
        }

        msg.channel.send(`O top 10 jogos grátis da steam ${text}`);
    }
}