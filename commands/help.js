const discord = require('discord.js');
const db = require(`quick.db`);
const Pagination = require('discord-paginationembed');
const pfix = new db.table("prefix");
const fetch = require('node-fetch');
module.exports = {
    name: 'help',
    description: 'Pomoc.',
    usage: `${pfix.get('prefix')}help`,
    permission: "NULL",
    type: "utility",
    run: async (message, args, client) =>{
        

        let arr = [], eco = [], util = [], mod = [];
        let a = 0, e = 0, u = 0, m=0;

        let getColor = async () => {
            let result = await fetch('http://www.colr.org/json/color/random');

            let json = await result.json();
            return json;
        }

        let arr1 = [];
        arr1.push(new discord.MessageEmbed().setTitle(`Ekonomia`));
        arr1.push(new discord.MessageEmbed().setTitle(`Utility`));
        arr1.push(new discord.MessageEmbed().setTitle(`Moderacyjne`));


        let n =0;
        if(!args[0]){
            return message.channel.send("```Sprecyzuj którą stronę chcesz wyświetlić.\nDostępne: ("+arr1.length+")```");
        }else if(args[0] != 1 && args[0] != 2 && args[0] != 3){
            return message.channel.send("```Podaj prawidłowy argument!```");
        }else{
            n = parseInt(args[0]);
        }

        let randcolor = await getColor();
        
        const embed = new Pagination.Embeds()
            .setArray(arr1)
            .setChannel(message.channel)
            .setColor(randcolor.new_color)
            .setDisabledNavigationEmojis(['all'])
            .setPage(n)
            .setFooter(`Strona ${n}/${arr1.length}`);


        if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission("BAN_MEMBERS") && !message.member.hasPermission("KICK_MEMBERS")){
            for(let i=0; i<client.commands.map(cmd => cmd.name).length; i++){
                if(client.commands.map(cmd => cmd.name && cmd.permission.includes("NULL"))[i]){
                    arr[a] = client.commands.map(cmd => cmd.name)[i];
                    a++;
                };
                if(client.commands.map(cmd => cmd.name && cmd.permission.includes("NULL") && cmd.type.includes('economy'))[i]){
                    eco[e] = client.commands.map(cmd => cmd.name)[i];
                    e++;
                };
                if(client.commands.map(cmd => cmd.name && cmd.permission.includes("NULL") && cmd.type.includes('utility'))[i]){
                    util[u] = client.commands.map(cmd => cmd.name)[i];
                    u++;
                }
            };
        }else{
            for(let i=0; i<client.commands.map(cmd => cmd.name).length; i++){
                if(client.commands.map(cmd => cmd.name)[i]){
                    arr[a] = client.commands.map(cmd => cmd.name)[i];
                    a++;
                };
                if(client.commands.map(cmd => cmd.name && cmd.type.includes('economy'))[i]){
                    eco[e] = client.commands.map(cmd => cmd.name)[i];
                    e++;
                };
                if(client.commands.map(cmd => cmd.name && cmd.type.includes('utility'))[i]){
                    util[u] = client.commands.map(cmd => cmd.name)[i];
                    u++;
                };
                if(client.commands.map(cmd => cmd.name && cmd.type.includes('moderation'))[i]){
                    mod[m] = client.commands.map(cmd => cmd.name)[i];
                    m++;
                };
            };
        }

        
        if(embed.currentEmbed.title === `Ekonomia`){
            for(let i=0; i< eco.length; i++){
                embed.addField(`${client.commands.find(cmd => cmd.name === eco[i]).name}`, `${client.commands.find(cmd => cmd.name === eco[i]).description}\n${client.commands.find(cmd => cmd.name === eco[i]).usage}`);
            };
        }else if(embed.currentEmbed.title === `Utility`){
            for(let i=0;i<util.length;i++){
                embed.addField(`${client.commands.find(cmd => cmd.name === util[i]).name}`,`${client.commands.find(cmd => cmd.name === util[i]).description}\n${client.commands.find(cmd => cmd.name === util[i]).usage}`);
            };
        }else{
            for(let i=0;i<mod.length;i++){
                embed.addField(`${client.commands.find(cmd => cmd.name === mod[i]).name}`,`${client.commands.find(cmd => cmd.name === mod[i]).description}\n${client.commands.find(cmd => cmd.name === mod[i]).usage}`);
            };
        };
        embed.build();

        

    },
};