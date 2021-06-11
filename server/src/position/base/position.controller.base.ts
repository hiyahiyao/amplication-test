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
import { PositionService } from "../position.service";
import { PositionCreateInput } from "./PositionCreateInput";
import { PositionWhereInput } from "./PositionWhereInput";
import { PositionWhereUniqueInput } from "./PositionWhereUniqueInput";
import { PositionFindManyArgs } from "./PositionFindManyArgs";
import { PositionUpdateInput } from "./PositionUpdateInput";
import { Position } from "./Position";

export class PositionControllerBase {
  constructor(
    protected readonly service: PositionService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Position })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: PositionCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Position> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Position",
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
        `providing the properties: ${properties} on ${"Position"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        compositions: data.compositions
          ? {
              connect: data.compositions,
            }
          : undefined,

        player: {
          connect: data.player,
        },
      },
      select: {
        compositions: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        number: true,

        player: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Position] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => PositionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Position[]> {
    const args = plainToClass(PositionFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Position",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        compositions: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        number: true,

        player: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Position",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Position })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: PositionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Position | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Position",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        compositions: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        number: true,

        player: {
          select: {
            id: true,
          },
        },

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
    resource: "Position",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Position })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: PositionWhereUniqueInput,
    @common.Body()
    data: PositionUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Position | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Position",
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
        `providing the properties: ${properties} on ${"Position"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          compositions: data.compositions
            ? {
                connect: data.compositions,
              }
            : undefined,

          player: {
            connect: data.player,
          },
        },
        select: {
          compositions: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          number: true,

          player: {
            select: {
              id: true,
            },
          },

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
    resource: "Position",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Position })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: PositionWhereUniqueInput
  ): Promise<Position | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          compositions: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          number: true,

          player: {
            select: {
              id: true,
            },
          },

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
}
