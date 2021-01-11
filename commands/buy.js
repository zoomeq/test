const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const fetch = require('node-fetch');

module.exports = {
    name: 'test',
    alias: [],
    description: 'Zakup przedmiotu ze sklepu.',
    usage: `${pfix.all()[0].data[0]}buy <nazwa> (ilość)`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) =>{
        if(!args[0]) return message.channel.send("```Podaj co chcesz kupić!```");
        let name = args[0].toString().charAt(0).toUpperCase() + args[0].toString().slice(1);
        let shop, arr = [], cost;
        let user = message.author;
        let inv = new db.table(`inv_${user.id}`);
        let cash = db.get(`cash_${user.id}`);
        if(message.channel.id === "797206740994359318"){ //monopolowy               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shop = new db.table("monopolowy");
        }else if(message.channel.id === "797446163510067201"){ //maczek             <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shop = new db.table("maczek");
        }else if(message.channel.id === "797446192803479602"){ //broń               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shop = new db.table("broń");
        }else{
            return message.channel.send("```Próbowałeś wykonać tę komendę na błędnym kanale!```");
        };
        if(!shop.get(name)) return message.channel.send("```Nie ma takiego przedmiotu w sklepie!```");
        let nameS = shop.get(name)[0].name;
        let priceS = shop.get(name)[0].price;
        let quantityS = shop.get(name)[0].quantity;
        if(parseInt(priceS) > parseInt(cash)) return message.channel.send("```Nie możesz tego kupić! Brakuje ci: "+[priceS-cash]+"```");
        if(!inv.get(name)){
            if(!args[1]){
                let n = 1;
                cost = [priceS * n];
                inv.add(nameS, n);
                db.add(`cash_${user.id}`, -cost);
                if(quantityS != 'infinity'){
                    arr = {
                        name: nameS,
                        price: priceS,
                        quantity: [quantityS-n],
                    };
                    shop.set(nameS, arr);
                    return message.channel.send("```Zakupiłeś: "+n+" "+nameS+" za "+cost+pfix.all()[1].data[0]+"```");
                }else return message.channel.send("```Zakupiłeś: "+n+" "+nameS+" za "+cost+pfix.all()[1].data[0]+"```");
            }else if(isNaN(args[1])){
                return message.channel.send("```Podaj prawidłową wartość!```");
            }else{
                let n = parseInt(args[1]);
                cost = [priceS * n];
                inv.add(nameS, n);
                db.add(`cash_${user.id}`, -cost);
                if(quantityS != 'infinity'){
                    arr = {
                        name: nameS,
                        price: priceS,
                        quantity: [quantityS-n],
                    };
                    shop.set(nameS, arr);
                    return message.channel.send("```Zakupiłeś: "+n+" "+nameS+" za "+cost+pfix.all()[1].data[0]+"```");
                }else return message.channel.send("```Zakupiłeś: "+n+" "+nameS+" za "+cost+pfix.all()[1].data[0]+"```");
            };
        }
    },
};