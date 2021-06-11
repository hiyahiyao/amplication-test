import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { LegendaryPlayerService } from "../legendaryPlayer.service";
import { LegendaryPlayerCreateInput } from "./LegendaryPlayerCreateInput";
import { LegendaryPlayerWhereInput } from "./LegendaryPlayerWhereInput";
import { LegendaryPlayerWhereUniqueInput } from "./LegendaryPlayerWhereUniqueInput";
import { LegendaryPlayerFindManyArgs } from "./LegendaryPlayerFindManyArgs";
import { LegendaryPlayerUpdateInput } from "./LegendaryPlayerUpdateInput";
import { LegendaryPlayer } from "./LegendaryPlayer";
import { TeamWhereInput } from "../../team/base/TeamWhereInput";
import { Team } from "../../team/base/Team";

export class LegendaryPlayerControllerBase {
  constructor(
    protected readonly service: LegendaryPlayerService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: LegendaryPlayer })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: LegendaryPlayerCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LegendaryPlayer> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "LegendaryPlayer",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"LegendaryPlayer"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [LegendaryPlayer] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => LegendaryPlayerFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LegendaryPlayer[]> {
    const args = plainToClass(LegendaryPlayerFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "LegendaryPlayer",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: LegendaryPlayer })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: LegendaryPlayerWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LegendaryPlayer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "LegendaryPlayer",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: LegendaryPlayer })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: LegendaryPlayerWhereUniqueInput,
    @common.Body()
    data: LegendaryPlayerUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<LegendaryPlayer | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LegendaryPlayer",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"LegendaryPlayer"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: LegendaryPlayer })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: LegendaryPlayerWhereUniqueInput
  ): Promise<LegendaryPlayer | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id/team")
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => TeamWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyTeam(
    @common.Req() request: Request,
    @common.Param() params: LegendaryPlayerWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Team[]> {
    const query: TeamWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Team",
    });
    const results = await this.service.findTeam(params.id, {
      where: query,
      select: {
        createdAt: true,
        firstColor: true,
        id: true,
        illustration: true,
        name: true,
        secondColor: true,
        thirdColor: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/team")
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "update",
    possession: "any",
  })
  async createTeam(
    @common.Param() params: LegendaryPlayerWhereUniqueInput,
    @common.Body() body: LegendaryPlayerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      team: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LegendaryPlayer",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"LegendaryPlayer"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/team")
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "update",
    possession: "any",
  })
  async updateTeam(
    @common.Param() params: LegendaryPlayerWhereUniqueInput,
    @common.Body() body: LegendaryPlayerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      team: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LegendaryPlayer",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"LegendaryPlayer"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id/team")
  @nestAccessControl.UseRoles({
    resource: "LegendaryPlayer",
    action: "update",
    possession: "any",
  })
  async deleteTeam(
    @common.Param() params: LegendaryPlayerWhereUniqueInput,
    @common.Body() body: LegendaryPlayerWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      team: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "LegendaryPlayer",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"LegendaryPlayer"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
