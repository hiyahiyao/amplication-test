import { ArgsType, Field } from "@nestjs/graphql";
import { PositionWhereUniqueInput } from "./PositionWhereUniqueInput";

@ArgsType()
class DeletePositionArgs {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  where!: PositionWhereUniqueInput;
}

export { DeletePositionArgs };
