const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rax')
    .setDescription(`Displays current Araxxor paths`),
  async execute(interaction) {
    // Find Rotation
    let firstRotationDate = new Date('June 11, 2021 00:00:00 GMT+0:00');

    let currentDate = new Date();

    let timeDifference = currentDate.getTime() - firstRotationDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    let numberOfRotations = Math.floor(daysDifference / 4);

    let closedPath = numberOfRotations % 3;

    let daysUntilRotation = 4 - (daysDifference % 4);

    let embed = new Discord.EmbedBuilder()
        .setColor(constants.embedColor)
        .setTitle(`Araxxor's Current Rotation`)
        .setDescription(`Days until next rotation: ${daysUntilRotation}`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/spooder.png')
        .addFields(
            { name: 'Path 1 (Minions)', value: `${(closedPath == 0) ? "Closed" : "Open"}` },
            { name: 'Path 2 (Acid)', value: `${(closedPath == 1) ? "Closed" : "Open"}` },
            { name: 'Path 3 (Darkness)', value: `${(closedPath == 2) ? "Closed" : "Open"}` },
        )
        .setTimestamp()
        .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

    interaction.reply({ embeds: [embed] });
  }
};