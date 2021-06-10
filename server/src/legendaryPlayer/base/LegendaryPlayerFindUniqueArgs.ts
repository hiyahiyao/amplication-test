import { ArgsType, Field } from "@nestjs/graphql";
import { LegendaryPlayerWhereUniqueInput } from "./LegendaryPlayerWhereUniqueInput";

@ArgsType()
class LegendaryPlayerFindUniqueArgs {
  @Field(() => LegendaryPlayerWhereUniqueInput, { nullable: false })
  where!: LegendaryPlayerWhereUniqueInput;
}

export { LegendaryPlayerFindUniqueArgs };
