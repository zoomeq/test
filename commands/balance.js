const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const fetch = require('node-fetch');
const embed = new discord.MessageEmbed();

module.exports = {
    name: 'balance',
    alias: ["bal"],
    description: 'Pokazuje aktualne saldo użytkownika.',
    usage: `${pfix.all()[0].data[0]}balance (@osoba)`,
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
        let user;

        if(!args[0]){
            user = message.author;
            embed.setTitle(`Twój stan konta.`);
        }else if(args[0].toString().replace(`<@`, '').replace(`>`, '').replace(`!`, '').length != 17 && args[0].toString().replace(`<@`, '').replace(`>`, '').replace(`!`, '').length != 18){
            return message.channel.send("```Podano błędny argument!```");
        }else{
            user = message.mentions.members.first();
            embed.setTitle(`Stan konta: ${user.displayName}.`);
        };
        let cash = db.get(`cash_${user.id}`);
        let bank = db.get(`bank_${user.id}`);

        if(cash === null) cash = 0;
        if(bank === null) bank = 0;
        db.set(`cash_${user.id}`, cash);
        db.set(`bank_${user.id}`, bank);
        embed.addFields(
            {
                name: `Portfel`,
                value: cash + pfix.all()[1].data[0],
                inline: true
            },
            {
                name: `Bank`,
                value: bank + pfix.all()[1].data[0],
                inline: true
            },
            {
                name: `Razem`,
                value: [cash+bank] + pfix.all()[1].data[0],
                inline: true
            }
        );
        message.channel.send(embed);
        embed.spliceFields(0, 3);
    },
};