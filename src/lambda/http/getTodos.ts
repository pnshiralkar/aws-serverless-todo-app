import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {listItems} from '../../businessLogic/listTodos'
import {createLogger} from "../../utils/logger";

const logger = createLogger('getTodos')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const user = event.requestContext.authorizer.principalId

    logger.info("Getting Todo for request", event.requestContext.requestId)
    const result = await listItems(user)
    logger.info("Got Todo for request", event.requestContext.requestId)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({items: result})
    }
}
