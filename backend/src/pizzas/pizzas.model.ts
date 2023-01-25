import {Base} from "@typegoose/typegoose/lib/defaultClasses";
import {prop} from "@typegoose/typegoose";
import {IsArray, IsNumber, IsString} from "class-validator";

export interface PizzasModel extends Base {
}

export class PizzasModel {

    @prop()
    imageUrl: string

    @prop()
    title: string

    @prop()
    sizes: number[]

    @prop()
    price: number

    @prop()
    types: number[]
}