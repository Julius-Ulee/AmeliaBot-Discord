const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "commandcount", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Info",
  usage: "commandcount",
  aliases: ["cmds", "commandc", "count", "cmdcount"],
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "Shows the Amount of Commands an Categories", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp()
          .setTitle(`:gear: **[${client.commands.size}] Commands**`)
          .setDescription(`:gear: **[${client.categories.length}] Categories**\n\n:gear: **[${client.slashCommands.size + client.slashCommands.map(d => d.options).flat().length}] Slash Commands**\n\n`)
        ]
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}
