import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
}
