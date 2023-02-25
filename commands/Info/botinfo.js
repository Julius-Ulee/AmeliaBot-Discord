const {
    MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
let cpuStat = require("cpu-stat");
let os = require("os");
module.exports = {
    name: "botinfo", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Info",
    usage: "botinfo",
    aliases: ["info",],
    cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
    description: "Shows Information about the Bot", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
      let tempmsg = await message.reply({
      embeds: [new Discord.MessageEmbed().setColor(ee.color)
        .setDescription(`${client.allEmojis.loading} Getting the Bot-Information-Data`)
      ]
    })
        try {

            cpuStat.usagePercent(function (e, percent, seconds) {
                try {
                    if (e) return console.log(String(e.stack).red);

                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

                    const botinfo = new MessageEmbed()
                        .setAuthor(client.user.tag + " Information", ee.footericon, `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
                        .setDescription(`\`\`\`yml\nName: ${client.user.tag} [${client.user.id}]\nApi Latency: ${Math.round(client.ws.ping)}ms\nRuntime: ${duration(client.uptime).join(`, `)}\`\`\``)
                        .setColor(ee.color).setThumbnail(client.user.displayAvatarURL())
                        .addField("📚 General -- Stats", `\`\`\`yml\nServers: ${client.guilds.cache.size}\nVoice-Channels: ${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\nUsers: ${Math.ceil(client.users.cache.size/1000)}k\nConnections: ${connectedchannelsamount}\`\`\``,true)
                        .addField("👾 Bot -- Stats", `\`\`\`yml\nNode.js: ${process.version}\nDiscord.js: v${Discord.version}\nEnmap: v5.8.4\`\`\``,true)
                        .addField("🤖 System -- Stats",`\`\`\`yml\nOS: ${os.platform()} | Debian\nCPU: ${os.cpus().map((i) => `${i.model}`)[0]}\nCPU Usage: ${percent.toFixed(2)} %\nRAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\nArch: ${os.arch()}\`\`\``)
                        .addField("👑 Developer", `\`\`\`yml\nName: ✗Julius Ulee✗#5323\nID: [385442265302302721]\`\`\``, true)
        .setTimestamp()
        .setFooter(ee.footertext, ee.footericon);
                    tempmsg.edit({
                        embeds: [botinfo]
                    });

                } catch (e) {
                    console.log(e)
                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                    const botinfo = new MessageEmbed()
                        .setAuthor(client.user.tag + " Information", ee.footericon, `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
                        .setDescription(`\`\`\`yml\nName: ${client.user.tag} [${client.user.id}]\nApi Latency: ${Math.round(client.ws.ping)}ms\nRuntime: ${duration(client.uptime).join(`, `)}\`\`\``)
                        .setColor(ee.color).setThumbnail(client.user.displayAvatarURL())
                        .addField("📚 General -- Stats", `\`\`\`yml\nServers: ${client.guilds.cache.size}\nVoice-Channels: ${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\nUsers: ${Math.ceil(client.users.cache.size/1000)}k\nConnections: ${connectedchannelsamount}\`\`\``,true)
                        .addField("👾 Bot -- Stats", `\`\`\`yml\nNode.js: ${process.version}\nDiscord.js: v${Discord.version}\nEnmap: v5.8.4\`\`\``,true)
                        .addField("🤖 System -- Stats",`\`\`\`yml\nOS: ${os.platform()} | Debian\nCPU: ${os.cpus().map((i) => `${i.model}`)[0]}\nCPU Usage: ${percent.toFixed(2)} %\nRAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\nArch: ${os.arch()}\`\`\``)
                        .addField("👑 Developer", `\`\`\`yml\nName: ✗Julius Ulee✗#5323\nID: [385442265302302721]\`\`\``, true)
        .setTimestamp()
        .setFooter(ee.footertext, ee.footericon);
                    tempmsg.edit({
                      embeds: [botinfo]
                  });
                }
            })

            function duration(duration, useMilli = false) {
                let remain = duration;
                let days = Math.floor(remain / (1000 * 60 * 60 * 24));
                remain = remain % (1000 * 60 * 60 * 24);
                let hours = Math.floor(remain / (1000 * 60 * 60));
                remain = remain % (1000 * 60 * 60);
                let minutes = Math.floor(remain / (1000 * 60));
                remain = remain % (1000 * 60);
                let seconds = Math.floor(remain / (1000));
                remain = remain % (1000);
                let milliseconds = remain;
                let time = {
                    days,
                    hours,
                    minutes,
                    seconds,
                    milliseconds
                };
                let parts = []
                if (time.days) {
                    let ret = time.days + ' Day'
                    if (time.days !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (time.hours) {
                    let ret = time.hours + ' Hr'
                    if (time.hours !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (time.minutes) {
                    let ret = time.minutes + ' Min'
                    if (time.minutes !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)

                }
                if (time.seconds) {
                    let ret = time.seconds + ' Sec'
                    if (time.seconds !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (useMilli && time.milliseconds) {
                    let ret = time.milliseconds + ' ms'
                    parts.push(ret)
                }
                if (parts.length === 0) {
                    return ['instantly']
                } else {
                    return parts
                }
            }
            return;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}
