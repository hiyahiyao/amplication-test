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
import { CreateLegendaryPlayerArgs } from "./CreateLegendaryPlayerArgs";
import { UpdateLegendaryPlayerArgs } from "./UpdateLegendaryPlayerArgs";
import { DeleteLegendaryPlayerArgs } from "./DeleteLegendaryPlayerArgs";
import { LegendaryPlayerFindManyArgs } from "./LegendaryPlayerFindManyArgs";
import { LegendaryPlayerFindUniqueArgs } from "./LegendaryPlayerFindUniqueArgs";
import { LegendaryPlayer } from "./LegendaryPlayer";
import { TeamFindManyArgs } from "../../team/base/TeamFindManyArgs";
import { Team } from "../../team/base/Team";
import { LegendaryPlayerService } from "../legendaryPlayer.service";

@graphql.Resolver(() => LegendaryPlayer)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LegendaryPlayerResolverBase {
  constructor(
    protected readonly service: LegendaryPlayerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "read",
    possession: "any",
  })
  async _legendaryPlayersMeta(
    @graphql.Args() args: LegendaryPlayerFindManyArgs
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

  @graphql.Query(() => [LegendaryPlayer])
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "read",
    possession: "any",
  })
  async legendaryPlayers(
    @graphql.Args() args: LegendaryPlayerFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LegendaryPlayer[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LegendaryPlayer",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => LegendaryPlayer, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "read",
    possession: "own",
  })
  async legendaryPlayer(
    @graphql.Args() args: LegendaryPlayerFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LegendaryPlayer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "LegendaryPlayer",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => LegendaryPlayer)
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "create",
    possession: "any",
  })
  async createLegendaryPlayer(
    @graphql.Args() args: CreateLegendaryPlayerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LegendaryPlayer> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "LegendaryPlayer",
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
        `providing the properties: ${properties} on ${"LegendaryPlayer"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => LegendaryPlayer)
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "update",
    possession: "any",
  })
  async updateLegendaryPlayer(
    @graphql.Args() args: UpdateLegendaryPlayerArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<LegendaryPlayer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LegendaryPlayer",
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
        `providing the properties: ${properties} on ${"LegendaryPlayer"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => LegendaryPlayer)
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "delete",
    possession: "any",
  })
  async deleteLegendaryPlayer(
    @graphql.Args() args: DeleteLegendaryPlayerArgs
  ): Promise<LegendaryPlayer | null> {
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

  @graphql.ResolveField(() => [Team])
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "read",
    possession: "any",
  })
  async team(
    @graphql.Parent() parent: LegendaryPlayer,
    @graphql.Args() args: TeamFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findTeam(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }
}
