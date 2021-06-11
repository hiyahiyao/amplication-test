import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PlayerWhereInput } from "./PlayerWhereInput";
import { Type } from "class-transformer";
import { PlayerOrderByInput } from "./PlayerOrderByInput";

@ArgsType()
class PlayerFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PlayerWhereInput,
  })
  @Field(() => PlayerWhereInput, { nullable: true })
  @Type(() => PlayerWhereInput)
  where?: PlayerWhereInput;

  @ApiProperty({
    required: false,
    type: PlayerOrderByInput,
  })
  @Field(() => PlayerOrderByInput, { nullable: true })
  @Type(() => PlayerOrderByInput)
  orderBy?: PlayerOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { PlayerFindManyArgs };
