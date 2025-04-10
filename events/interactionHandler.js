module.exports.interactionHandler = async (interaction, client) => {    
    // console.log('interactionHandler interaction:', interaction);
    // For dropdown menu
    if (interaction.isStringSelectMenu() && interaction.customId === 'role-selector') {
        // Define guild and member variables
        const guild = interaction.guild;
        const member = interaction.member;
        
        // Remove all class roles first
        const roles = ['Adventurer', 'Guardian', 'Magic wielder'];
        for (const roleName of roles) {
            const role = guild.roles.cache.find(r => r.name === roleName);
            if (role && member.roles.cache.has(role.id)) {
                await member.roles.remove(role);
            }
        }
        
        // Add all selected roles
        if (interaction.values.length > 0) {
            const selectedRoleNames = [];
            
            for (const roleName of interaction.values) {
                const role = guild.roles.cache.find(r => r.name === roleName);
                if (role) {
                    await member.roles.add(role);
                    selectedRoleNames.push(roleName);
                }
            }
            
            // Create a nicely formatted list of selected classes
            const rolesText = selectedRoleNames.length > 1 
                ? `${selectedRoleNames.slice(0, -1).join(', ')} and ${selectedRoleNames.slice(-1)}` 
                : selectedRoleNames[0];
                
            await interaction.reply({ 
                content: `You have chosen: ${rolesText}!`, 
                flags: 64 
            });
        } else {
            await interaction.reply({ 
                content: `You have removed your class roles.`, 
                flags: 64 
            });
        }
    }
    
    // For buttons
    if (interaction.isButton) console.log('Button interaction:', interaction.customId);
    if (interaction.isButton() && interaction.customId.startsWith('role-')) {
        const roleName = interaction.customId === 'role-adventurer' ? 'Adventurer' :
                        interaction.customId === 'role-guardian' ? 'Guardian' :
                        interaction.customId === 'role-mage' ? 'Magic wielder' : null;
        
        if (!roleName) return;
        
        const role = guild.roles.cache.find(r => r.name === roleName);
        const hasRole = member.roles.cache.has(role.id);
        
        if (hasRole) {
            await member.roles.remove(role);
            await interaction.reply({ 
                content: `You are no longer a ${roleName}.`, 
                flags: 64 
            });
        } else {
            // Remove other class roles first
            const roles = ['Adventurer', 'Guardian', 'Magic wielder'];
            for (const r of roles) {
                const classRole = guild.roles.cache.find(role => role.name === r);
                if (classRole && member.roles.cache.has(classRole.id)) {
                    await member.roles.remove(classRole);
                }
            }
            
            await member.roles.add(role);
            await interaction.reply({ 
                content: `You have chosen: ${roleName}!`, 
                flags: 64 
            });
        }
    }

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		const errorMessage = 'There was an error while executing this command!';
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: errorMessage, flags: 64 });
		}
		else {
			await interaction.reply({ content: errorMessage, flags: 64 });
		}
	}
}

