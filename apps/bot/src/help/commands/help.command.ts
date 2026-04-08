import { Injectable } from "@nestjs/common";
import { Context, SlashCommand, type SlashCommandContext } from "necord";
import { HelpService } from "../help.service";

@Injectable()
export class HelpCommand {
  constructor(private helpService: HelpService) {}

  @SlashCommand({ name: "help", description: "Show all available commands" })
  public async onHelp(@Context() [interaction]: SlashCommandContext) {
    await interaction.deferReply({ ephemeral: true });
    const embed = this.helpService.createHelpEmbed();

    await interaction.editReply({ embeds: [embed] });
  }
}
