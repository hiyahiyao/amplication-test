import { Module } from "@nestjs/common";
import { PositionModuleBase } from "./base/position.module.base";
import { PositionService } from "./position.service";
import { PositionController } from "./position.controller";
import { PositionResolver } from "./position.resolver";

@Module({
  imports: [PositionModuleBase],
  controllers: [PositionController],
  providers: [PositionService, PositionResolver],
  exports: [PositionService],
})
export class PositionModule {}
