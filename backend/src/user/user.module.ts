import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {TypegooseModule} from "nestjs-typegoose";
import {UserModel} from "./user.model";
import {ConfigModule} from "@nestjs/config";
import {UserController} from "./user.controller";
import {PizzasService} from "../pizzas/pizzas.service";
import {PizzasModule} from "../pizzas/pizzas.module";

@Module({
    providers: [UserService],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: UserModel,
                schemaOptions: {
                    collection: 'User'
                }
            }
        ]),
        PizzasModule,
        ConfigModule
    ],
    controllers: [UserController]
})
export class UserModule {
}
