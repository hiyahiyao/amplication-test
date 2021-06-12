import { Module } from "@nestjs/common";
import { CompositionModuleBase } from "./base/composition.module.base";
import { CompositionService } from "./composition.service";
import { CompositionController } from "./composition.controller";
import { CompositionResolver } from "./composition.resolver";

@Module({
  imports: [CompositionModuleBase],
  controllers: [CompositionController],
  providers: [CompositionService, CompositionResolver],
  exports: [CompositionService],
})
export class CompositionModule {}
