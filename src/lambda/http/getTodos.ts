import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import * as AWS from "aws-sdk";

const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // @ts-ignore
    const user = event.headers
    const result = await docClient.query({
        TableName: todoTable,
        IndexName: process.env.INDEX_NAME,
        KeyConditionExpression: 'ownerId = :userId',
        ExpressionAttributeValues: {
            ':userId': event.requestContext.authorizer.principalId
        },
        ScanIndexForward: true
    }).promise()

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({items: result.Items, event})
    }
}
