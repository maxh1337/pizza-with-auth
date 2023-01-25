import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {ConfigService} from '@nestjs/config'
import {UserModel} from '../../user/user.model'
import {ModelType} from '@typegoose/typegoose/lib/types'
import {Injectable} from '@nestjs/common'
import {InjectModel} from 'nestjs-typegoose'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate({_id}: Pick<UserModel, '_id'>) {
        const user = await this.UserModel.findById(_id).exec()
        return user
    }
}