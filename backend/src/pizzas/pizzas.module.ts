import {Module} from '@nestjs/common';
import {PizzasService} from './pizzas.service';
import {TypegooseModule} from "nestjs-typegoose";
import {PizzasModel} from "./pizzas.model";
import {ConfigModule} from "@nestjs/config";
import {PizzasController} from "./pizzas.controller";

@Module({
    providers: [PizzasService],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: PizzasModel,
                schemaOptions: {
                    collection: 'Pizza'
                }
            }
        ]),
        ConfigModule
    ],
    controllers: [PizzasController],
    exports: [PizzasService]
})
export class PizzasModule {
}
