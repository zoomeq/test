const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const fetch = require('node-fetch');

module.exports = {
    name: 'deposit',
    alias: ["dep"],
    description: 'Wpłacenie pieniędzy do banku.',
    usage: `${pfix.all()[0].data[0]}deposit <kwota/all>`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) =>{
        if(!args[0]) return message.channel.send("```Podaj ile chcesz wpłacić!```");
        if(isNaN(args[0]) && args[0] != 'all') return message.channel.send("```Podaj prawidłową wartość!```");
        let user = message.author;
        let cash = db.get(`cash_${user.id}`);
        let bank = db.get(`bank_${user.id}`);
        if(args[0] === 'all'){
            db.add(`cash_${user.id}`, -parseInt(cash));
            db.add(`bank_${user.id}`, parseInt(cash));
            return message.channel.send("```Wpłacono: "+cash+pfix.all()[1].data[0]+"```");
        }else if(parseInt(args[0]) > cash){
            return message.channel.send("```Nie masz wystarczających środków w portfelu!```");
        }else{
            db.add(`cash_${user.id}`, -parseInt(args[0]));
            db.add(`bank_${user.id}`, parseInt(args[0]));
            return message.channel.send("```Wpłacono: "+parseInt(args[0])+pfix.all()[1].data[0]+"```");
        };
    },
};