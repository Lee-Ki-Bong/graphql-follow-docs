import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener> {
    // 1. 복잡성 제한 값 설정 (요청 개수 제한)
    const maxComplexity = 3;

    // 2. GraphQL 스키마 정보 가져오기
    const { schema } = this.gqlSchemaHost;

    return {
      async didResolveOperation({ request, document }) {
        // 3. 쿼리 복잡성 계산
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            // 4. 필드 확장을 고려한 복잡성 추정기
            /**
             @complexity(2) // 필드의 복잡성 값을 2로 지정 -> 데코레이터로 설정된 복잡성 값을 읽고 이를 복잡성 계산에 반영
             public fieldName: string;
             */
            fieldExtensionsEstimator(),
            // 5. 단순 추정기 : 모든 필드의 복잡성 값은 1로 간주
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });

        // 6. 복잡성 제한을 초과할 경우 예외 발생
        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
          );
        }
        console.log('Query Complexity:', complexity);
      },
    };
  }
}
