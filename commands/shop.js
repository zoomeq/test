const discord = require('discord.js');
const fetch = require('node-fetch');
const db = require(`quick.db`);
const embed = new discord.MessageEmbed()
	.setTitle('Sklep');
const pfix = new db.table("prefix");

module.exports = {
    name: 'shop',
    description: 'Wyświetla przedmioty znajdujące się w sklepie.',
    usage: `${pfix.all()[0].data[0]}shop `,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) =>{

        let getColor = async () => {
            let result = await fetch('http://www.colr.org/json/color/random');
            let json = await result.json();
            return json;
        }
        let randcolor = await getColor();
        embed.setColor(randcolor.new_color);

        let shop, shopmon, shopmac, shopbr;
        if(message.channel.id === "797206740994359318"){ //monopolowy               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shop = new db.table("monopolowy");
        }else if(message.channel.id === "797446163510067201"){ //maczek             <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shop = new db.table("maczek");
        }else if(message.channel.id === "797446192803479602"){ //broń               <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shop = new db.table("broń");
        }else if(message.channel.id === "764515341216251937"){ //ogolny             <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            shopmon = new db.table("monopolowy");
            shopmac = new db.table("maczek");
            shopbr = new db.table("broń");
            let arr1 = [];
        for(let i=0; i<shopmon.all().length; i++){
            arr1[i] = shopmon.all()[i].data
        }
        let tabt1 = [];
        let tabp1 = [];
        let tabq1 = [];
        for(let i=0; i<shopmon.all().length; i++){
            tabt1[i] = arr1[i].find(t => t.name).name;
            tabp1[i] = arr1[i].find(t => t.name).price + pfix.all()[1].data[0];
            tabq1[i] = arr1[i].find(t => t.name).quantity
        }
        embed.addFields(
            {
                name: `Nazwa`,
                value: tabt1,
                inline: true
            },
            {
                name: `Cena`,
                value: tabp1,
                inline: true
            },
            {
                name: `Ilość`,
                value: tabq1,
                inline: true
            }
        );
        embed.setTitle("Monopolowy");
        message.channel.send(embed);
        embed.spliceFields(0, 3);

        let arr2 = [];
        for(let i=0; i<shopmac.all().length; i++){
            arr2[i] = shopmac.all()[i].data
        }
        let tabt2 = [];
        let tabp2 = [];
        let tabq2 = [];
        for(let i=0; i<shopmac.all().length; i++){
            tabt2[i] = arr2[i].find(t => t.name).name;
            tabp2[i] = arr2[i].find(t => t.name).price + pfix.all()[1].data[0];
            tabq2[i] = arr2[i].find(t => t.name).quantity
        }
        embed.addFields(
            {
                name: `Nazwa`,
                value: tabt2,
                inline: true
            },
            {
                name: `Cena`,
                value: tabp2,
                inline: true
            },
            {
                name: `Ilość`,
                value: tabq2,
                inline: true
            }
        );
        embed.setTitle("Maczek");
        message.channel.send(embed);
        embed.spliceFields(0, 3);

        let arr3 = [];
        for(let i=0; i<shopbr.all().length; i++){
            arr3[i] = shopbr.all()[i].data
        }
        let tabt3 = [];
        let tabp3 = [];
        let tabq3 = [];
        for(let i=0; i<shopbr.all().length; i++){
            tabt3[i] = arr3[i].find(t => t.name).name;
            tabp3[i] = arr3[i].find(t => t.name).price + pfix.all()[1].data[0];
            tabq3[i] = arr3[i].find(t => t.name).quantity
        }
        embed.addFields(
            {
                name: `Nazwa`,
                value: tabt3,
                inline: true
            },
            {
                name: `Cena`,
                value: tabp3,
                inline: true
            },
            {
                name: `Ilość`,
                value: tabq3,
                inline: true
            }
        );
        embed.setTitle("Broń");
        message.channel.send(embed);
        embed.spliceFields(0, 3);
        return;
        }else{
            return;
        };
        embed.setTitle("Sklep");
        let arr = [];
        for(let i=0; i<shop.all().length; i++){
            arr[i] = shop.all()[i].data
        }
        let tabt = [];
        let tabp = [];
        let tabq = [];
        for(let i=0; i<shop.all().length; i++){
            tabt[i] = arr[i].find(t => t.name).name;
            tabp[i] = arr[i].find(t => t.name).price + pfix.all()[1].data[0];
            tabq[i] = arr[i].find(t => t.name).quantity
        }
        embed.addFields(
            {
                name: `Nazwa`,
                value: tabt,
                inline: true
            },
            {
                name: `Cena`,
                value: tabp,
                inline: true
            },
            {
                name: `Ilość`,
                value: tabq,
                inline: true
            }
        );
        message.channel.send(embed);
        embed.spliceFields(0, 3);
        
    },
};