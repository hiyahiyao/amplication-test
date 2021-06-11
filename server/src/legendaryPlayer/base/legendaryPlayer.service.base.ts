import { PrismaService } from "nestjs-prisma";
import { Prisma, LegendaryPlayer, Team } from "@prisma/client";

export class LegendaryPlayerServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.LegendaryPlayerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.LegendaryPlayerFindManyArgs>
  ): Promise<number> {
    return this.prisma.legendaryPlayer.count(args);
  }

  async findMany<T extends Prisma.LegendaryPlayerFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.LegendaryPlayerFindManyArgs>
  ): Promise<LegendaryPlayer[]> {
    return this.prisma.legendaryPlayer.findMany(args);
  }
  async findOne<T extends Prisma.LegendaryPlayerFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.LegendaryPlayerFindUniqueArgs>
  ): Promise<LegendaryPlayer | null> {
    return this.prisma.legendaryPlayer.findUnique(args);
  }
  async create<T extends Prisma.LegendaryPlayerCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LegendaryPlayerCreateArgs>
  ): Promise<LegendaryPlayer> {
    return this.prisma.legendaryPlayer.create<T>(args);
  }
  async update<T extends Prisma.LegendaryPlayerUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.LegendaryPlayerUpdateArgs>
  ): Promise<LegendaryPlayer> {
    return this.prisma.legendaryPlayer.update<T>(args);
  }
  async delete<T extends Prisma.LegendaryPlayerDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.LegendaryPlayerDeleteArgs>
  ): Promise<LegendaryPlayer> {
    return this.prisma.legendaryPlayer.delete(args);
  }

  async findTeam(
    parentId: string,
    args: Prisma.TeamFindManyArgs
  ): Promise<Team[]> {
    return this.prisma.legendaryPlayer
      .findUnique({
        where: { id: parentId },
      })
      .team(args);
  }
}
