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
import { CreateMatchArgs } from "./CreateMatchArgs";
import { UpdateMatchArgs } from "./UpdateMatchArgs";
import { DeleteMatchArgs } from "./DeleteMatchArgs";
import { MatchFindManyArgs } from "./MatchFindManyArgs";
import { MatchFindUniqueArgs } from "./MatchFindUniqueArgs";
import { Match } from "./Match";
import { CompositionFindManyArgs } from "../../composition/base/CompositionFindManyArgs";
import { Composition } from "../../composition/base/Composition";
import { MatchService } from "../match.service";

@graphql.Resolver(() => Match)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class MatchResolverBase {
  constructor(
    protected readonly service: MatchService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "read",
    possession: "any",
  })
  async _matchesMeta(
    @graphql.Args() args: MatchFindManyArgs
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

  @graphql.Query(() => [Match])
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "read",
    possession: "any",
  })
  async matches(
    @graphql.Args() args: MatchFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Match[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Match",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Match, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "read",
    possession: "own",
  })
  async match(
    @graphql.Args() args: MatchFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Match | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Match",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Match)
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "create",
    possession: "any",
  })
  async createMatch(
    @graphql.Args() args: CreateMatchArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Match> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Match",
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
        `providing the properties: ${properties} on ${"Match"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Match)
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "update",
    possession: "any",
  })
  async updateMatch(
    @graphql.Args() args: UpdateMatchArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Match | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Match",
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
        `providing the properties: ${properties} on ${"Match"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Match)
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "delete",
    possession: "any",
  })
  async deleteMatch(
    @graphql.Args() args: DeleteMatchArgs
  ): Promise<Match | null> {
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
    resource: "Match",
    action: "read",
    possession: "any",
  })
  async compositions(
    @graphql.Parent() parent: Match,
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
}
