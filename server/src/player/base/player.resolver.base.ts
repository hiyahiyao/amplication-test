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
import { CreatePlayerArgs } from "./CreatePlayerArgs";
import { UpdatePlayerArgs } from "./UpdatePlayerArgs";
import { DeletePlayerArgs } from "./DeletePlayerArgs";
import { PlayerFindManyArgs } from "./PlayerFindManyArgs";
import { PlayerFindUniqueArgs } from "./PlayerFindUniqueArgs";
import { Player } from "./Player";
import { PositionFindManyArgs } from "../../position/base/PositionFindManyArgs";
import { Position } from "../../position/base/Position";
import { TeamFindManyArgs } from "../../team/base/TeamFindManyArgs";
import { Team } from "../../team/base/Team";
import { PlayerService } from "../player.service";

@graphql.Resolver(() => Player)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PlayerResolverBase {
  constructor(
    protected readonly service: PlayerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Player",
    action: "read",
    possession: "any",
  })
  async _playersMeta(
    @graphql.Args() args: PlayerFindManyArgs
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

  @graphql.Query(() => [Player])
  @nestAccessControl.UseRoles({
    resource: "Player",
    action: "read",
    possession: "any",
  })
  async players(
    @graphql.Args() args: PlayerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Player",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Player, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Player",
    action: "read",
    possession: "own",
  })
  async player(
    @graphql.Args() args: PlayerFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Player",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Player)
  @nestAccessControl.UseRoles({
    resource: "Player",
    action: "create",
    possession: "any",
  })
  async createPlayer(
    @graphql.Args() args: CreatePlayerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Player",
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
        `providing the properties: ${properties} on ${"Player"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Player)
  @nestAccessControl.UseRoles({
    resource: "Player",
    action: "update",
    possession: "any",
  })
  async updatePlayer(
    @graphql.Args() args: UpdatePlayerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Player",
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
        `providing the properties: ${properties} on ${"Player"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Player)
  @nestAccessControl.UseRoles({
    resource: "Player",
    action: "delete",
    possession: "any",
  })
  async deletePlayer(
    @graphql.Args() args: DeletePlayerArgs
  ): Promise<Player | null> {
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

  @graphql.ResolveField(() => [Position])
  @nestAccessControl.UseRoles({
    resource: "Player",
    action: "read",
    possession: "any",
  })
  async positions(
    @graphql.Parent() parent: Player,
    @graphql.Args() args: PositionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Position[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Position",
    });
    const results = await this.service.findPositions(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => [Team])
  @nestAccessControl.UseRoles({
    resource: "Player",
    action: "read",
    possession: "any",
  })
  async teams(
    @graphql.Parent() parent: Player,
    @graphql.Args() args: TeamFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findTeams(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
