import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { LoggingPlugin } from './common/logger/logging.plugin';
import { loggerMiddleware } from './common/logger/logger.middleware';
import { ComplexityPlugin } from './common/complexity/complexity.plugin';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false, // 플레이 그라운드 활성화 여부
      autoSchemaFile: 'src/common/graphql/schema.gql',
      sortSchema: true, // 포함된 모듈에 정의된 순서대로 스키마 정렬
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      buildSchemaOptions: {
        fieldMiddleware: [loggerMiddleware],
      },
    }),
  ],
  providers: [ComplexityPlugin, LoggingPlugin, AppResolver, AppService],
})
export class AppModule {}
