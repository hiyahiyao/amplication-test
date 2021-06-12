import { ArgsType, Field } from "@nestjs/graphql";
import { CompositionWhereUniqueInput } from "./CompositionWhereUniqueInput";
import { CompositionUpdateInput } from "./CompositionUpdateInput";

@ArgsType()
class UpdateCompositionArgs {
  @Field(() => CompositionWhereUniqueInput, { nullable: false })
  where!: CompositionWhereUniqueInput;
  @Field(() => CompositionUpdateInput, { nullable: false })
  data!: CompositionUpdateInput;
}

export { UpdateCompositionArgs };
