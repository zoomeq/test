const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");


module.exports = {
    name: 'setcooldown',
    description: 'Ustawia cooldown komendy.',
    usage: `${pfix.get('prefix')}setcooldown <komenda> <czas (h,m,s)>`,
    permission: ["ADMINISTRATOR"],
    type: "economy",
    run: async (message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("```Nie masz uprawnień, aby użyć tej komendy!```");
        if(!args[0]) return message.channel.send("```Podaj jaka komenda!```");
        if(args[0] != 'work' && args[0] != 'slut' && args[0] != 'rob' && args[0] != 'crime' ) return message.channel.send("```Nie ma takiej komendy!```");
        if(!args[1]) return message.channel.send("```Podaj czas!```");
        let time = parseInt(args[1]);
        if(isNaN(time)) return message.channel.send("```Podaj prawidłową wartość!```");

        if(args[1] === time + 'h'){
            db.set(`${args[0].toString()}_cooldown`, parseInt([time * 1000 * 60 * 60]));
            return message.channel.send("```Cooldown "+args[0].toString()+" został ustawiony na: "+time+" godzin```");
        }else if(args[1] === time + 'm'){
            db.set(`${args[0].toString()}_cooldown`, parseInt([time * 1000 * 60]));
            return message.channel.send("```Cooldown "+args[0].toString()+" został ustawiony na: "+time+" minut```");
        }else if(args[1] === time + 's'){
            db.set(`${args[0].toString()}_cooldown`, parseInt([time * 1000]));
            return message.channel.send("```Cooldown "+args[0].toString()+" został ustawiony na: "+time+" sekund```");
        }


    },
};