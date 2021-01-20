const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const fetch = require('node-fetch');

module.exports = {
    name: 'withdraw',
    alias: ["with","wdraw"],
    description: 'Wypłacenie pieniędzy z banku.',
    usage: `${pfix.get('prefix')}withdraw <kwota/all>`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) =>{
        if(!args[0]) return message.channel.send("```Podaj ile chcesz wypłacić!```");
        if(isNaN(args[0]) && args[0] != 'all') return message.channel.send("```Podaj prawidłową wartość!```");
        let user = message.author;
        let cash = db.get(`cash_${user.id}`)
        let bank = db.get(`bank_${user.id}`)
        if(args[0] === 'all'){
            db.add(`bank_${user.id}`, -parseInt(bank))
            db.add(`cash_${user.id}`, parseInt(bank))
            return message.channel.send("```Wypłacono: "+bank+pfix.get('currency')+"```");
        }else if(parseInt(args[0]) > bank){
            return message.channel.send("```Nie masz wystarczających środków na koncie!```");
        }else{
            db.add(`bank_${user.id}`, -parseInt(args[0]));
            db.add(`cash_${user.id}`, parseInt(args[0]));
            return message.channel.send("```Wypłacono: "+parseInt(args[0])+pfix.get('currency')+"```");
        };
    },
};