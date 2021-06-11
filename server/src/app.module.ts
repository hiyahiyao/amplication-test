import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TeamModule } from "./team/team.module";
import { PlayerModule } from "./player/player.module";
import { MatchModule } from "./match/match.module";
import { CompositionModule } from "./composition/composition.module";
import { PositionModule } from "./position/position.module";
import { LegendaryPlayerModule } from "./legendaryPlayer/legendaryPlayer.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  controllers: [],
  imports: [
    UserModule,
    TeamModule,
    PlayerModule,
    MatchModule,
    CompositionModule,
    PositionModule,
    LegendaryPlayerModule,
    ACLModule,
    AuthModule,
    MorganModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule {}
