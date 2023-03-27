const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const websiteSettings = require("../../dashboard/settings.json");
module.exports = {
  name: "help", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Info",
  usage: "help [cmdname]",
  aliases: ["h", "halp", "helpme", "hilfe"],

  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "Returns all Commmands, or one specific command", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
      let prefix = client.settings.get(message.guild.id, "prefix")
      if (args[0] && args[0].length > 0) {
        const embed = new MessageEmbed();
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args.toLowerCase()));
        if (!cmd) {
          return message.reply({
            embeds: [embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${args.toLowerCase()}**`)]
          });
        }
        if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
        if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
        if (cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
        else embed.addField("**Cooldown**", `\`${settings.default_cooldown_in_sec} Second\``);
        if (cmd.usage) {
          embed.addField("**Usage**", `\`@${client.user.username} ${cmd.usage}\``);
          embed.setFooter("Syntax: <> = required, [] = optional");
        }
        return message.reply({
          embeds: [embed.setColor(ee.color)]
        });
      } else {
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setThumbnail(client.user.displayAvatarURL())
          .setAuthor(`${client.user.username} | Help Commands`,ee.icon)
          .setDescription(`Hi, I'm ${client.user.username}Bot!, Vote us for your [support](https://top.gg/bot/706346679263035392/vote)\n[Invite me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands), cause all of my Commands are available as Slash Commands too!\n\n> _I Support ${client.allEmojis.youtube}Youtube, ${client.allEmojis.spotify}Spotify, and ${client.allEmojis.soundcloud}Soundcloud!_ \n> Check out the [**Website**](${websiteSettings.website.domain}) or the [**Dashboard**](${websiteSettings.website.domain}/dashboard/${message.guild.id}) for setup bots.`)
          .setFooter(`To see Command Description & Information, type: @${client.user.username} help [CMD NAME]`, ee.footericon);
        const commands = (category) => {
          return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
        };
        try {
          for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i];
            const items = commands(current);
            embed.addField(`${client.allEmojis.crown} ❱ ${current.toUpperCase()} [${items.length}]`, `[${items.join(" ")}](https://discord.gg/VzUR95y)`, true);
          }
        } catch (e) {
          console.log(String(e.stack).red);
        }
        message.reply({
          embeds: [embed]
        });
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${client.allEmojis.x} ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]
      });
    }
  }
}
