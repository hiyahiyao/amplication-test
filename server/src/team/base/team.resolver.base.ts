import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateTeamArgs } from "./CreateTeamArgs";
import { UpdateTeamArgs } from "./UpdateTeamArgs";
import { DeleteTeamArgs } from "./DeleteTeamArgs";
import { TeamFindManyArgs } from "./TeamFindManyArgs";
import { TeamFindUniqueArgs } from "./TeamFindUniqueArgs";
import { Team } from "./Team";
import { CompositionFindManyArgs } from "../../composition/base/CompositionFindManyArgs";
import { Composition } from "../../composition/base/Composition";
import { LegendaryPlayerFindManyArgs } from "../../legendaryPlayer/base/LegendaryPlayerFindManyArgs";
import { LegendaryPlayer } from "../../legendaryPlayer/base/LegendaryPlayer";
import { MatchFindManyArgs } from "../../match/base/MatchFindManyArgs";
import { Match } from "../../match/base/Match";
import { PlayerFindManyArgs } from "../../player/base/PlayerFindManyArgs";
import { Player } from "../../player/base/Player";
import { TeamService } from "../team.service";

@graphql.Resolver(() => Team)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class TeamResolverBase {
  constructor(
    protected readonly service: TeamService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async _teamsMeta(
    @graphql.Args() args: TeamFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Team])
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async teams(
    @graphql.Args() args: TeamFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Team, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "own",
  })
  async team(
    @graphql.Args() args: TeamFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Team",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Team)
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "create",
    possession: "any",
  })
  async createTeam(
    @graphql.Args() args: CreateTeamArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Team",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Team"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Team)
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "update",
    possession: "any",
  })
  async updateTeam(
    @graphql.Args() args: UpdateTeamArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Team",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Team"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Team)
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "delete",
    possession: "any",
  })
  async deleteTeam(@graphql.Args() args: DeleteTeamArgs): Promise<Team | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [Composition])
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async compositions(
    @graphql.Parent() parent: Team,
    @graphql.Args() args: CompositionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Composition[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Composition",
    });
    const results = await this.service.findCompositions(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [LegendaryPlayer])
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async legendaryPlayers(
    @graphql.Parent() parent: Team,
    @graphql.Args() args: LegendaryPlayerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LegendaryPlayer[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LegendaryPlayer",
    });
    const results = await this.service.findLegendaryPlayers(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Match])
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async matchesAsAway(
    @graphql.Parent() parent: Team,
    @graphql.Args() args: MatchFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Match[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Match",
    });
    const results = await this.service.findMatchesAsAway(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Match])
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async matchesAsHome(
    @graphql.Parent() parent: Team,
    @graphql.Args() args: MatchFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Match[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Match",
    });
    const results = await this.service.findMatchesAsHome(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Player])
  @nestAccessControl.UseRoles({
    resource: "Team",
    action: "read",
    possession: "any",
  })
  async players(
    @graphql.Parent() parent: Team,
    @graphql.Args() args: PlayerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Player",
    });
    const results = await this.service.findPlayers(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
