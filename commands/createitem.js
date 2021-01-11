const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");

module.exports = {
    name: 'createitem',
    alias: ["citem","createit"],
    description: 'Pozwala stworzyć przedmiot.',
    usage: `${pfix.all()[0].data[0]}createitem <sklep> <nazwa> <cena> (ilość)`,
    permission: ["ADMINISTRATOR"],
    type: "economy",
    run: async (message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("```Nie masz uprawnień, aby użyć tej komendy!```");

        if (!args[0]) return message.channel.send("```Podaj do jakiego sklepu ma zostać dodane.```");
        if(args[0] != "maczek" && args[0] != "supermarket" && args[0] != "osiedlowy" && args[0] != "monopolowy" && args[0] != "samochodowy" && args[0] != "elektroniczny" && args[0] != "broń") return message.channel.send("```Podany sklep jest nieprawidłowy!```");
        if (!args[1]) return message.channel.send("```Podaj nazwę przedmiotu.```");
        if (!args[2] || isNaN(args[2])) return message.channel.send("```Podaj prawidłową cenę przedmiotu.```");
        let shop = new db.table(`${args[0]}`);
        let nameS = args[1].toString().charAt(0).toUpperCase() + args[1].toString().slice(1);
        let priceS = parseInt(args[2]);
        let quantityS;
        if(!args[3]){
            quantityS = "infinity";
        }else if(isNaN(args[3])){
            return message.channel.send("```Podaj prawidłową ilość!```");
        }else{
            quantityS = parseInt(args[3]);
        }
        let item = {
            name: nameS,
            price: priceS,
            quantity: quantityS
        };
        shop.push(nameS, item);
        message.channel.send("```Nazwa: "+nameS+"\n Cena: "+priceS+"\nIlość: "+quantityS+"```");
    },
};