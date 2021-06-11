import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TeamWhereInput } from "./TeamWhereInput";
import { Type } from "class-transformer";
import { TeamOrderByInput } from "./TeamOrderByInput";

@ArgsType()
class TeamFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => TeamWhereInput,
  })
  @Field(() => TeamWhereInput, { nullable: true })
  @Type(() => TeamWhereInput)
  where?: TeamWhereInput;

  @ApiProperty({
    required: false,
    type: TeamOrderByInput,
  })
  @Field(() => TeamOrderByInput, { nullable: true })
  @Type(() => TeamOrderByInput)
  orderBy?: TeamOrderByInput;

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

export { TeamFindManyArgs };
