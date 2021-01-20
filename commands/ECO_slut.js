const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const ms = require(`parse-ms`);
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
    name: 'slut',
    description: 'Dorobienie w każdy wie jaki sposób.',
    usage: `${pfix.get('prefix')}slut`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) => {
        let maxW = db.get(`slut_max`);
        let minW = db.get(`slut_min`);
        let timeout = db.get(`slut_cooldown`);
        let chance = db.get(`slut_chance`);
        if(maxW === null) maxW = 1000;
        if(minW === null) minW = 100;
        if(timeout === null) timeout = 43200000;
        if(chance === null) chance = 50;
        let powodzenie;
        if(randomNumber(1,100) > chance){
            powodzenie = '-';
        }else{
            powodzenie = '';
        };
        let amount = powodzenie + parseInt(randomNumber(minW, maxW));
        let daily = db.get(`slut_${message.author.id}`);

        if(daily != null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));
            return message.channel.send("```Musisz poczekać jeszcze: "+time.hours+" godzin "+time.minutes+" minut "+time.seconds+" sekund aby użyć komendy ponownie.```");
        }else{
            db.add(`cash_${message.author.id}`, amount);
            db.set(`slut_${message.author.id}`, Date.now());
            return message.channel.send("```Otrzymałeś: "+amount+pfix.get(`currency`)+"```");
        }

    },
};