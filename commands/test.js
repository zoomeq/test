const discord = require('discord.js');
const db = require(`quick.db`);
const pfix = new db.table("prefix");
const fetch = require('node-fetch');

module.exports = {
    name: 'test',
    alias: [],
    description: 'xd',
    usage: `xd`,
    permission: ["NULL"],
    type: "economy",
    run: async (message, args) =>{
        
        console.log(message.author.displayAvatarURL());
        message.channel.send(message.author.displayAvatarURL({dynamic: true}));
    },
};