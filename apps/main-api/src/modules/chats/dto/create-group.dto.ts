import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGroupDto {
    @IsString()
    @IsNotEmpty({ message: 'Group name cannot be empty' })
    @MaxLength(50)
    name!: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    description?: string;
}

