const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const userstore = require("../userstore");
const _ = require('lodash');
const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gains')
    .setDescription(`Display user's Daily, Yesterday, and Weekly XP Gains`)
    .addStringOption(option =>
      option.setName('rsn')
        .setDescription('RuneScape Name')
        .setRequired(false)),
  async execute(interaction) {
    let rsn = interaction.options.getString('rsn');
    let userID = interaction.user.id;

    if (rsn == undefined) {
      rsn = userstore.getUser(userID);

      if (rsn == undefined) {
        interaction.reply({ embeds: [constants.noRSN] });
        return;
      }
    } else {
      while (rsn.includes(' ')) {
        rsn = rsn.replace(' ', '+');
      }
    }

    interaction.reply({ embeds: [constants.runeClanOffline] });
    return;

    await rp(`https://www.runeclan.com/user/${rsn}`).then(function (html) {
      const $ = cheerio.load(html);
      const data = $('tr');

      let daily = [];
      let yesterday = [];
      let weekly = [];

      // Format RSN if spaced
      rsn = (rsn.includes('+')) ? _.startCase(rsn.replace('+', ' ')) : _.upperFirst(rsn)

      // Row, Column, Value
      // Daily Row
      for (let i = 1; i < 30; i++) {
        daily.push(data[i].children[4].children[0].data);
        yesterday.push(data[i].children[5].children[0].data);
        weekly.push(data[i].children[6].children[0].data);
      }

      // Format XP Labels
      for (let i = 0; i < daily.length; i++) {
        daily[i] = daily[i].replace(/\s+/g, '');
        daily[i] = _.padStart(daily[i], 9, " ");

        yesterday[i] = yesterday[i].replace(/\s+/g, '');
        yesterday[i] = _.padStart(yesterday[i], 10, " ");

        weekly[i] = weekly[i].replace(/\s+/g, '');
        weekly[i] = _.padStart(weekly[i], 10, " ");
      }

      let result = `**${rsn}'s XP Gains**\n\`\`\`swift\n`;
      result += `✚-------------------------------------------------✚
|     Skill     |  Today   | Yesterday | This Week |
|---------------|----------|-----------|-----------|
| Overall       |${daily[0]} |${yesterday[0]} |${weekly[0]} |
| Attack        |${daily[1]} |${yesterday[1]} |${weekly[1]} |
| Defence       |${daily[2]} |${yesterday[2]} |${weekly[2]} |
| Strength      |${daily[3]} |${yesterday[3]} |${weekly[3]} |
| Constitution  |${daily[4]} |${yesterday[4]} |${weekly[4]} |
| Ranged        |${daily[5]} |${yesterday[5]} |${weekly[5]} |
| Prayer        |${daily[6]} |${yesterday[6]} |${weekly[6]} |
| Magic         |${daily[7]} |${yesterday[7]} |${weekly[7]} |
| Cooking       |${daily[8]} |${yesterday[8]} |${weekly[8]} |
| Woodcutting   |${daily[9]} |${yesterday[9]} |${weekly[9]} |
| Fletching     |${daily[10]} |${yesterday[10]} |${weekly[10]} |
| Fishing       |${daily[11]} |${yesterday[11]} |${weekly[11]} |
| Firemaking    |${daily[12]} |${yesterday[12]} |${weekly[12]} |
| Crafting      |${daily[13]} |${yesterday[13]} |${weekly[13]} |
| Smithing      |${daily[14]} |${yesterday[14]} |${weekly[14]} |
| Mining        |${daily[15]} |${yesterday[15]} |${weekly[15]} |
| Herblore      |${daily[16]} |${yesterday[16]} |${weekly[16]} |
| Agility       |${daily[17]} |${yesterday[17]} |${weekly[17]} |
| Thieving      |${daily[18]} |${yesterday[18]} |${weekly[18]} |
| Slayer        |${daily[19]} |${yesterday[19]} |${weekly[19]} |
| Farming       |${daily[20]} |${yesterday[20]} |${weekly[20]} |
| Runecrafting  |${daily[21]} |${yesterday[21]} |${weekly[21]} |
| Hunter        |${daily[22]} |${yesterday[22]} |${weekly[22]} |
| Construction  |${daily[23]} |${yesterday[23]} |${weekly[23]} |
| Summoning     |${daily[24]} |${yesterday[24]} |${weekly[24]} |
| Dungeoneering |${daily[25]} |${yesterday[25]} |${weekly[25]} |
| Divination    |${daily[26]} |${yesterday[26]} |${weekly[26]} |
| Invention     |${daily[27]} |${yesterday[27]} |${weekly[27]} |
| Archaeology   |${daily[28]} |${yesterday[28]} |${weekly[28]} |
✚-------------------------------------------------✚
\`\`\``;

      interaction.reply({ content: result });

    }).catch(function (err) {
      interaction.reply({ embeds: [constants.runeClanError] });
      constants.logError({
        name: "RuneClan",
        message: "User not found/tracked",
      });
    });

  }
};