import { Injectable } from "@nestjs/common";
import { TicketsService } from "../tickets.service";

@Injectable()
export class TicketsEvents {
  constructor(private ticketsService: TicketsService) {}
}
