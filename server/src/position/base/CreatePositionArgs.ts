import { ArgsType, Field } from "@nestjs/graphql";
import { PositionCreateInput } from "./PositionCreateInput";

@ArgsType()
class CreatePositionArgs {
  @Field(() => PositionCreateInput, { nullable: false })
  data!: PositionCreateInput;
}

export { CreatePositionArgs };
