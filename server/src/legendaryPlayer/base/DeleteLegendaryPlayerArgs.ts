import { ArgsType, Field } from "@nestjs/graphql";
import { LegendaryPlayerWhereUniqueInput } from "./LegendaryPlayerWhereUniqueInput";

@ArgsType()
class DeleteLegendaryPlayerArgs {
  @Field(() => LegendaryPlayerWhereUniqueInput, { nullable: false })
  where!: LegendaryPlayerWhereUniqueInput;
}

export { DeleteLegendaryPlayerArgs };
