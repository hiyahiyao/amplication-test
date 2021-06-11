import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CompositionServiceBase } from "./base/composition.service.base";

@Injectable()
export class CompositionService extends CompositionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
