import { TicketOption } from "../types/tickets";

export interface TicketConfigDto {
  id: string;
  guildId: string;
  isEnabled: boolean;
  title: string;
  description: string;
  color: string;
  thumbnailImageUrl?: string | null;
  imageUrl?: string | null;
  channelId?: string | null;
  messageId?: string | null;

  categoryId?: string | null;

  options?: TicketOption[];

  createdAt?: Date;
  updatedAt?: Date;
}
