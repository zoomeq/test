const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const fetch = require('node-fetch');
const embed = new discord.MessageEmbed();

module.exports = {
    name: 'inventory',
    alias: ["inv"],
    description: 'Wypłacenie pieniędzy z banku.',
    usage: `${pfix.get('prefix')}inventory (@osoba  ADMINISTRATOR ONLY)`,
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

        let user = message.author;
        if(message.member.hasPermission("ADMINISTRATOR")) user = message.mentions.members.first() || message.author;
        let inv = new db.table(`inv_${user.id}`);
        let nazwy = [];
        let ilosci = [];
        for(let i=0;i<inv.all().length;i++){
            nazwy[i] = inv.all()[i].ID;
            ilosci[i] = inv.all()[i].data;
        };
        if(nazwy.length != 0 && ilosci.length != 0){
            embed.addFields(
                {
                    name: `Nazwa`,
                    value: nazwy,
                    inline: true
                },
                {
                    name: `Ilość`,
                    value: ilosci,
                    inline: true
                }
            );
        }else{
            embed.addField(`Wygląda na to że nic nie masz w ekwipunku.`,'...');
            embed.addField(`Dosłownie nic.....`,'...');
        };
        if(user === message.author){
            embed.setTitle(`Ekwipunek ${user.username}`);
        }else{
            embed.setTitle(`Ekwipunek ${user.displayName}`);
        }
        message.channel.send(embed);
        embed.spliceFields(0, 2);
    },
};