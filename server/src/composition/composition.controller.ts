import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CompositionService } from "./composition.service";
import { CompositionControllerBase } from "./base/composition.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("compositions")
@common.Controller("compositions")
export class CompositionController extends CompositionControllerBase {
  constructor(
    protected readonly service: CompositionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
