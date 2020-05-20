import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {UpdateTodoRequest} from '../../requests/UpdateTodoRequest'
import * as AWS from "aws-sdk";

const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODO_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

    const item = await docClient.update({
        TableName: todoTable,
        Key: {
            "ownerId": "" + event.requestContext.authorizer.principalId,
            "todoId": "" + todoId
        },
        UpdateExpression: 'set dueDate = :dueDate, #n = :name, done = :done',
        ExpressionAttributeNames:{
            '#n': 'name'
        },
        ExpressionAttributeValues: {
            ':name': updatedTodo.name,
            ':dueDate': updatedTodo.dueDate,
            ':done': updatedTodo.done
        },
        ReturnValues: "UPDATED_NEW"
    }).promise()

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(item.Attributes)
    }
}
