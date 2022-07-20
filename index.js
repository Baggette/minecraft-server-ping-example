const { Client, Intents, Message} = require('discord.js');
const util = require('minecraft-server-util');
const {MessageEmbed, MessageSelectMenu} = require('discord.js');
const options = {
    timeout: 1000 * 5, // timeout in milliseconds
    enableSRV: true // SRV record lookup
};
const prefix = "!"; //prefix
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
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
    const args = message.content.slice(Prefix.length).split(/ +/);
    if(!args[0]){//if no args are provided use the info from const server_ip and server_port
        util.status(server_ip, server_port, options)
    .then((result) => {
        
        const string1 = JSON.stringify(result);// turn the object into a string
        const string = JSON.parse(string1);// make the string parsable
        const embed = new MessageEmbed()
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
    const embed = new MessageEmbed()
    .setColor("#808080")
    .setTitle("example server status")
    .setDescription(`The server was unable to be pinged or you mis-typed the info`)
    .setTimestamp()
    message.channel.send({embeds: [embed]})// send the embed
    
    });
    }else if(!args[1]){//if the ip is there but no port send this message
        message.channel.send("Please include a port")
    }else if (args[0] && args[1]){//if the port and ip are there send this
        const ip = args[0]
        const string_port = args[1]//port is still a "string"
        const port = parseInt(string_port) //convert the port into a string 
        util.status(ip, port, options)
    .then((result) => {
        
        const string1 = JSON.stringify(result);// turn the object into a string
        const string = JSON.parse(string1);// make the string parsable
        const embed = new MessageEmbed()
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
    const embed = new MessageEmbed()
    .setColor("#808080")
    .setTitle("example server status")
    .setDescription(`The server was unable to be pinged or you mis-typed the info`)
    .setTimestamp()
    message.channel.send({embeds: [embed]})// send the embed
    })}
    


});
client.login("1234567890abcdefghijk");//replace with your bot token
//you may need to give the bot the privileged gateway intents
//this was inspired by this gist https://gist.github.com/vegeta897/e3d2fcd4b661bd9d021c397e7505be05 (this is outdated, do not use it)
