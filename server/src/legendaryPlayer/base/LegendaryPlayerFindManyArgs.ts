import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { LegendaryPlayerWhereInput } from "./LegendaryPlayerWhereInput";
import { Type } from "class-transformer";
import { LegendaryPlayerOrderByInput } from "./LegendaryPlayerOrderByInput";

@ArgsType()
class LegendaryPlayerFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => LegendaryPlayerWhereInput,
  })
  @Field(() => LegendaryPlayerWhereInput, { nullable: true })
  @Type(() => LegendaryPlayerWhereInput)
  where?: LegendaryPlayerWhereInput;

  @ApiProperty({
    required: false,
    type: LegendaryPlayerOrderByInput,
  })
  @Field(() => LegendaryPlayerOrderByInput, { nullable: true })
  @Type(() => LegendaryPlayerOrderByInput)
  orderBy?: LegendaryPlayerOrderByInput;

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

export { LegendaryPlayerFindManyArgs };
