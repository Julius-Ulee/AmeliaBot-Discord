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
const FiltersSettings = require("../../botconfig/filters.json");
module.exports = {
	name: "remove", //the command name for the Slash Command
	description: "Removes a Filter from the Queue", //the command description for Slash Command Overview
	cooldown: 5,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!
		//INFORMATIONS! You can add Options, but mind that the NAME MUST BE LOWERCASED! AND NO SPACES!!!, for the CHOCIES you need to add a array of arrays; [ ["",""] , ["",""] ] 
		//{"Integer": { name: "volume", description: "What should be the Volume? It must be between 0 & 150", required: true }}, //to use in the code: interacton.getInteger("ping_amount")
		//{"String": { name: "song", description: "Which Song do you want to play", required: true }}, //to use in the code: interacton.getString("title")
		//{"User": { name: "ping_a_user", description: "To Ping a user lol", required: false }}, //to use in the code: interacton.getUser("ping_a_user")
		//{"Channel": { name: "in_where", description: "In What Channel should I send it?", required: false }}, //to use in the code: interacton.getChannel("what_channel")
		//{"Role": { name: "what_role", description: "To Ping a Role lol", required: false }}, //to use in the code: interacton.getRole("what_role")
		{
			"String": {
				name: "filters",
				description: "Add all filters with a space between, to remove!",
				required: true
			}
		}, //to use in the code: interacton.getString("title")
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
				let filters = options.getString("filters").toLowerCase().split(" ");
				if (!filters) filters = [options.getString("filters").toLowerCase()]
				if (filters.some(a => !FiltersSettings[a])) {
					return interaction.reply({
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
				let toRemove = [];
				//add new filters    bassboost, clear    --> [clear] -> [bassboost]   
				filters.forEach((f) => {
					if (newQueue.filters.includes(f)) {
						toRemove.push(f)
					}
				})
				if (!toRemove || toRemove.length == 0) {
					return interaction.reply({
						embeds: [
							new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setDescription(`${client.allEmojis.x} You did not add a Filter, which is in the Filters.`)
							.addField(`All __current__ Filter${newQueue.filters.length > 0 ? "s": ""}:`, `${newQueue.filters && newQueue.filters.length > 0 ? `${client.allEmojis.check_mark}${newQueue.filters.map(f=>`\`${f}\``).join(`, `)}` : `${client.allEmojis.x} \`Not Setup\``}`, newQueue.filters.length > 1 ? false : true)
						],
					})
				}
				await newQueue.setFilter(toRemove);
				interaction.reply({
					embeds: [new MessageEmbed()
					  .setColor(ee.color)
					  .setDescription(`${client.allEmojis.check_mark} Removed ${toRemove.length} ${toRemove.length == filters.length ? "Filters": `of ${filters.length} Filters! The Rest wasn't a part of the Filters yet!`}`)]
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
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
