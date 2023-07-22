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
  name: "guide", //the command name for execution & for helpcmd [OPTIONAL]
  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "First steps when just inserting Amelia", //the command description for helpcmd [OPTIONAL]
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
          .setAuthor(`${client.user.username} Guide`,ee.footericon)
          .setDescription(`${message.author}, First steps when just inserting ${client.user.username}\n\n\`Step 1\`: Enable the mandatory \`AutoResume\`.
\`Step 2\`: Set Access Roles Using \`dj\` Command.
\`Step 3\`: Set \`defaultFilter\` If you want to be desable visit our website or use the command.
\`Step 4\`: Setting up \`botchat\`, so that bots do not carelessly appear on any channel such as public chat.
\nIf you are still confused, use the \`@${client.user.username} help <command>\`.`)
          .setImage('https://media.discordapp.net/attachments/899286227432398849/1008732061294674030/amelia_banner.jpg?width=960&height=308')
          .setTimestamp()
        ]
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}
