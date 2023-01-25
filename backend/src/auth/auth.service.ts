import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {UserModel} from "../user/user.model";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {JwtService} from "@nestjs/jwt";
import {AuthDto, RegDto} from "./dto/auth.dto";
import {compare, genSalt, hash} from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>, private readonly jwtService: JwtService) {
    }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto)
        const token = await this.issueToken(String(user._id))

        return {
            user: this.returnUserFields(user),
            ...token
        }
    }

    async register(dto: RegDto) {
        const oldUser = await this.UserModel.findOne({email: dto.email})
        if (oldUser) {
            throw new BadRequestException(
                'User with this email is already in the system',
            )
        }
        const salt = await genSalt(10)
        const newUser = new this.UserModel({
            name: dto.name,
            email: dto.email,
            password: await hash(dto.password, salt),
        })
        const user = await newUser.save()
        const token = await this.issueToken(String(user._id))

        return {
            user: this.returnUserFields(user),
            ...token,
        }
    }

    async findByEmail(email: string) {
        return this.UserModel.findOne({email})
            .exec()
    }

    async validateUser(dto: AuthDto): Promise<UserModel> {
        const user = await this.findByEmail(dto.email)
        if (!user) throw new UnauthorizedException('User not found')

        const isValidPassword = await compare(dto.password, user.password)
        if (!isValidPassword) throw new UnauthorizedException('Invalid password')

        return user
    }

    async issueToken(userId: string) {
        const data = {_id: userId}

        const token = await this.jwtService.signAsync(data, {
            expiresIn: '7d',
        })

        return {token}
    }

    returnUserFields(user: UserModel) {
        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
        }
    }
}
