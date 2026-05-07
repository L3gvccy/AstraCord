import { Module } from "@nestjs/common";
import { JtcService } from "./jtc.service";
import { PrismaModule } from "@astracord/database";
import { JtcEvents } from "./events/jtc.events";

@Module({
  imports: [PrismaModule],
  providers: [JtcService, JtcEvents],
})
export class JtcModule {}
