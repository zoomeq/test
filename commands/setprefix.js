const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");

module.exports = {
    name: 'setprefix',
    alias: ["setp"],
    description: 'Ustawia prefix bota.',
    usage: `${pfix.all()[0].data[0]}setprefix <nowy prefix>`,
    permission: ["ADMINISTRATOR"],
    type: "utility",
    run: async (message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("```Nie masz uprawnień, aby użyć tej komendy!```");
        if(!args[0]) return;
        pfix.delete("prefix");
        pfix.push("prefix", args[0]);
        message.channel.send("```Nowy prefix to: "+pfix.all()[0].data[0]+"```");
        

    },
};