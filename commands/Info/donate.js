const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const {
  duration
} = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "donate", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Info",
  usage: "donate",

  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "Donate Bot", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
      //things u can directly access in an interaction!
      const {
        member,
        channelId,
        guildId,
        applicationId,
        commandName,
        deferred,
        replied,
        ephemeral,
        options,
        id,
        createdTimestamp
      } = message;
      const {
        guild
      } = member;
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setAuthor(`Donate ${client.user.username}`,ee.footericon)
          .setDescription(`Hey! ${message.author}, Donate if you want the ${client.user.username}bot to be active\nSaweria: https://saweria.co/AmeliaBotDiscord
BTC: ||1QBGLcyApogJMZxSBQ6yhu4HmNGX4dB1cK||
\nDon't forget to leave your discord name or id in the message.`)
          .setImage('https://media.discordapp.net/attachments/899286227432398849/1008732061294674030/amelia_banner.jpg?width=960&height=308')
          .setFooter(`Generous donation, Thank you.❤️ :)`)
        ]
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}

