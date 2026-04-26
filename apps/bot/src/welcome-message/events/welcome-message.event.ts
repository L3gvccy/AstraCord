import { Injectable } from "@nestjs/common";
import { Context, type ContextOf, On } from "necord";
import { WelcomeMessageService } from "../welcome-message.service";

@Injectable()
export class WelcomeMessageEvent {
  constructor(private welcomeService: WelcomeMessageService) {}

  @On("guildMemberAdd")
  public async onGuildMemberAdd(@Context() [ctx]: ContextOf<"guildMemberAdd">) {
    return this.welcomeService.sendWelcomeMessage(ctx);
  }
}
