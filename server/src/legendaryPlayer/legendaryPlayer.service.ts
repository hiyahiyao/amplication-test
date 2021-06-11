import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { LegendaryPlayerServiceBase } from "./base/legendaryPlayer.service.base";

@Injectable()
export class LegendaryPlayerService extends LegendaryPlayerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
