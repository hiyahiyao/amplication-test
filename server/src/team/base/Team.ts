import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Composition } from "../../composition/base/Composition";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { LegendaryPlayer } from "../../legendaryPlayer/base/LegendaryPlayer";
import { Match } from "../../match/base/Match";
import { Player } from "../../player/base/Player";
@ObjectType()
class Team {
  @ApiProperty({
    required: false,
    type: () => [Composition],
  })
  @ValidateNested()
  @Type(() => Composition)
  @IsOptional()
  compositions?: Array<Composition>;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  firstColor!: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  illustration!: string | null;

  @ApiProperty({
    required: false,
    type: () => [LegendaryPlayer],
  })
  @ValidateNested()
  @Type(() => LegendaryPlayer)
  @IsOptional()
  legendaryPlayers?: Array<LegendaryPlayer>;

  @ApiProperty({
    required: false,
    type: () => [Match],
  })
  @ValidateNested()
  @Type(() => Match)
  @IsOptional()
  matchesAsAway?: Array<Match>;

  @ApiProperty({
    required: false,
    type: () => [Match],
  })
  @ValidateNested()
  @Type(() => Match)
  @IsOptional()
  matchesAsHome?: Array<Match>;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name!: string | null;

  @ApiProperty({
    required: false,
    type: () => [Player],
  })
  @ValidateNested()
  @Type(() => Player)
  @IsOptional()
  players?: Array<Player>;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  secondColor!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  thirdColor!: string | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Team };
