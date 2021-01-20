const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const ms = require(`parse-ms`);
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
    name: 'crime',
    description: 'Popełnienie przestępstwa.',
    usage: `${pfix.get('prefix')}crime`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) => {
        let maxW = db.get(`crime_max`);
        let minW = db.get(`crime_min`);
        let timeout = db.get(`crime_cooldown`);
        let chance = db.get(`crime_chance`);
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
        let daily = db.get(`crime_${message.author.id}`);

        if(daily != null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));
            return message.channel.send("```Musisz poczekać jeszcze: "+time.hours+" godzin "+time.minutes+" minut "+time.seconds+" sekund aby użyć komendy ponownie.```");
        }else{
            db.add(`cash_${message.author.id}`, amount);
            db.set(`crime_${message.author.id}`, Date.now());
            return message.channel.send("```Otrzymałeś: "+amount+pfix.get(`currency`)+"```");
        }

    },
};