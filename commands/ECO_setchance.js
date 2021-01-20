const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");


module.exports = {
    name: 'setchance',
    description: 'Ustawia szansę na powodzenie komendy.',
    usage: `${pfix.get('prefix')}setchance <komenda> <1-100>`,
    permission: ["ADMINISTRATOR"],
    type: "economy",
    run: async (message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("```Nie masz uprawnień, aby użyć tej komendy!```");
        if(!args[0]) return message.channel.send("```Podaj jaka komenda!```");
        if(args[0] != 'slut' && args[0] != 'rob' && args[0] != 'crime' ) return message.channel.send("```Nie ma takiej komendy!```");
        if(!args[1]) return message.channel.send("```Podaj szansę!```");
        let chance = parseInt(args[1]);
        if(isNaN(chance)) return message.channel.send("```Podaj prawidłową wartość!```");
        if(chance > 100 || chance < 1) return message.channel.send("```Podaj prawidłową wartość z zakresu 1-100!```");

        db.set(`${args[0].toString()}_chance`, chance);
        return message.channel.send("```Ustawiono szansę powodzenia "+args[0].toString()+" na "+chance+"%```");
    },
};