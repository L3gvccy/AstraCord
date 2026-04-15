import { Module } from "@nestjs/common";
import { GuildsService } from "./guilds.service";
import { GuildsController } from "./guilds.controller";
import { AuthService } from "../auth/auth.service";
import { PrismaModule } from "@astracord/database";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [GuildsController],
  providers: [GuildsService],
})
export class GuildsModule {}
