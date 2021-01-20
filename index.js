const fs = require(`fs`);
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const db = require(`quick.db`);
const pfix = new db.table("prefix");

const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));

for(const file of commandFiles) {
    const commandN = require(`./commands/${file}`);
    client.commands.set(commandN.name, commandN);
}

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
    client.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        activity: {
            name: `${pfix.get('prefix')}help`,  // The message shown
            type: "LISTENING" // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });    console.log('Ready!');
    let n = client.commands.size;
    console.log('Załadowano: ');
    let arr = [];
    for(let i=0;i<n;i++){
        arr[i] = client.commands.map(cmd => cmd.name)[i];
    };
    console.log(arr);
    console.log(client.generateInvite());
});

client.on('message', message => {
if(message.channel.type == "dm" || message.author.bot || !message.content.toLowerCase().startsWith(pfix.get('prefix'))) return;

var args = message.content.slice(pfix.get('prefix').length).trim().split(/ +/);
var commandN = args.shift().toLowerCase();
const command = client.commands.get(commandN)
    || client.commands.find(cmd => cmd.alias && cmd.alias.includes(commandN));
if(!command) return;
try {
	command.run(message, args, client);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}

});

return;
