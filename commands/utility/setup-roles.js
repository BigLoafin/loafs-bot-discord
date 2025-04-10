const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-roles')
        .setDescription('Creates the roles selection dropdown')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('Channel to send the role selector to')
                .setRequired(true)),
    
    async execute(interaction) {
		if (interaction.user.id !== interaction.guild.ownerId) {
			return await interaction.reply({ content: "You don't have permission to use this command!", flags: 64 });
		}
        const channel = interaction.options.getChannel('channel');
        
        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('Choose Your Roles')
            .setDescription('Select your roles from the dropdown menu below!')
            .addFields(
                { name: 'Adventurer 🧭', value: 'Jack of all trades, master of none. Balanced stats and versatile abilities.' },
                { name: 'Guardian 🤺', value: 'Tank role with high defense. Protects allies and controls the battlefield.' },
                { name: 'Magic Wielder 🧙', value: 'Powerful spellcaster with devastating area attacks but lower defense.' }
            )
            .setFooter({ text: 'You can select multiple roles or change them at any time' });
            
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('role-selector')
                    .setPlaceholder('Select your roles')
                    .setMinValues(0)
                    .setMaxValues(3)
                    .addOptions([
                        {
							label: 'Adventurer',
							description: 'Balanced and versatile',
							value: 'Adventurer',
							emoji: '🧭'  // or ⚔️ 🧗
						},
                        {
                            label: 'Guardian',
                            description: 'High defense, battlefield control',
                            value: 'Guardian',
                            emoji: '🤺'
                        },
                        {
                            label: 'Magic Wielder',
                            description: 'Powerful spells, lower defense',
                            value: 'Magic wielder',
                            emoji: '🧙'
                        }
                    ])
            );
            
        await channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: 'role selector created!', flags: 64 });
    }
};