const {
	MessageEmbed,
	Message
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const {
	check_if_dj
} = require("../../handlers/functions")
module.exports = {
	name: "rewind", //the command name for the Slash Command
	category: "Song",
	usage: "rewind <TimeInSec>",
	aliases: ["rwd"],
	description: "Rewinds for X Seconds", //the command description for Slash Command Overview
	cooldown: 10,
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
						.setDescription(`${client.allEmojis.x} Join __my__ Voice Channel!\n<#${guild.me.voice.channel.id}>`)
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
				if (!args[0]) {
					return message.reply({
						embeds: [
							new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setDescription(`${client.allEmojis.x} Please add a Rewinding Duration! \`@${client.user.username} rewind <Duration_in_Sec>\``)
						],
					})
				}
				let seekNumber = Number(args[0])
				let seektime = newQueue.currentTime - seekNumber;
				if (seektime < 0) seektime = 0;
				if (seektime >= newQueue.songs[0].duration - newQueue.currentTime) seektime = 0;
				if (check_if_dj(client, member, newQueue.songs[0])) {
					return message.reply({
						embeds: [new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x} You are not a DJ and not the Song Requester!`)
							.setDescription(`DJ-ROLES:\n> ${check_if_dj(client, member, newQueue.songs[0])}`)
						],
					});
				}
				await newQueue.seek(seektime);
				message.reply({
					embeds: [new MessageEmbed()
					  .setColor(ee.color)
					  .setDescription(`⏪ Rewinded the song for \`${seekNumber} Seconds\`!`)]
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

