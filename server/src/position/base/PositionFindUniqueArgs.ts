import { ArgsType, Field } from "@nestjs/graphql";
import { PositionWhereUniqueInput } from "./PositionWhereUniqueInput";

@ArgsType()
class PositionFindUniqueArgs {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  where!: PositionWhereUniqueInput;
}

export { PositionFindUniqueArgs };
