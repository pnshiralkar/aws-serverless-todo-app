import * as uuid from 'uuid'
import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {create} from "../dataLayer/TodoItem";
const todoTable = process.env.TODO_TABLE

export const createItem = async (newTodo: CreateTodoRequest, userId: string): Promise<object> => {
    const item = {
        todoId: uuid.v4(),
        createdAt: ("" + new Date()),
        ownerId: userId,
        ...newTodo
    }

    await create(todoTable, item)

    return item
}