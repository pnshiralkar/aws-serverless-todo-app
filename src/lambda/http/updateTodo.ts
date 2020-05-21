import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {UpdateTodoRequest} from '../../requests/UpdateTodoRequest'
import {updateItem} from "../../businessLogic/updateTodo";
import {createLogger} from "../../utils/logger";

const logger = createLogger('updateTodo')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

    logger.info("Updating Todo for request", event.requestContext.requestId)
    const item = await updateItem(event.requestContext.authorizer.principalId, todoId, updatedTodo)
    logger.info("Updated Todo for request", event.requestContext.requestId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(item)
    }
}
