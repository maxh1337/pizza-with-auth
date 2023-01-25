import {Base, TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Prop, prop, Ref} from "@typegoose/typegoose";
import {PizzasModel} from "../pizzas/pizzas.model";

export interface UserModel extends Base {
}

export class UserModel extends TimeStamps {
    @prop({unique: true})
    email: string

    @prop()
    password: string

    @prop()
    name?: string

    @prop({default: false})
    isAdmin: boolean
}