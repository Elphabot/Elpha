const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("choose")
    .setDescription("Elpha will choose for you!")
    .addSubcommand(subcommand => subcommand.setName("choices").setDescription('choice').addStringOption(option => option.setName('1st').setDescription('Enter 1st choice').setRequired(true)).addStringOption(option => option.setName('2nd').setDescription('Enter 2nd choice').setRequired(true))),
    async execute(interaction){
        let choose = [
            interaction.options.getString('1st'),
            interaction.options.getString('2nd'),
        ]
        let index = (Math.floor(Math.random() * Math.floor(choose.length)))
        const embed = new Discord.MessageEmbed()
        .setColor('00FFFF')
        .setTitle('I choose' + ' ' + choose[index])
        .addFields(
            {name: 'First choice', value: `${interaction.options.getString('1st')}`},
            {name:'Second choice' ,value: `${interaction.options.getString('2nd')}`}
        )
        .setFooter({text: `Choosed for ${interaction.user.username}`})
        interaction.reply({embeds: [embed]})
    }
}