import { ArgsType, Field } from "@nestjs/graphql";
import { CompositionWhereUniqueInput } from "./CompositionWhereUniqueInput";

@ArgsType()
class CompositionFindUniqueArgs {
  @Field(() => CompositionWhereUniqueInput, { nullable: false })
  where!: CompositionWhereUniqueInput;
}

export { CompositionFindUniqueArgs };
