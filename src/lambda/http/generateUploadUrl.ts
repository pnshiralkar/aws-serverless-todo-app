import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'

import {generateUploadUrl} from "../../businessLogic/generateUploadUrl";
import {createLogger} from "../../utils/logger";

const logger = createLogger('genUploadUrl')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const userId = event.requestContext.authorizer.principalId

    logger.info("Generating upload url for request", event.requestContext.requestId)
    const url = await generateUploadUrl(userId, todoId)
    logger.info("Generated upload url for request", event.requestContext.requestId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({uploadUrl: url})
    }
}
