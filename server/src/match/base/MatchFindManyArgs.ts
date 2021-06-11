import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { MatchWhereInput } from "./MatchWhereInput";
import { Type } from "class-transformer";
import { MatchOrderByInput } from "./MatchOrderByInput";

@ArgsType()
class MatchFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => MatchWhereInput,
  })
  @Field(() => MatchWhereInput, { nullable: true })
  @Type(() => MatchWhereInput)
  where?: MatchWhereInput;

  @ApiProperty({
    required: false,
    type: MatchOrderByInput,
  })
  @Field(() => MatchOrderByInput, { nullable: true })
  @Type(() => MatchOrderByInput)
  orderBy?: MatchOrderByInput;

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

export { MatchFindManyArgs };
