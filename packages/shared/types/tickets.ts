export type TicketConfig = {
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
};

export type TicketOption = {
  id?: string | undefined;
  ticketConfigId?: string;
  guildId?: string;

  position: number;

  optionEmoji: string;
  optionText: string;
  optionDescription?: string | null;

  isEmbed: boolean;

  title?: string;
  message: string;
  color: string;
  thumbnailImageUrl?: string | null;
  imageUrl?: string | null;

  roles: TicketOptionRole[];

  createdAt?: Date;
  updatedAt?: Date;
};

export type TicketOptionRole = {
  id?: string | null;
  ticketOptionId: string;
  roleId: string;

  createdAt?: Date;
  updatedAt?: Date;
};
