import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient()

export const create = async (table, item)=>{
    await docClient.put({
        TableName: table,
        Item: item
    }).promise()
}

export const query = async (table, user): Promise<object> => {
    const result = await docClient.query({
        TableName: table,
        IndexName: process.env.INDEX_NAME,
        KeyConditionExpression: 'ownerId = :userId',
        ExpressionAttributeValues: {
            ':userId': user
        },
        ScanIndexForward: true
    }).promise()
    return result.Items
}

export const update = async (table, userId, todoId, updatedTodo): Promise<object> =>{
    const result = await docClient.update({
        TableName: table,
        Key: {
            "ownerId": "" + userId,
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

    return result.Attributes
}

export const del = async (table, userId, todoId): Promise<void> => {
    await docClient.delete({
        TableName: table,
        Key: {
            "ownerId": "" + userId,
            "todoId": "" + todoId
        }
    }).promise()
}

export const updateUrl = async (table, userId, todoId, url): Promise<void> => {
    await docClient.update({
        TableName: table,
        Key: {
            "ownerId": "" + userId,
            "todoId": "" + todoId
        },
        UpdateExpression: 'set imageUrl = :url',
        ExpressionAttributeValues: {
            ':url': url,
        }
    }).promise()
}