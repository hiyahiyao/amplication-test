import { PrismaService } from "nestjs-prisma";
import { Prisma, Team, LegendaryPlayer, User } from "@prisma/client";

export class TeamServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TeamFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamFindManyArgs>
  ): Promise<number> {
    return this.prisma.team.count(args);
  }

  async findMany<T extends Prisma.TeamFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamFindManyArgs>
  ): Promise<Team[]> {
    return this.prisma.team.findMany(args);
  }
  async findOne<T extends Prisma.TeamFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamFindUniqueArgs>
  ): Promise<Team | null> {
    return this.prisma.team.findUnique(args);
  }
  async create<T extends Prisma.TeamCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamCreateArgs>
  ): Promise<Team> {
    return this.prisma.team.create<T>(args);
  }
  async update<T extends Prisma.TeamUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamUpdateArgs>
  ): Promise<Team> {
    return this.prisma.team.update<T>(args);
  }
  async delete<T extends Prisma.TeamDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeamDeleteArgs>
  ): Promise<Team> {
    return this.prisma.team.delete(args);
  }

  async findLegendaryPlayers(
    parentId: string,
    args: Prisma.LegendaryPlayerFindManyArgs
  ): Promise<LegendaryPlayer[]> {
    return this.prisma.team
      .findUnique({
        where: { id: parentId },
      })
      .legendaryPlayers(args);
  }

  async findUsers(
    parentId: string,
    args: Prisma.UserFindManyArgs
  ): Promise<User[]> {
    return this.prisma.team
      .findUnique({
        where: { id: parentId },
      })
      .users(args);
  }
}
