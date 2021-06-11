import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { MatchWhereUniqueInput } from "../../match/base/MatchWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TeamWhereUniqueInput } from "../../team/base/TeamWhereUniqueInput";
import { UserWhereUniqueInput } from "../../user/base/UserWhereUniqueInput";
@InputType()
class CompositionCreateInput {
  @ApiProperty({
    required: true,
    type: () => MatchWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => MatchWhereUniqueInput)
  @Field(() => MatchWhereUniqueInput)
  match!: MatchWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => TeamWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => TeamWhereUniqueInput)
  @Field(() => TeamWhereUniqueInput)
  team!: TeamWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => UserWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  @Field(() => UserWhereUniqueInput)
  user!: UserWhereUniqueInput;
}
export { CompositionCreateInput };
