import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put, Query,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import {PizzasService} from "./pizzas.service";
import {Auth} from "../auth/decorators/auth.decorator";
import {CreatePizzaDto} from "./dto/createPizza.dto";
import {IdValidationPipe} from "../pipes/id.validation.pipe";
import {UpdatePizzaDto} from "./dto/updatePizza.dto";

@Controller("pizzas")
export class PizzasController {
    constructor(private readonly PizzaService: PizzasService) {
    }

    @Get()
    async getAll(@Query('searchTerm') searchTerm?: string) {
        return this.PizzaService.getAll(searchTerm)
    }

    @Get(':id')
    async ById(@Param('id') id: string) {
        return this.PizzaService.byId(id)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    @Auth("admin")
    async create(@Body() dto: CreatePizzaDto) {
        return this.PizzaService.create(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(":id")
    @Auth("admin")
    async update(
        @Body() dto: UpdatePizzaDto,
        @Param("id", IdValidationPipe) id: string
    ) {
        return this.PizzaService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(200)
    @Auth("admin")
    async delete(@Param("id", IdValidationPipe) id: string) {
        return this.PizzaService.delete(id);
    }
}
