import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Composition } from "../../composition/base/Composition";
import {
  ValidateNested,
  IsOptional,
  IsDate,
  IsInt,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { Player } from "../../player/base/Player";
@ObjectType()
class Position {
  @ApiProperty({
    required: false,
    type: () => Composition,
  })
  @ValidateNested()
  @Type(() => Composition)
  @IsOptional()
  composition?: Composition | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  fieldPosition!: number | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => Player,
  })
  @ValidateNested()
  @Type(() => Player)
  @IsOptional()
  player?: Player | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Position };
