import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {PizzasModel} from "./pizzas.model";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {CreatePizzaDto} from "./dto/createPizza.dto";
import {UpdatePizzaDto} from "./dto/updatePizza.dto";

@Injectable()
export class PizzasService {
    constructor(@InjectModel(PizzasModel) private readonly PizzasModel: ModelType<PizzasModel>) {
    }


    async getAll(searchTerm?: string) {
        let options = {}

        if (searchTerm)
            options = {
                $or: [
                    {
                        title: new RegExp(searchTerm, 'i')
                    }
                ]
            }

        return this.PizzasModel.find(options).exec()
    }


    async byId(_id: string) {
        const pizza = await this.PizzasModel.findById(_id)
        if (!pizza) throw new NotFoundException('Pizza not found')
        return pizza
    }

    async delete(_id: string) {
        const deletePizza = this.PizzasModel.findByIdAndDelete(_id)
        if (!deletePizza) throw new NotFoundException('Pizza not found')

        return deletePizza
    }

    async create(dto: CreatePizzaDto) {
        const newPizza: CreatePizzaDto = {
            imageUrl: dto.imageUrl,
            title: dto.title,
            sizes: dto.sizes,
            price: dto.price,
            types: dto.types
        }

        const pizza = await this.PizzasModel.create(newPizza)
        return pizza
    }

    async update(id: string, dto: UpdatePizzaDto) {
        const update = await this.PizzasModel.findByIdAndUpdate(id, dto, {
            new: true
        })

        if (!update) throw new NotFoundException('Pizza not found')
        return update
    }

}
