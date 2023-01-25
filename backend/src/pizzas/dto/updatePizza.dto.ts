import {IsArray, IsNumber, IsString} from "class-validator";


export class UpdatePizzaDto {
    @IsString()
    imageUrl: string

    @IsString()
    title: string

    @IsArray()
    sizes: number[]

    @IsNumber()
    price: number
}