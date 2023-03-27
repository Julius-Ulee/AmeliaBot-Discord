const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "ping", //the command name for the Slash Command

  category: "Info",
  usage: "ping",
  aliases: ["latency"],

  description: "Gives you information on how fast the Bot is", //the command description for Slash Command Overview
  cooldown: 1,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {
    try {
      const {
        member,
        guildId,
        guild
      } = message;
      const {
        channel
      } = member.voice;
      await message.reply({
          content: `${client.allEmojis.loading} Pinging...`,
          ephemeral: true
        })
        .then(newMsg => newMsg.edit({
          content: `⏳Bot Latency: \`[ ${Math.floor((Date.now() - message.createdTimestamp) - 2 * Math.floor(client.ws.ping))}ms ]\`\n💓Api Latency: \`[ ${Math.floor(client.ws.ping)}ms ]\``,
          ephemeral: true
        }).catch(e => {
          return console.log(e)
        }))
        .catch(e => {
          console.log(e)
        })

    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}
