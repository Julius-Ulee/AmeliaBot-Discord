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
	name: "remove", //the command name for the Slash Command
	description: "Removes one+ Song(s)", //the command description for Slash Command Overview
	cooldown: 10,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!
		//INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
		{
			"Integer": {
				name: "what_song",
				description: "What Song Index do you want to remove?",
				required: true
			}
		}, //to use in the code: interacton.getInteger("ping_amount")
		{
			"Integer": {
				name: "how_many",
				description: "How many Songs from there do you want to remove? (Default: 1)",
				required: false
			}
		}, //to use in the code: interacton.getInteger("ping_amount")
		//{"String": { name: "song", description: "Which Song do you want to play", required: true }}, //to use in the code: interacton.getString("title")
		//{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
		//{"Channel": { name: "in_where", description: "In What Channel should I send it?", required: false }}, //to use in the code: interacton.getChannel("what_channel")
		//{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
		//{"IntChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", 1], ["Discord Api", 2]] }}, //here the second array input MUST BE A NUMBER // TO USE IN THE CODE: interacton.getInteger("what_ping")
		//{"StringChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [["Bot", "botping"], ["Discord Api", "api"]] }}, //here the second array input MUST BE A STRING // TO USE IN THE CODE: interacton.getString("what_ping")
	],
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
					new MessageEmbed().setColor(ee.wrongcolor).setDescription(`${client.allEmojis.x} Please join ${guild.me.voice.channel ? "__my__" : "a"} Voice Channel First!`)
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
				if (check_if_dj(client, member, newQueue.songs[0])) {
					return interaction.reply({
						embeds: [new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x} You are not a DJ and not the Song Requester!`)
							.setDescription(`DJ-ROLES:\n> ${check_if_dj(client, member, newQueue.songs[0])}`)
						],
						ephemeral: true
					});
				}
				let songIndex = options.getInteger("what_song");
				let amount = options.getInteger("how_many");
				if (!amount) amount = 1;
				if (songIndex > newQueue.songs.length - 1) return interaction.reply({
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} This Song does not exist!`)
						.setDescription(`The last Song in the Queue has the Index: \`${newQueue.songs.length}\``)
					],
					ephemeral: true
				})
				if (songIndex <= 0) return interaction.reply({
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} You can't remove the current Song (0)!`)
						.setDescription(`Use the \`@${client.user.username} skip\` (Slash)Command instead!`)
					],
					ephemeral: true
				})
				if (amount <= 0) return interaction.reply({
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} You need to at least remove 1 Song!`)
					],
					ephemeral: true
				})
				newQueue.songs.splice(songIndex, amount);
				interaction.reply({
					embeds: [new MessageEmbed()
					  .setColor(ee.color)
					  .setDescription(`${client.allEmojis.check_mark} Removed ${amount} Song${amount > 1 ?"s": ""} out of the Queue!`)]
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

