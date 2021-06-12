import { ArgsType, Field } from "@nestjs/graphql";
import { PositionWhereUniqueInput } from "./PositionWhereUniqueInput";
import { PositionUpdateInput } from "./PositionUpdateInput";

@ArgsType()
class UpdatePositionArgs {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  where!: PositionWhereUniqueInput;
  @Field(() => PositionUpdateInput, { nullable: false })
  data!: PositionUpdateInput;
}

export { UpdatePositionArgs };
