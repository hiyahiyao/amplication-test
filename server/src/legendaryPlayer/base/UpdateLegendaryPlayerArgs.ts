import { ArgsType, Field } from "@nestjs/graphql";
import { LegendaryPlayerWhereUniqueInput } from "./LegendaryPlayerWhereUniqueInput";
import { LegendaryPlayerUpdateInput } from "./LegendaryPlayerUpdateInput";

@ArgsType()
class UpdateLegendaryPlayerArgs {
  @Field(() => LegendaryPlayerWhereUniqueInput, { nullable: false })
  where!: LegendaryPlayerWhereUniqueInput;
  @Field(() => LegendaryPlayerUpdateInput, { nullable: false })
  data!: LegendaryPlayerUpdateInput;
}

export { UpdateLegendaryPlayerArgs };
