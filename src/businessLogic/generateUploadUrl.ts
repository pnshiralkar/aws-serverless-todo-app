import {updateUrl} from "../dataLayer/TodoItem";import * as uuid from 'uuid'

import * as AWS from "aws-sdk";
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const todoTable = process.env.TODO_TABLE

export const generateUploadUrl = async (userId: string, todoId: string): Promise<string> => {
    const s3 = new XAWS.S3()
    const imageId = uuid.v4()

    const url = s3.getSignedUrl('putObject', {
        Bucket: process.env.BUCKET_NAME,
        Key: imageId,
        Expires: 60*5,
        ContentType: 'application/x-www-form-urlencoded'
    })

    await updateUrl(todoTable, userId, todoId, `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${imageId}`)

    return url
}