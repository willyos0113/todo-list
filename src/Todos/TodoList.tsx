import { FC, JSX, useState } from "react";
import { Priority, TodoItem } from "./TodoItem";
import { getTodoItems, TodoItemModel } from "./utils/getTodoItems";

export const TodoList: FC = () => {
  // 從資料源取得資料
  const itemsLst: TodoItemModel[] = getTodoItems(10);
  const [todos, setTodos] = useState<TodoItemModel[]>(itemsLst);

  // 更新 TodoItem 的資料
  const updateTodo = (id: string, update: Partial<TodoItemModel>) => {
    setTodos(todos.map((i) => (i.id === id ? { ...i, ...update } : i)));
  };

  // 刪除 TodoItem
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((i) => i.id !== id));
  };

  // 判斷 "高、中、低優先" 共3個組別
  const itemsToRender = (priorityLevel: Priority): JSX.Element[] => {
    return itemsLst
      .filter((item) => item.priority === priorityLevel)
      .map((item) => <TodoItem {...item} />);
  };

  // 判斷 "標題" 文字
  const titleToRender = (priorityLevel: Priority): string => {
    return priorityLevel === Priority.HIGH
      ? "HIGH"
      : priorityLevel === Priority.MEDIUM
      ? "MEDIUM"
      : priorityLevel === Priority.LOW
      ? "LOW"
      : "ERROR";
  };

  // 迭代 Priority 渲染 高、中、低優先 共3個組別
  const levelGroupToRender = Object.values(Priority)
    .filter((prior) => typeof prior === "number")
    .map((level) => (
      <div>
        <p className="title is-4">{titleToRender(level)}</p>
        <div className="columns is-multiline">{itemsToRender(level)}</div>
        <hr className="has-background-grey-lighter my-4"></hr>
      </div>
    ));

  return (
    <div className="columns is-multiline">
      {todos.map((item) => (
        <div className="column is-2" key={item.id}>
          <TodoItem {...item} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </div>
      ))}
    </div>
  );
};
