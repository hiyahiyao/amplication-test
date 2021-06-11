import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LegendaryPlayerService } from "./legendaryPlayer.service";
import { LegendaryPlayerControllerBase } from "./base/legendaryPlayer.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("legendary-players")
@common.Controller("legendary-players")
export class LegendaryPlayerController extends LegendaryPlayerControllerBase {
  constructor(
    protected readonly service: LegendaryPlayerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
