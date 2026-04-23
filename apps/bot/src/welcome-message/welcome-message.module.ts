import { Module } from "@nestjs/common";
import { WelcomeMessageService } from "./welcome-message.service";
import { WelcomeMessageEvent } from "./events/welcome-message.event";
import { PrismaModule } from "@astracord/database";

@Module({
  imports: [PrismaModule],
  providers: [WelcomeMessageService, WelcomeMessageEvent],
})
export class WelcomeMessageModule {}
