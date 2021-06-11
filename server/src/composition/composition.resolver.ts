import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { CompositionResolverBase } from "./base/composition.resolver.base";
import { Composition } from "./base/Composition";
import { CompositionService } from "./composition.service";

@graphql.Resolver(() => Composition)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class CompositionResolver extends CompositionResolverBase {
  constructor(
    protected readonly service: CompositionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
