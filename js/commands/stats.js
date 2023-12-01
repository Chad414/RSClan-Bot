const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const userstore = require("../userstore");
const xptable = require("../xptable");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription(`Displays user\'s account levels and experience points`)
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
    }

    await rp(`https://apps.runescape.com/runemetrics/profile/profile?user=${rsn}&activities=10`).then(function (json) {
      const data = JSON.parse(json);

      if (data.error == 'PROFILE_PRIVATE') {
        console.log(`\t∟ RuneMetrics Profile is Private`)
        interaction.reply({ embeds: [constants.privateProfile] });
        return;
      } else if (data.error == 'NO_PROFILE') {
        console.log(`\t∟ RuneMetrics Unavailable`)
        interaction.reply({ embeds: [constants.runeMetricsUnavailable] });
        return;
      }

      let nf = new Intl.NumberFormat();

      let totalSkill = data.totalskill.toString();
      let totalExperience = data.totalxp.toString();

      let levels = [];
      let exp = [];
      for (let i = 0; i < data.skillvalues.length; i++) {
        let skill = data.skillvalues[i];
        let virtualLevel = (constants.nonVirtualSkillIDs.includes(skill.id)) ? `` : xptable.virtualLevelForXP(Math.floor(skill.xp / 10));
        levels[skill.id] = `${skill.level.toString()}${virtualLevel}`;
        exp[skill.id] = skill.xp.toString();
      }

      // Format Labels
      for (let i = 0; i < levels.length; i++) {
        levels[i] = levels[i].replace(/\s+/g, '');
        levels[i] = _.padStart(levels[i], 9, " ");

        exp[i] = exp[i].slice(0, -1);
        exp[i] = nf.format(exp[i]);
        exp[i] = exp[i].replace(/\s+/g, '');
        exp[i] = _.padStart(exp[i], 13, " ");
      }

      totalSkill = totalSkill.replace(/\s+/g, '');
      totalSkill = _.padStart(totalSkill, 9, " ");

      totalExperience = nf.format(totalExperience);
      totalExperience = totalExperience.replace(/\s+/g, '');
      totalExperience = _.padStart(totalExperience, 13, " ");

      let result = `**${data.name}'s Stats**\n\`\`\`swift\n`;
      result += `✚-----------------------------------------✚
|     Skill     | Level    |   Experience  |
|---------------|----------|---------------|
| Overall       |${totalSkill} | ${totalExperience} |
| Attack        |${levels[0]} | ${exp[0]} |
| Defence       |${levels[1]} | ${exp[1]} |
| Strength      |${levels[2]} | ${exp[2]} |
| Constitution  |${levels[3]} | ${exp[3]} |
| Ranged        |${levels[4]} | ${exp[4]} |
| Prayer        |${levels[5]} | ${exp[5]} |
| Magic         |${levels[6]} | ${exp[6]} |
| Cooking       |${levels[7]} | ${exp[7]} |
| Woodcutting   |${levels[8]} | ${exp[8]} |
| Fletching     |${levels[9]} | ${exp[9]} |
| Fishing       |${levels[10]} | ${exp[10]} |
| Firemaking    |${levels[11]} | ${exp[11]} |
| Crafting      |${levels[12]} | ${exp[12]} |
| Smithing      |${levels[13]} | ${exp[13]} |
| Mining        |${levels[14]} | ${exp[14]} |
| Herblore      |${levels[15]} | ${exp[15]} |
| Agility       |${levels[16]} | ${exp[16]} |
| Thieving      |${levels[17]} | ${exp[17]} |
| Slayer        |${levels[18]} | ${exp[18]} |
| Farming       |${levels[19]} | ${exp[19]} |
| Runecrafting  |${levels[20]} | ${exp[20]} |
| Hunter        |${levels[21]} | ${exp[21]} |
| Construction  |${levels[22]} | ${exp[22]} |
| Summoning     |${levels[23]} | ${exp[23]} |
| Dungeoneering |${levels[24]} | ${exp[24]} |
| Divination    |${levels[25]} | ${exp[25]} |
| Invention     |${levels[26]} | ${exp[26]} |
| Archaeology   |${levels[27]} | ${exp[27]} |
| Necromancy    |${levels[28]} | ${exp[28]} |
✚-----------------------------------------✚
\`\`\``;

      interaction.reply({ content: result });

    }).catch(function (err) {
      constants.logError({
        name: "RuneMetrics: Stats",
        message: "RuneMetrics Command Error" + err,
      });
    });

  }
};