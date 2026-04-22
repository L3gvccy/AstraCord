import { Module } from "@nestjs/common";
import { WelcomeMessageService } from "./welcome-message.service";
import { WelcomeMessageController } from "./welcome-message.controller";
import { PrismaModule } from "@astracord/database";

@Module({
  imports: [PrismaModule],
  controllers: [WelcomeMessageController],
  providers: [WelcomeMessageService],
})
export class WelcomeMessageModule {}
