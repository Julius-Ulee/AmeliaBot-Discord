const {
	MessageEmbed,
	Message
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const FiltersSettings = require("../../botconfig/filters.json");
const {
	check_if_dj
} = require("../../handlers/functions")

module.exports = {
	name: "addfilter", //the command name for the Slash Command

	category: "Filter",
	usage: "addfilter <Filter1 Filter2>",
	aliases: ["addfilters", "add", "addf"],

	description: "Add a Filter to the Filters", //the command description for Slash Command Overview
	cooldown: 5,
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
			if (!channel) return message.reply({
				embeds: [
					new MessageEmbed().setColor(ee.wrongcolor).setDescription(`${client.allEmojis.x} Please join ${guild.me.voice.channel ? "__my__" : "a"} Voice Channel First!`)
				],
			})
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setDescription(`${client.allEmojis.x} Join __my__ Voice channel!\n<#${guild.me.voice.channel.id}>`)
					],
				});
			}
			try {
				let newQueue = client.distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor).setDescription(`${client.allEmojis.x} I am nothing Playing right now!`)
					],
				})
				if (check_if_dj(client, member, newQueue.songs[0])) {
					return message.reply({
						embeds: [new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x}You are not a DJ and not the Song Requester!`)
							.setDescription(`DJ-ROLES:\n> ${check_if_dj(client, member, newQueue.songs[0])}`)
						],
					});
				}
				let filters = args;
				if (filters.some(a => !FiltersSettings[a])) {
					return message.reply({
						embeds: [
							new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x} You added at least one Filter, which is invalid!`)
							.setDescription("To define Multiple Filters add a SPACE (` `) in between!")
							.addField("All Valid Filters:", Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ") + "\n\n**Note:**\n> *All filters, starting with custom are having there own Command, please use them to define what custom amount u want!*")
						],
					})
				}
				let toAdded = [];
				//add new filters
				filters.forEach((f) => {
					if (!newQueue.filters.includes(f)) {
						toAdded.push(f)
					}
				})
				if (!toAdded || toAdded.length == 0) {
					return message.reply({
						embeds: [
							new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setDescription(`${client.allEmojis.x} You did not add a Filter, which is not in the Filters yet.`)
							.addField(`All __current__ Filter${newQueue.filters.length > 0 ? "s": ""}:`, `${newQueue.filters && newQueue.filters.length > 0 ? `${client.allEmojis.check_mark}${newQueue.filters.map(f=>`\`${f}\``).join(`, `)}` : `${client.allEmojis.x} \`Not Setup\``}`, newQueue.filters.length > 1 ? false : true)
						],
					})
				}
				await newQueue.setFilter(toAdded);
				message.reply({
					embeds: [new MessageEmbed()
					  .setColor(ee.color)
					  .setDescription(`${client.allEmojis.check_mark} Added ${toAdded.length} ${toAdded.length == filters.length ? "Filters": `of ${filters.length} Filters! The Rest was already a part of the Filters!`}`)]
					})
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({
					content: `${client.allEmojis.x} | Error: `,
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor)
						.setDescription(`\`\`\`${e}\`\`\``)
					],
				})
			}
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}
