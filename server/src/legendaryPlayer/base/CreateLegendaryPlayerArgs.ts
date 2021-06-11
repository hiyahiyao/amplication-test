import { ArgsType, Field } from "@nestjs/graphql";
import { LegendaryPlayerCreateInput } from "./LegendaryPlayerCreateInput";

@ArgsType()
class CreateLegendaryPlayerArgs {
  @Field(() => LegendaryPlayerCreateInput, { nullable: false })
  data!: LegendaryPlayerCreateInput;
}

export { CreateLegendaryPlayerArgs };
