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
  compositions?: CompositionWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  number?: number | null;

  @ApiProperty({
    required: true,
    type: () => PlayerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PlayerWhereUniqueInput)
  @Field(() => PlayerWhereUniqueInput)
  player!: PlayerWhereUniqueInput;
}
export { PositionCreateInput };
