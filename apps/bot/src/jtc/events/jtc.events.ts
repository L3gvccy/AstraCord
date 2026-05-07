import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";
import { Context, type ContextOf, On } from "necord";
import { JtcService } from "../jtc.service";

@Injectable()
export class JtcEvents {
  constructor(private jtcService: JtcService) {}

  @On("voiceStateUpdate")
  public async handleJtc(@Context() ctx: ContextOf<"voiceStateUpdate">) {
    const [oldState, newState] = ctx;

    await this.jtcService.handleJtcEvent(oldState, newState);
  }
}
