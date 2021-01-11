const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");

module.exports = {
    name: 'setcurrency',
    alias: ["setcurr,setc"],
    description: 'Ustawia walutę serwera.',
    usage: `${pfix.all()[0].data[0]}setcurrency <nowy waluta>`,
    permission: ["ADMINISTRATOR"],
    type: "economy",
    run: async (message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("```Nie masz uprawnień, aby użyć tej komendy!```");
        if(!args[0]) return;
        pfix.delete("currency");
        pfix.push("currency", args[0]);
        message.channel.send("```Nowy waluta to: "+pfix.all()[1].data[0]+"```");
        

    },
};