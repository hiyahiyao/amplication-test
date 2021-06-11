import { PrismaService } from "nestjs-prisma";
import { Prisma, Position, Composition, Player } from "@prisma/client";

export class PositionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PositionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PositionFindManyArgs>
  ): Promise<number> {
    return this.prisma.position.count(args);
  }

  async findMany<T extends Prisma.PositionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PositionFindManyArgs>
  ): Promise<Position[]> {
    return this.prisma.position.findMany(args);
  }
  async findOne<T extends Prisma.PositionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PositionFindUniqueArgs>
  ): Promise<Position | null> {
    return this.prisma.position.findUnique(args);
  }
  async create<T extends Prisma.PositionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PositionCreateArgs>
  ): Promise<Position> {
    return this.prisma.position.create<T>(args);
  }
  async update<T extends Prisma.PositionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PositionUpdateArgs>
  ): Promise<Position> {
    return this.prisma.position.update<T>(args);
  }
  async delete<T extends Prisma.PositionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PositionDeleteArgs>
  ): Promise<Position> {
    return this.prisma.position.delete(args);
  }

  async findCompositions(
    parentId: string,
    args: Prisma.CompositionFindManyArgs
  ): Promise<Composition[]> {
    return this.prisma.position
      .findUnique({
        where: { id: parentId },
      })
      .compositions(args);
  }

  async findPlayer(
    parentId: string,
    args: Prisma.PlayerFindManyArgs
  ): Promise<Player[]> {
    return this.prisma.position
      .findUnique({
        where: { id: parentId },
      })
      .player(args);
  }
}
