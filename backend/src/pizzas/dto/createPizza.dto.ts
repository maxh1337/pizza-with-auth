import {IsArray, IsNumber, IsString} from "class-validator";


export class CreatePizzaDto {
    @IsString()
    imageUrl: string

    @IsString()
    title: string

    @IsArray()
    sizes: number[]

    @IsNumber()
    price: number

    @IsArray()
    types: number[]
}