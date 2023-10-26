import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import process from "process";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        DatabaseModule, 
        UserModule, 
        PostModule,
    ],
})
export class AppModule {}
