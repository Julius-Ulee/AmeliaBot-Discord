const {
	MessageEmbed,
	Message
} = require("discord.js");
const {
    KSoftClient
} = require('@ksoft/api');
const { TrackUtils } = require("erela.js");
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");
const config = require(`../../botconfig/config.json`);
const ksoft = new KSoftClient(config.ksoftapi);
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const {
	lyricsEmbed,
	check_if_dj
} = require("../../handlers/functions");
module.exports = {
	name: "lyrics", //the command name for the Slash Command
	description: "Shows the Lyrics of the current Song", //the command description for Slash Command Overview
	cooldown: 5,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction,message) => {
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
					new MessageEmbed().setColor(ee.wrongcolor).setDescription(`${client.allEmojis.x} Please join ${guild.me.voice.channel ? "__my__" : "a"} VoiceChannel First!`)
				],
				ephemeral: true
			})
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return interaction.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`${client.allEmojis.x} Join __my__ Voice Channel!`)
						.setDescription(`<#${guild.me.voice.channel.id}>`)
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
				
			
				
        let SongTitle = newQueue.songs[0].name;
         SongTitle = SongTitle.replace(
      /(Lyrics)|lyrics|lyric|()|lyrical|official music video|\(official music video\)|audio|video|official|official video|official video hd|official hd video|hd audio|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi,
      ""
    );

    let lyrics = await lyricsFinder(SongTitle);
    if (!lyrics)
         return interaction.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setDescription(`**${client.allEmojis.x} No lyrics found for -** \`${SongTitle}\`\nWant to try again use \`@${client.user.username} lyrics SongName\` without anything extra!`)
					],
           ephemeral: true
				})

    lyrics = lyrics.split("\n"); //spliting into lines
    let SplitedLyrics = _.chunk(lyrics, 40); //45 lines each page

    let Pages = SplitedLyrics.map((ly) => {
      let em = new MessageEmbed()
        .setAuthor(`Lyrics for: ${SongTitle}`)
        .setColor(ee.color)
        .setDescription(ly.join("\n"));

      // if (args.join(" ") !== SongTitle)
      //   em.setThumbnail(player.queue.current.displayThumbnail());
// console.log(Pages);	
      return interaction.channel.send({embeds: [em]})
    });
	if (!Pages.length || Pages.length === 1)
      return interaction.channel.send(Pages[0]);
        else  return interaction.reply("Hey!!👋");
    }     
    	catch (e) {
				console.log(e.stack ? e.stack : e)
				interaction.channel.send({
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