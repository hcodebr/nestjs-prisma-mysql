import { Module, NestModule, MiddlewareConsumer, RequestMethod, forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        PrismaModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        });
    }

}