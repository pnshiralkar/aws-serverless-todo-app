import 'source-map-support/register'
import * as uuid from 'uuid'
import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const s3 = new AWS.S3()
    const imageId = uuid.v4()

    const url = s3.getSignedUrl('putObject', {
        Bucket: process.env.BUCKET_NAME,
        Key: imageId,
        Expires: 60*5,
        ContentType: 'application/x-www-form-urlencoded'
    })

    await docClient.update({
        TableName: todoTable,
        Key: {
            "ownerId": "" + event.requestContext.authorizer.principalId,
            "todoId": "" + todoId
        },
        UpdateExpression: 'set imageUrl = :url',
        ExpressionAttributeValues: {
            ':url': `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageId}`,
        }
    }).promise()

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({uploadUrl: url})
    }
}
