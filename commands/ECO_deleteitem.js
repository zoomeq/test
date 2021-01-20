const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");

module.exports = {
    name: 'deleteitem',
    alias: ["ditem","delit","delitem"],
    description: 'Usuwanie przedmiotu ze sklepu.',
    usage: `${pfix.get('prefix')}deleteitem <sklep> <nazwa>`,
    permission: ["ADMINISTRATOR"],
    type: "economy",
    run: async (message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("```Nie masz uprawnień, aby użyć tej komendy!```");
        if(!args[0]) return message.channel.send("```Podaj z jakiego sklepu ma zostać usunięte!```");
        if(!args[1]) return message.channel.send("```Podaj co ma zostać usunięte!```");
        let shop = new db.table(`${args[0]}`);
        let n = shop.all().length;
        let tab = [];
        let name = args[1].toString().charAt(0).toUpperCase() + args[1].toString().slice(1);
        for (let i = 0; i < n; i++) {
            tab[i] = shop.all()[i].ID;
        };
        if(!tab.find(n => n === name)){
            return message.channel.send("```Nie można usunąć czegoś, czego nie ma!```");
        }else{
            shop.delete(name);
            message.channel.send("```Pomyślnie usunięto: "+name+"```");
        }


    },
};