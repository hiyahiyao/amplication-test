import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { MatchWhereUniqueInput } from "../../match/base/MatchWhereUniqueInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { TeamWhereUniqueInput } from "../../team/base/TeamWhereUniqueInput";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
@InputType()
class CompositionUpdateInput {
  @ApiProperty({
    required: false,
    type: () => MatchWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => MatchWhereUniqueInput)
  @IsOptional()
  @Field(() => MatchWhereUniqueInput, {
    nullable: true,
  })
  match?: MatchWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => TeamWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TeamWhereUniqueInput)
  @IsOptional()
  @Field(() => TeamWhereUniqueInput, {
    nullable: true,
  })
  team?: TeamWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @IsOptional()
  @Field(() => UserWhereUniqueInput, {
    nullable: true,
  })
  user?: UserWhereUniqueInput;
}
export { CompositionUpdateInput };
