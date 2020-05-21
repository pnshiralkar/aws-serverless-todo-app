import 'source-map-support/register'
import {deleteItem} from '../../businessLogic/deleteTodo'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {createLogger} from "../../utils/logger";

const logger = createLogger('deleteTodo')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const user = event.requestContext.authorizer.principalId

  logger.info("Deleting Todo for request", event.requestContext.requestId)
  await deleteItem(user, todoId)
  logger.info("Deleted Todo for request", event.requestContext.requestId)

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: null
  }
}
