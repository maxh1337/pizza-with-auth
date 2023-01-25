import {Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthDto, RegDto} from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() data: AuthDto) {
        return this.AuthService.login(data)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('register')
    async register(@Body() dto: RegDto) {
        return this.AuthService.register(dto)
    }
}
