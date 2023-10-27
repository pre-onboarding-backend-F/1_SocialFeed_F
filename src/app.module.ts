import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { validationSchema } from './commons/configs/validationSchema';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            validationSchema,
        }),
        DatabaseModule,
        UserModule,
        PostModule,
    ],
})
export class AppModule {}
