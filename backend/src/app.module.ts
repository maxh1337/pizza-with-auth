import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from "./user/user.module";
import {PizzasModule} from "./pizzas/pizzas.module";
import {AuthModule} from "./auth/auth.module";
import {getMongoDbConfig} from "./config/mongo.config";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypegooseModule} from "nestjs-typegoose";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoDbConfig
        }),
        UserModule,
        PizzasModule,
        AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
