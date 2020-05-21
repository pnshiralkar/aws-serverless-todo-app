import {query} from "../dataLayer/TodoItem";
const todoTable = process.env.TODO_TABLE

export const listItems = async (userId: string): Promise<object> => {
    return await query(todoTable, userId)
}