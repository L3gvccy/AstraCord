import { Module } from "@nestjs/common";
import { HelpService } from "./help.service";
import { HelpCommand } from "./commands/help.command";

@Module({
  providers: [HelpService, HelpCommand],
})
export class HelpModule {}
