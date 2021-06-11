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
import { MatchService } from "../match.service";
import { MatchCreateInput } from "./MatchCreateInput";
import { MatchWhereInput } from "./MatchWhereInput";
import { MatchWhereUniqueInput } from "./MatchWhereUniqueInput";
import { MatchFindManyArgs } from "./MatchFindManyArgs";
import { MatchUpdateInput } from "./MatchUpdateInput";
import { Match } from "./Match";
import { CompositionWhereInput } from "../../composition/base/CompositionWhereInput";
import { Composition } from "../../composition/base/Composition";

export class MatchControllerBase {
  constructor(
    protected readonly service: MatchService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Match })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: MatchCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Match> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Match",
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
        `providing the properties: ${properties} on ${"Match"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        awayTeam: data.awayTeam
          ? {
              connect: data.awayTeam,
            }
          : undefined,

        homeTeam: data.homeTeam
          ? {
              connect: data.homeTeam,
            }
          : undefined,
      },
      select: {
        awayTeam: {
          select: {
            id: true,
          },
        },

        competition: true,
        createdAt: true,

        homeTeam: {
          select: {
            id: true,
          },
        },

        id: true,
        score: true,
        stadium: true,
        startDate: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Match] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => MatchFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Match[]> {
    const args = plainToClass(MatchFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Match",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        awayTeam: {
          select: {
            id: true,
          },
        },

        competition: true,
        createdAt: true,

        homeTeam: {
          select: {
            id: true,
          },
        },

        id: true,
        score: true,
        stadium: true,
        startDate: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Match })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: MatchWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Match | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Match",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        awayTeam: {
          select: {
            id: true,
          },
        },

        competition: true,
        createdAt: true,

        homeTeam: {
          select: {
            id: true,
          },
        },

        id: true,
        score: true,
        stadium: true,
        startDate: true,
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
    resource: "Match",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Match })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: MatchWhereUniqueInput,
    @common.Body()
    data: MatchUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Match | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Match",
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
        `providing the properties: ${properties} on ${"Match"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          awayTeam: data.awayTeam
            ? {
                connect: data.awayTeam,
              }
            : undefined,

          homeTeam: data.homeTeam
            ? {
                connect: data.homeTeam,
              }
            : undefined,
        },
        select: {
          awayTeam: {
            select: {
              id: true,
            },
          },

          competition: true,
          createdAt: true,

          homeTeam: {
            select: {
              id: true,
            },
          },

          id: true,
          score: true,
          stadium: true,
          startDate: true,
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
    resource: "Match",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Match })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: MatchWhereUniqueInput
  ): Promise<Match | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          awayTeam: {
            select: {
              id: true,
            },
          },

          competition: true,
          createdAt: true,

          homeTeam: {
            select: {
              id: true,
            },
          },

          id: true,
          score: true,
          stadium: true,
          startDate: true,
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
  @common.Get("/:id/compositions")
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => CompositionWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyCompositions(
    @common.Req() request: Request,
    @common.Param() params: MatchWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Composition[]> {
    const query: CompositionWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Composition",
    });
    const results = await this.service.findCompositions(params.id, {
      where: query,
      select: {
        createdAt: true,
        id: true,

        match: {
          select: {
            id: true,
          },
        },

        team: {
          select: {
            id: true,
          },
        },

        updatedAt: true,

        user: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post("/:id/compositions")
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "update",
    possession: "any",
  })
  async createCompositions(
    @common.Param() params: MatchWhereUniqueInput,
    @common.Body() body: MatchWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      compositions: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Match",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Match"} is forbidden for roles: ${roles}`
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
  @common.Patch("/:id/compositions")
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "update",
    possession: "any",
  })
  async updateCompositions(
    @common.Param() params: MatchWhereUniqueInput,
    @common.Body() body: MatchWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      compositions: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Match",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Match"} is forbidden for roles: ${roles}`
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
  @common.Delete("/:id/compositions")
  @nestAccessControl.UseRoles({
    resource: "Match",
    action: "update",
    possession: "any",
  })
  async deleteCompositions(
    @common.Param() params: MatchWhereUniqueInput,
    @common.Body() body: MatchWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      compositions: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Match",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Match"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
