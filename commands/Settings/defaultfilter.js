const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const filters = require("../../botconfig/filters.json")
module.exports = {
  name: "defaultfilter", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Settings",
  aliases: ["dfilter"],
  usage: "defaultfilter <Filter1 Filter2>",
  cooldown: 10, //the command cooldown for execution & for helpcmd [OPTIONAL]
  usage: "defaultfilter", //the command usage for helpcmd [OPTIONAL]
  description: "Defines the Default Filter(s)", //the command description for helpcmd [OPTIONAL]
  memberpermissions: ["MANAGE_GUILD "], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL], //Only allow specific Users to execute a Command [OPTIONAL]

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
      client.settings.ensure(guild.id, {
        defaultvolume: 100,
        defaultautoplay: false,
        defaultfilters: [`bassboost`]
      });
      if (args.some(a => !filters[a])) {
        return message.reply({
          embeds: [
            new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle(`${client.allEmojis.x} You added at least one Filter, which is invalid!`)
            .setDescription("To define Multiple Filters add a SPACE (` `) in between!")
            .addField("**All Valid Filters:**", Object.keys(filters).map(f => `\`${f}\``).join(", "))
          ],
        })
      }

      client.settings.set(guild.id, args, "defaultfilters");
      return message.reply({
        embeds: [
          new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`${client.allEmojis.check_mark} The new Default-Filter${args.length > 0 ? "s are": " is"}: ${args.map(a=>`\`${a}\``).join(", ")}`)
        ],
      })
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}
