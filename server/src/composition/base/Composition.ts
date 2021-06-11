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
    required: false,
    type: () => Match,
  })
  @ValidateNested()
  @Type(() => Match)
  @IsOptional()
  match?: Match | null;

  @ApiProperty({
    required: false,
    type: () => Position,
  })
  @ValidateNested()
  @Type(() => Position)
  @IsOptional()
  position?: Position | null;

  @ApiProperty({
    required: false,
    type: () => Team,
  })
  @ValidateNested()
  @Type(() => Team)
  @IsOptional()
  team?: Team | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: false,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  @IsOptional()
  user?: User | null;
}
export { Composition };
