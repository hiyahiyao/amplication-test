import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompositionWhereUniqueInput } from "../../composition/base/CompositionWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { PlayerWhereUniqueInput } from "../../player/base/PlayerWhereUniqueInput";
@InputType()
class PositionWhereInput {
  @ApiProperty({
    required: false,
    type: () => CompositionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CompositionWhereUniqueInput)
  @IsOptional()
  @Field(() => CompositionWhereUniqueInput, {
    nullable: true,
  })
  composition?: CompositionWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: IntNullableFilter,
  })
  @Type(() => IntNullableFilter)
  @IsOptional()
  @Field(() => IntNullableFilter, {
    nullable: true,
  })
  fieldPosition?: IntNullableFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: () => PlayerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PlayerWhereUniqueInput)
  @IsOptional()
  @Field(() => PlayerWhereUniqueInput, {
    nullable: true,
  })
  player?: PlayerWhereUniqueInput;
}
export { PositionWhereInput };
