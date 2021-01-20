const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const fetch = require('node-fetch');

module.exports = {
    name: 'buy',
    description: 'Zakup przedmiotu ze sklepu.',
    usage: `${pfix.get('prefix')}buy <nazwa> (ilość)`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) =>{
        let shop, cost;
        if(message.channel.id === "797206740994359318"){ //monopolowy               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shop = new db.table("monopolowy");
        }else if(message.channel.id === "797446163510067201"){ //maczek             <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shop = new db.table("maczek");
        }else if(message.channel.id === "797446192803479602"){ //broń               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shop = new db.table("broń");
        }else{
            return message.channel.send("```Próbowałeś wykonać tę komendę na błędnym kanale!```");
        };
        if(!args[0]) return message.channel.send("```Podaj co chcesz kupić!```");
        let name = args[0].toString().charAt(0).toUpperCase() + args[0].toString().slice(1);
        let user = message.author;
        let inv = new db.table(`inv_${user.id}`);
        let cash = db.get(`cash_${user.id}`);
        if(!shop.get(name)) return message.channel.send("```Nie ma takiego przedmiotu w sklepie!```");
        let nameS = shop.get(name)[0].name;
        let priceS = shop.get(name)[0].price;
        let quantityS = shop.get(name)[0].quantity;
        if(parseInt(priceS) > parseInt(cash)) return message.channel.send("```Nie możesz tego kupić! Brakuje ci: "+[priceS-cash]+pfix.get('currency')+"```");
        if(!inv.get(name) || inv.get(name)){
            if(!args[1]){
                let n = 1;
                cost = [priceS * n];
                inv.add(nameS, n);
                db.add(`cash_${user.id}`, -cost);
                if(quantityS != 'infinity'){
                    let d = quantityS-n;
                    let arr = {
                        name: nameS.toString(),
                        price: parseInt(priceS),
                        quantity: parseInt(d),
                    };
                    shop.delete(nameS);
                    shop.push(nameS, arr);
                    return message.channel.send("```Zakupiłeś: "+n+" "+nameS+" za "+cost+pfix.get('currency')+"```");
                }else return message.channel.send("```Zakupiłeś: "+n+" "+nameS+" za "+cost+pfix.get('currency')+"```");
            }else if(isNaN(args[1])){
                return message.channel.send("```Podaj prawidłową wartość!```");
            }else{
                let n = parseInt(args[1]);
                cost = [priceS * n];
                inv.add(nameS, n);
                db.add(`cash_${user.id}`, -cost);
                if(quantityS != 'infinity'){
                    let d = quantityS-n;
                    let arr = {
                        name: nameS.toString(),
                        price: parseInt(priceS),
                        quantity: parseInt(d),
                    };
                    shop.delete(nameS);
                    shop.push(nameS, arr);
                    return message.channel.send("```Zakupiłeś: "+n+" "+nameS+" za "+cost+pfix.get('currency')+"```");
                }else return message.channel.send("```Zakupiłeś: "+n+" "+nameS+" za "+cost+pfix.get('currency')+"```");
            };  
        }else return message.channel.send("```Coś poszło nie tak 😕```");
    },
};