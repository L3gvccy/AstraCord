import { Injectable } from "@nestjs/common";
import { TicketsService } from "../tickets.service";
import {
  Context,
  SelectedStrings,
  StringSelect,
  type StringSelectContext,
} from "necord";

@Injectable()
export class TicketsEvents {
  constructor(private ticketsService: TicketsService) {}

  @StringSelect("CREATE_TICKET_SELECT")
  async onCreateTicketSelect(
    @Context() [interaction]: StringSelectContext,
    @SelectedStrings() selectedStrings: string[],
  ) {
    return await this.ticketsService.createTicket(
      interaction,
      selectedStrings[0],
    );
  }
}
