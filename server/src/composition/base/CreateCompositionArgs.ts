import { ArgsType, Field } from "@nestjs/graphql";
import { CompositionCreateInput } from "./CompositionCreateInput";

@ArgsType()
class CreateCompositionArgs {
  @Field(() => CompositionCreateInput, { nullable: false })
  data!: CompositionCreateInput;
}

export { CreateCompositionArgs };
