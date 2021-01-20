const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const ms = require(`parse-ms`);
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
    name: 'work',
    description: 'Pójście do pracy.',
    usage: `${pfix.get('prefix')}work`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) => {
        let maxW = db.get(`work_max`);
        let minW = db.get(`work_min`);
        let timeout = db.get(`work_cooldown`);
        if(maxW === null) maxW = 1000;
        if(minW === null) minW = 100;
        if(timeout === null) timeout = 43200000;
        let amount = parseInt(randomNumber(minW, maxW));
        let daily = db.get(`work_${message.author.id}`);

        if(daily != null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));
            return message.channel.send("```Musisz poczekać jeszcze: "+time.hours+" godzin "+time.minutes+" minut "+time.seconds+" sekund aby użyć komendy ponownie.```");
        }else{
            db.add(`cash_${message.author.id}`, amount);
            db.set(`work_${message.author.id}`, Date.now());
            return message.channel.send("```Otrzymałeś: "+amount+pfix.get(`currency`)+"```");
        }

    },
};