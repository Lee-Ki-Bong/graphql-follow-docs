import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true, // 플레이 그라운드 활성화 여부
      autoSchemaFile: 'src/common/graphql/schema.gql',
    }),
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
