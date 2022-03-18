const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rots')
    .setDescription(`Displays current and next Rots rotation`),
  async execute(interaction) {

    let firstRotationDate = new Date('September 30, 2021 00:00:00 GMT+0:00');
    let currentDate = new Date();

    let timeDifference = currentDate.getTime() - firstRotationDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    let index = daysDifference % 20;

    let rotation = constants.rotsRotations[index]
    let t_rotation = constants.rotsRotations[(index + 1) % 20]

    let embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Rots Current Rotation`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/rots.png')
        .addFields(
            { name: 'West', value: `${rotation[0][0]}\n${rotation[0][1]}\n${rotation[0][2]}`, inline: true },
            { name: 'East', value: `${rotation[1][0]}\n${rotation[1][1]}\n${rotation[1][2]}`, inline: true },
            { name: 'Next Rotation', value: `**W:** ${t_rotation[0][0]}, ${t_rotation[0][1]}, ${t_rotation[0][2]}\n**E:** ${t_rotation[1][0]}, ${t_rotation[1][1]}, ${t_rotation[1][2]}`},
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');

    interaction.reply({ embeds: [embed] });
  }
};