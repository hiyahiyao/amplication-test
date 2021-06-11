import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { LegendaryPlayerResolverBase } from "./base/legendaryPlayer.resolver.base";
import { LegendaryPlayer } from "./base/LegendaryPlayer";
import { LegendaryPlayerService } from "./legendaryPlayer.service";

@graphql.Resolver(() => LegendaryPlayer)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class LegendaryPlayerResolver extends LegendaryPlayerResolverBase {
  constructor(
    protected readonly service: LegendaryPlayerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
