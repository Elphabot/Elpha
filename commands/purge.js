const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const Modlog = require("../models/Modlog")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge some messages')
        .addIntegerOption(option =>
            option.setName('messages')
                .setDescription('Number of messages to purge')
                .setRequired(true)
        ),
    async execute(interaction) {
      const modlog = await Modlog.findOne({guild_id: interaction.guild.id})
      const args = interaction.options.getInteger('messages')
      
      if (interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || interaction.guild.members.cache.get(interaction.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) || interaction.user.id === process.env.OWNER) {
        let range = Math.floor(args / 100)

        let i = 0
        for (i = 1; i <= range; i++) {
          interaction.channel.bulkDelete(100).catch(() => interaction.reply('Bots can only purge messages that are less than 14 days old. This error could be caused by DiscordAPI Overload'))
        }
        let rest = args - range * 100;
        
        interaction.channel.bulkDelete(rest).catch(() => interaction.reply('Bots can only purge messages that are less than 14 days old. This error could be caused by DiscordAPI Overload'))
        
        interaction.reply({ content: 'Done!', ephemeral: true })
        if (!modlog) {
          return
        } else {
          const abc = interaction.guild.channels.cache.get(modlog.modlog_channel_id)
          abc.send(`${interaction.options.getInteger('messages')} messages deleted by ${interaction.user} in ${interaction.channel}`)	
        }
        } else {
            interaction.reply('Insufficant Permissions')
        }
    }
}
