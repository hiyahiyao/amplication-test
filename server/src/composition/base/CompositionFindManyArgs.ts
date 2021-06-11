import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompositionWhereInput } from "./CompositionWhereInput";
import { Type } from "class-transformer";
import { CompositionOrderByInput } from "./CompositionOrderByInput";

@ArgsType()
class CompositionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CompositionWhereInput,
  })
  @Field(() => CompositionWhereInput, { nullable: true })
  @Type(() => CompositionWhereInput)
  where?: CompositionWhereInput;

  @ApiProperty({
    required: false,
    type: CompositionOrderByInput,
  })
  @Field(() => CompositionOrderByInput, { nullable: true })
  @Type(() => CompositionOrderByInput)
  orderBy?: CompositionOrderByInput;

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

export { CompositionFindManyArgs };
