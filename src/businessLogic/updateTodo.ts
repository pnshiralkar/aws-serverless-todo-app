import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {update} from "../dataLayer/TodoItem";

const todoTable = process.env.TODO_TABLE

export const updateItem = async (userId: string, todoId: string, newTodo: CreateTodoRequest): Promise<object> => {
    return await update(todoTable, userId, todoId, newTodo)
}