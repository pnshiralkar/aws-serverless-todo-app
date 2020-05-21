import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import {createItem} from '../../businessLogic/createTodo'
import {createLogger} from "../../utils/logger";

const logger = createLogger('createTodo')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const userId = event.requestContext.authorizer.principalId

  logger.info("Creating Todo for request", event.requestContext.requestId)
  const item = await createItem(newTodo, userId)
  logger.info("Created Todo for request", event.requestContext.requestId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({item})
  }
}
