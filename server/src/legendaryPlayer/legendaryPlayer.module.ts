import { Module } from "@nestjs/common";
import { LegendaryPlayerModuleBase } from "./base/legendaryPlayer.module.base";
import { LegendaryPlayerService } from "./legendaryPlayer.service";
import { LegendaryPlayerController } from "./legendaryPlayer.controller";
import { LegendaryPlayerResolver } from "./legendaryPlayer.resolver";

@Module({
  imports: [LegendaryPlayerModuleBase],
  controllers: [LegendaryPlayerController],
  providers: [LegendaryPlayerService, LegendaryPlayerResolver],
  exports: [LegendaryPlayerService],
})
export class LegendaryPlayerModule {}
