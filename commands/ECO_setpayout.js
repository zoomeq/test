const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");


module.exports = {
    name: 'setpayout',
    description: 'Ustawia ilość wypłaty z komendy.',
    usage: `${pfix.get('prefix')}setpayout <komenda> <min> <max> (rob - wartości 0-100)`,
    permission: ["ADMINISTRATOR"],
    type: "economy",
    run: async (message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("```Nie masz uprawnień, aby użyć tej komendy!```");
        if(!args[0]) return message.channel.send("```Podaj jaka komenda!```");
        if(args[0] != 'work' && args[0] != 'slut' && args[0] != 'rob' && args[0] != 'crime' ) return message.channel.send("```Nie ma takiej komendy!```");
        if(!args[1]) return message.channel.send("```Podaj wartość minimalną!```");
        if(!args[2]) return message.channel.send("```Podaj wartość maksymalną!```");
        let min = parseInt(args[1]);
        let max = parseInt(args[2]);
        if(isNaN(min)) return message.channel.send("```Podaj prawidłową wartość!```");
        if(isNaN(max)) return message.channel.send("```Podaj prawidłową wartość!```");
        if(args[0] === 'rob'){
            if(min < 1 || min > 100) return message.channel.send("```Podaj prawidłową wartość!```");
            if(max > 100) return message.channel.send("```Podaj prawidłową wartość!```");
        };

        db.set(`${args[0].toString()}_min`, min);
        db.set(`${args[0].toString()}_max`, max);
        return message.channel.send("```Wartość minimalna wynosi: "+min+pfix.get(`currency`)+", a maksymalna: "+max+pfix.get(`currency`)+"```");

    },
};