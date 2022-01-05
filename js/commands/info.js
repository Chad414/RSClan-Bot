const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const pkg = require("../../package.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Displays Bot Info'),
    async execute(interaction) {
      let serverCount = interaction.client.guilds.cache.size;
      let embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle('RSClan Bot')
        .setURL('https://top.gg/bot/803690098839126016')
        .setDescription(`Currently serving ${serverCount} RuneScape communities`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png')
        .addFields(
            { name: `Version ${pkg.version}`, value: 'Developed by Chadathan#0100 with support from Dark Perception' },
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');

      interaction.reply({ embeds: [embed] })
      
    }
};