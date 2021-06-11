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
import { CreateCompositionArgs } from "./CreateCompositionArgs";
import { UpdateCompositionArgs } from "./UpdateCompositionArgs";
import { DeleteCompositionArgs } from "./DeleteCompositionArgs";
import { CompositionFindManyArgs } from "./CompositionFindManyArgs";
import { CompositionFindUniqueArgs } from "./CompositionFindUniqueArgs";
import { Composition } from "./Composition";
import { PositionFindManyArgs } from "../../position/base/PositionFindManyArgs";
import { Position } from "../../position/base/Position";
import { Match } from "../../match/base/Match";
import { Team } from "../../team/base/Team";
import { User } from "../../user/base/User";
import { CompositionService } from "../composition.service";

@graphql.Resolver(() => Composition)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CompositionResolverBase {
  constructor(
    protected readonly service: CompositionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Composition",
    action: "read",
    possession: "any",
  })
  async _compositionsMeta(
    @graphql.Args() args: CompositionFindManyArgs
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

  @graphql.Query(() => [Composition])
  @nestAccessControl.UseRoles({
    resource: "Composition",
    action: "read",
    possession: "any",
  })
  async compositions(
    @graphql.Args() args: CompositionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Composition[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Composition",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Composition, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Composition",
    action: "read",
    possession: "own",
  })
  async composition(
    @graphql.Args() args: CompositionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Composition | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Composition",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Composition)
  @nestAccessControl.UseRoles({
    resource: "Composition",
    action: "create",
    possession: "any",
  })
  async createComposition(
    @graphql.Args() args: CreateCompositionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Composition> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Composition",
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
        `providing the properties: ${properties} on ${"Composition"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        match: {
          connect: args.data.match,
        },

        team: {
          connect: args.data.team,
        },

        user: {
          connect: args.data.user,
        },
      },
    });
  }

  @graphql.Mutation(() => Composition)
  @nestAccessControl.UseRoles({
    resource: "Composition",
    action: "update",
    possession: "any",
  })
  async updateComposition(
    @graphql.Args() args: UpdateCompositionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Composition | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Composition",
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
        `providing the properties: ${properties} on ${"Composition"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          match: {
            connect: args.data.match,
          },

          team: {
            connect: args.data.team,
          },

          user: {
            connect: args.data.user,
          },
        },
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

  @graphql.Mutation(() => Composition)
  @nestAccessControl.UseRoles({
    resource: "Composition",
    action: "delete",
    possession: "any",
  })
  async deleteComposition(
    @graphql.Args() args: DeleteCompositionArgs
  ): Promise<Composition | null> {
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
    resource: "Composition",
    action: "read",
    possession: "any",
  })
  async position(
    @graphql.Parent() parent: Composition,
    @graphql.Args() args: PositionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Position[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Position",
    });
    const results = await this.service.findPosition(parent.id, args);

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Match, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Composition",
    action: "read",
    possession: "any",
  })
  async match(
    @graphql.Parent() parent: Composition,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Match | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Match",
    });
    const result = await this.service.getMatch(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Team, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Composition",
    action: "read",
    possession: "any",
  })
  async team(
    @graphql.Parent() parent: Composition,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Team | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const result = await this.service.getTeam(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Composition",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Composition,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
