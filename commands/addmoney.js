const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const fetch = require('node-fetch');

module.exports = {
    name: 'addmoney',
    alias: ["addm","addmon"],
    description: 'Dodaje pieniądze użytkownikowi.',
    usage: `${pfix.all()[0].data[0]}addmoney <@osoba> <cash/bank> <kwota>`,
    permission: ["ADMINISTRATOR"],
    type: "economy",
    run: async (message, args) =>{
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Nie masz uprawnień, aby użyć tej komendy!`);
        if(!args[0]) return message.channel.send("```Oznacz komu chcesz wpłacić!```");
        if(!args[1]) return message.channel.send("```Gdzie chcesz wpłacić?!```");
        if(args[1] != "cash" && args[1] != "bank") return message.channel.send("```Nie ma takiego miejsca do wpłaty!```");
        if(!args[2]) return message.channel.send("```Ile chcesz wpłacić?!```");
        if(isNaN(args[2])) return message.channel.send("```Podaj prawidłową wartość!```");
        let user = message.mentions.members.first();
        if(args[1] === 'cash'){
            db.add(`cash_${user.id}`, parseInt(args[2]));
        }else{
            db.add(`bank_${user.id}`, parseInt(args[2]));
        }
        message.channel.send("```Dodano: "+parseInt(args[2])+pfix.all()[1].data[0]+" do salda użytkownika: "+user.displayName+"```");
        

    },
};