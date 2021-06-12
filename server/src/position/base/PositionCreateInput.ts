import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CompositionWhereUniqueInput } from "../../composition/base/CompositionWhereUniqueInput";
import { ValidateNested, IsOptional, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { PlayerWhereUniqueInput } from "../../player/base/PlayerWhereUniqueInput";
@InputType()
class PositionCreateInput {
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
  composition?: CompositionWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  fieldPosition?: number | null;

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
  player?: PlayerWhereUniqueInput | null;
}
export { PositionCreateInput };
