import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/product.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoleMiddleware } from './auth/auth.role.middleware';
import { TransactionModule } from './transactions/transaction.module';
import { CloudflareR2Module } from './cloudflareR2/cloudflareR2.module';
import { PagSeguroModule } from './pagSeguro/pagSeguro.module';
import { PayloadMiddleware } from './pagSeguro/payload.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UserModule,
    AuthModule,
    ProductModule,
    TransactionModule,
    CloudflareR2Module,
    PagSeguroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/getById/:id', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/isUserAdmin', method: RequestMethod.GET },
        { path: 'users/CartUpdate/:id', method: RequestMethod.PUT },
        { path: 'users/FavoriteUpdate/:userId', method: RequestMethod.PUT },
        { path: 'users/update/:userId', method: RequestMethod.PUT },
        { path: 'transactions', method: RequestMethod.POST },
        { path: 'transactions/:id', method: RequestMethod.PUT },
        { path: 'transactions/user/:userId', method: RequestMethod.GET },
        { path: 'transactions/getTrasaction/:id', method: RequestMethod.GET },
        { path: 'pagSeguro/calcFrete', method: RequestMethod.GET },
        { path: 'pagSeguro/checkout', method: RequestMethod.POST },
      );
    consumer
      .apply(RoleMiddleware)
      .forRoutes(
        { path: 'auth/set-admin/:id', method: RequestMethod.GET },
        { path: 'auth/unset-admin/:id', method: RequestMethod.GET },
        { path: 'users/delete-user/:userId', method: RequestMethod.DELETE },
        { path: 'products/create', method: RequestMethod.POST },
        { path: 'products/:productId', method: RequestMethod.PUT },
        { path: 'products/:productId', method: RequestMethod.DELETE },
        { path: 'transactions/:id', method: RequestMethod.DELETE },
      );
    consumer
      .apply(PayloadMiddleware)
      .forRoutes({ path: 'pagSeguro/webhook', method: RequestMethod.POST });
  }
}
