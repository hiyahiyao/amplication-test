import { ArgsType, Field } from "@nestjs/graphql";
import { CompositionWhereUniqueInput } from "./CompositionWhereUniqueInput";

@ArgsType()
class DeleteCompositionArgs {
  @Field(() => CompositionWhereUniqueInput, { nullable: false })
  where!: CompositionWhereUniqueInput;
}

export { DeleteCompositionArgs };
