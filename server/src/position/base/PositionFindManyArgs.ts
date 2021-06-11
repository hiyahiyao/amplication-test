import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PositionWhereInput } from "./PositionWhereInput";
import { Type } from "class-transformer";
import { PositionOrderByInput } from "./PositionOrderByInput";

@ArgsType()
class PositionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PositionWhereInput,
  })
  @Field(() => PositionWhereInput, { nullable: true })
  @Type(() => PositionWhereInput)
  where?: PositionWhereInput;

  @ApiProperty({
    required: false,
    type: PositionOrderByInput,
  })
  @Field(() => PositionOrderByInput, { nullable: true })
  @Type(() => PositionOrderByInput)
  orderBy?: PositionOrderByInput;

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

export { PositionFindManyArgs };
