const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const ms = require(`parse-ms`);
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
    name: 'pay',
    description: 'Zapłata innemu użytkownikowi.',
    usage: `${pfix.get('prefix')}pay <@osoba> <kwota>`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) => {
        if(!args[0]) return message.channel.send("```Podaj komu chcesz wykonać przelew!```");
        if(args[0].toString().replace(`<@`, '').replace(`>`, '').replace(`!`, '').length != 17 && args[0].toString().replace(`<@`, '').replace(`>`, '').replace(`!`, '').length != 18) return message.channel.send("```Podano błędny argument!```");
        if(!args[1]) return message.channel.send("```Podaj ile chcesz przelać!```");
        let kwota = parseInt(args[1]);
        if(isNaN(kwota)) return message.channel.send("```Podaj prawidłową wartość!```");
        let user = message.mentions.members.first();
        let cash = db.get(`cash_${message.author.id}`);
        if(parseInt(cash) < kwota){
            return message.channel.send("```Nie masz wystarczających środków!```");
        }else{
            db.subtract(`cash_${message.author.id}`, kwota);
            db.add(`cash_${user.id}`, kwota);
            return message.channel.send("```Przelano: "+kwota+pfix.get(`currency`)+"```");
        }
    },
};