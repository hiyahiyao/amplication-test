import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { Match } from "../../match/base/Match";
import { Position } from "../../position/base/Position";
import { Team } from "../../team/base/Team";
import { User } from "../../user/base/User";
@ObjectType()
class Composition {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
    type: () => Match,
  })
  @ValidateNested()
  @Type(() => Match)
  match?: Match;

  @ApiProperty({
    required: true,
    type: () => [Position],
  })
  @ValidateNested()
  @Type(() => Position)
  @IsOptional()
  position?: Array<Position>;

  @ApiProperty({
    required: true,
    type: () => Team,
  })
  @ValidateNested()
  @Type(() => Team)
  team?: Team;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: true,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  user?: User;
}
export { Composition };
