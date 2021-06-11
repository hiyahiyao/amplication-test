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
import { CreatePositionArgs } from "./CreatePositionArgs";
import { UpdatePositionArgs } from "./UpdatePositionArgs";
import { DeletePositionArgs } from "./DeletePositionArgs";
import { PositionFindManyArgs } from "./PositionFindManyArgs";
import { PositionFindUniqueArgs } from "./PositionFindUniqueArgs";
import { Position } from "./Position";
import { Composition } from "../../composition/base/Composition";
import { Player } from "../../player/base/Player";
import { PositionService } from "../position.service";

@graphql.Resolver(() => Position)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PositionResolverBase {
  constructor(
    protected readonly service: PositionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "read",
    possession: "any",
  })
  async _positionsMeta(
    @graphql.Args() args: PositionFindManyArgs
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

  @graphql.Query(() => [Position])
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "read",
    possession: "any",
  })
  async positions(
    @graphql.Args() args: PositionFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Position[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Position",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Position, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "read",
    possession: "own",
  })
  async position(
    @graphql.Args() args: PositionFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Position | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Position",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Position)
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "create",
    possession: "any",
  })
  async createPosition(
    @graphql.Args() args: CreatePositionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Position> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Position",
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
        `providing the properties: ${properties} on ${"Position"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        compositions: args.data.compositions
          ? {
              connect: args.data.compositions,
            }
          : undefined,

        player: {
          connect: args.data.player,
        },
      },
    });
  }

  @graphql.Mutation(() => Position)
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "update",
    possession: "any",
  })
  async updatePosition(
    @graphql.Args() args: UpdatePositionArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Position | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Position",
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
        `providing the properties: ${properties} on ${"Position"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          compositions: args.data.compositions
            ? {
                connect: args.data.compositions,
              }
            : undefined,

          player: {
            connect: args.data.player,
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

  @graphql.Mutation(() => Position)
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "delete",
    possession: "any",
  })
  async deletePosition(
    @graphql.Args() args: DeletePositionArgs
  ): Promise<Position | null> {
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

  @graphql.ResolveField(() => Composition, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "read",
    possession: "any",
  })
  async compositions(
    @graphql.Parent() parent: Position,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Composition | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Composition",
    });
    const result = await this.service.getCompositions(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => Player, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "read",
    possession: "any",
  })
  async player(
    @graphql.Parent() parent: Position,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Player | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Player",
    });
    const result = await this.service.getPlayer(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
