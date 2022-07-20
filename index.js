const { Client, Intents, Message} = require('discord.js');
const util = require('minecraft-server-util');
const {EmbedBuilder} = require('discord.js');
const options = {
    timeout: 1000 * 5, // timeout in milliseconds
    enableSRV: true // SRV record lookup
};
const prefix = "!mcstatus"; //prefix
const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent"
    ]
});
client.on('ready', () => {
    console.log('bot started');// so you know the bot started
    //if you don't want the activity status comment out the line below using //
    client.user.setPresence({ activities: [{ name: `${server_ip}`, type: 'WATCHING' }], status: 'active' });// just a little feature to display whatever server is under server_ip
});
const server_ip = "exampleserver.net"; //replace with real ip for the server
const server_port = 12345; // replace with the real port also thanks dashcruft for testing the code
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if(message.content.startsWith(prefix)){
          util.status(server_ip, server_port, options)
    .then((result) => {
        
        const string1 = JSON.stringify(result);// turn the object into a string
        const string = JSON.parse(string1);// make the string parsable
        const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("example server status")
    .setDescription(`This will show the status and info about the minecraft server \n **Server ip:** ${server_ip} \n **Server port:** ${server_port}`)
    .addFields(
        {name:"Server Version", value: `${string.version.name}`},
        {name:"Server Protocol Version", value:`${string.version.protocol}`},
        {name:"Players Online", value:`${string.players.online}`},
        {name:"Max Players", value:`${string.players.max}`},
        {name:"MOTD (May Not Display Accurately)", value:`${string.motd.clean}`},
        {name:"Latency", value:`${string.roundTripLatency}`},
    )
    .setTimestamp()
    message.channel.send({embeds: [embed]})// send the embed
    })
    
    .catch((error) => {
    console.log(error);// if the server was unable to be pinged or something else happened
    const embed = new EmbedBuilder()
    .setColor("#808080")
    .setTitle("example server status")
    .setDescription(`The server was unable to be pinged or you mis-typed the info`)
    .setTimestamp()
    message.channel.send({embeds: [embed]})// send the embed
    
    })}});
client.login("yourTokenHere");//replace with your bot token
//you may need to give the bot the privileged gateway intents
//this was inspired by this gist https://gist.github.com/vegeta897/e3d2fcd4b661bd9d021c397e7505be05 (this is outdated, do not use it)
