import { PrismaService } from "nestjs-prisma";
import { Prisma, Composition, Position, Match, User } from "@prisma/client";

export class CompositionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.CompositionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionFindManyArgs>
  ): Promise<number> {
    return this.prisma.composition.count(args);
  }

  async findMany<T extends Prisma.CompositionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionFindManyArgs>
  ): Promise<Composition[]> {
    return this.prisma.composition.findMany(args);
  }
  async findOne<T extends Prisma.CompositionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionFindUniqueArgs>
  ): Promise<Composition | null> {
    return this.prisma.composition.findUnique(args);
  }
  async create<T extends Prisma.CompositionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionCreateArgs>
  ): Promise<Composition> {
    return this.prisma.composition.create<T>(args);
  }
  async update<T extends Prisma.CompositionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionUpdateArgs>
  ): Promise<Composition> {
    return this.prisma.composition.update<T>(args);
  }
  async delete<T extends Prisma.CompositionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.CompositionDeleteArgs>
  ): Promise<Composition> {
    return this.prisma.composition.delete(args);
  }

  async findPositions(
    parentId: string,
    args: Prisma.PositionFindManyArgs
  ): Promise<Position[]> {
    return this.prisma.composition
      .findUnique({
        where: { id: parentId },
      })
      .positions(args);
  }

  async getMatch(parentId: string): Promise<Match | null> {
    return this.prisma.composition
      .findUnique({
        where: { id: parentId },
      })
      .match();
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.composition
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
