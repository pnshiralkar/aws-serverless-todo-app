import {del} from "../dataLayer/TodoItem";


const todoTable = process.env.TODO_TABLE

export const deleteItem = async (userId: string, todoId: string): Promise<void> => {
    await del(todoTable, userId, todoId)
}