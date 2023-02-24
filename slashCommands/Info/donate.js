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
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "Donate Bot", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, interaction) => {
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
      } = interaction;
      const {
        guild
      } = member;
      interaction.reply({
        ephemeral: true,
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setAuthor(`Donate ${client.user.username}`,ee.footericon)
          .setDescription(`<@${member.user.id}>, Donate if you want the ${client.user.username}bot to be active\nSaweria: https://saweria.co/ameliabot
Dana: 08988999259
BCA: 5465412205
Paypal: https://paypal.me/ameliabot
\nDon't forget to leave your discord name or id in the message.`)
          .setFooter(`Generous donation, Thank you.❤️ :)`)
        ]
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}