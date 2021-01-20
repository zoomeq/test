const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const ms = require(`parse-ms`);
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
    name: 'rob',
    description: 'Kradzież pieniędzy innego użytkownikownika.',
    usage: `${pfix.get('prefix')}rob <@osoba>`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) => {
        if(!args[0]) return message.channel.send("```Kogo chcesz okraść?!```");
        if(args[0].toString().replace(`<@`, '').replace(`>`, '').replace(`!`, '').length != 17 && args[0].toString().replace(`<@`, '').replace(`>`, '').replace(`!`, '').length != 18) return message.channel.send("```Podano błędny argument!```");
        let user = message.mentions.members.first();
        let cash = db.get(`cash_${user.id}`)
        let minW = db.get(`rob_min`);
        let maxW = db.get(`rob_max`);
        let timeout = db.get(`rob_cooldown`);
        let chance = db.get(`rob_chance`);
        if(cash === null) cash = 0;
        if(maxW === null) maxW = 100;
        if(minW === null) minW = 1;
        if(timeout === null) timeout = 43200000;
        if(chance === null) chance = 50;
        let powodzenie;
        if(randomNumber(1,100) > chance){
            powodzenie = '-';
        }else{
            powodzenie = '';
        };
        let amount = powodzenie + parseInt([parseInt(randomNumber(minW, maxW))*cash]/100);
        let daily = db.get(`rob_${message.author.id}`);

        if(daily != null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));
            return message.channel.send("```Musisz poczekać jeszcze: "+time.hours+" godzin "+time.minutes+" minut "+time.seconds+" sekund aby użyć komendy ponownie.```");
        }else{
            db.add(`cash_${message.author.id}`, amount);
            db.subtract(`cash_${user.id}`, amount)
            db.set(`rob_${message.author.id}`, Date.now());
            return message.channel.send("```Otrzymałeś: "+amount+pfix.get(`currency`)+"```");
        }
    },
};