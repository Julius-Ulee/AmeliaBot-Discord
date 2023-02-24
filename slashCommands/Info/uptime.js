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
  name: "uptime", //the command name for execution & for helpcmd [OPTIONAL]
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "Returns the duration on how long the Bot is online", //the command description for helpcmd [OPTIONAL]
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
          .setAuthor(`${client.user.username} is since`,ee.footericon)
          .setDescription(`${client.allEmojis.online}Uptime: ${duration(client.uptime).map(t=>`\`${t}\``).join(", ")} online.`)
        ]
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}

