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
	name: "grab", //the command name for the Slash Command
	description: "Shows the current Playing Song", //the command description for Slash Command Overview
	cooldown: 2,
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
			const {
				channel
			} = member.voice;
			if (!channel) return interaction.reply({
				embeds: [
					new MessageEmbed().setColor(ee.wrongcolor).setDesciption(`${client.allEmojis.x} Please join ${guild.me.voice.channel ? "__my__" : "a"} Voice Channel First!`)
				],
				ephemeral: true
			})
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return interaction.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setDescription(`${client.allEmojis.x} Join __my__ Voice Channel!\n<#${guild.me.voice.channel.id}>`)
					],
					ephemeral: true
				});
			}
			try {
				let newQueue = client.distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return interaction.reply({
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor).setDescription(`${client.allEmojis.x} I am nothing Playing right now!`)
					],
					ephemeral: true
				})
				let newTrack = newQueue.songs[0];
				interaction.reply({
					content: `@${client.user.username} play ${newTrack.url}`,
					embeds: [
						new MessageEmbed().setColor(ee.color)
			.setDescription(`[${newTrack.name}](${newTrack.streamURL})\n${newTrack.user} - \`${newQueue.formattedCurrentTime} / ${newTrack.formattedDuration}\``)
      .addField(`Autoplay:`, `${newQueue.autoplay ? `${client.allEmojis.check_mark} \`Enable\`` : `${client.allEmojis.x} \`Disable\``}`, true)
      .addField(`Filter${newQueue.filters.length > 0 ? "s": ""}:`, `${newQueue.filters && newQueue.filters.length > 0 ? `${client.allEmojis.check_mark}${newQueue.filters.map(f=>`\`${f}\``).join(`, `)}` : `${client.allEmojis.x} \`Not Setup\``}`, newQueue.filters.length > 1 ? false : true)
      .addField(`<:YouTube:735293606973276180>  View${newTrack.views > 0 ? "s": ""}:`, `\`${newTrack.views}\``, true)
			.addField(`:thumbsup: Like${newTrack.likes > 0 ? "s": ""}:`, `\`${newTrack.likes}\``, true)
			.addField(`:thumbsdown: Dislike${newTrack.dislikes > 0 ? "s": ""}:`, `\`${newTrack.dislikes}\``, true)
      .setAuthor(`Now playing ♪`, `https://media.discordapp.net/attachments/713330653466460254/797889727499468800/Music.gif`)
      .setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
      .setFooter(`🔁Song in queue: ${newQueue.songs.length} song(s) ${newQueue.formattedDuration} | Volume: ${newQueue.volume}% | Loop: ${newQueue.repeatMode ? newQueue.repeatMode === 2 ? `✅Queue` : `✅Song` : `❌Disable`}`)
					]
				}).catch((e) => {
					onsole.log(e.stack ? e.stack : e)
				})
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				interaction.editReply({
					content: `${client.allEmojis.x} | Error: `,
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor)
						.setDescription(`\`\`\`${e}\`\`\``)
					],
					ephemeral: true
				})
			}
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}
