import { FC, useState } from "react";
import { TodoItem } from "./TodoItem";
import { getTodoItems, TodoItemModel } from "./utils/getTodoItems";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor, TodoItemModel as newItemModel } from "./Editor";
import { v4 as uuid } from "uuid";

export const TodoList: FC = () => {
  // 從資料源取得資料
  const itemsLst: TodoItemModel[] = getTodoItems(1);
  const [todos, setTodos] = useState<TodoItemModel[]>(itemsLst);

  // 更新 TodoItem
  const updateTodo = (id: string, update: Partial<TodoItemModel>) => {
    setTodos(todos.map((i) => (i.id === id ? { ...i, ...update } : i)));
  };

  // 刪除 TodoItem
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((i) => i.id !== id));
  };

  // 新增 TodoItem
  const [creating, setCreating] = useState<boolean>(false);
  const createTodo = (newTodo: TodoItemModel) => {
    setTodos([...todos, newTodo]);
  };
  const handleCreateTodo = (todo: newItemModel) => {
    const t = Date.now();
    createTodo({ id: uuid(), createdAt: t, lastModifiedAt: t, ...todo });
    setCreating(false);
  };

  return (
    <>
      <div className="columns is-multiline">
        {todos.map((item) => (
          <div className="column is-3" key={item.id}>
            <TodoItem
              {...item}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        ))}
      </div>
      {creating && (
        <Editor
          onSave={handleCreateTodo}
          onCancel={() => {
            setCreating(false);
          }}
        />
      )}
      <div>
        <button
          className="button is-rounded is-primary is-medium"
          onClick={() => {
            setCreating(true);
          }}
        >
          <span className="icon">
            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
          </span>
        </button>
      </div>
    </>
  );
};
