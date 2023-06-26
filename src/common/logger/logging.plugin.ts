import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    Logger.log('Request started', LoggingPlugin.name);
    return {
      async willSendResponse() {
        Logger.log('Will send response', LoggingPlugin.name);
      },
    };
  }
}
