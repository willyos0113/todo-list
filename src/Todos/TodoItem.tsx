import { faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Editor, TodoItemModel as EditorItemModel } from "./Editor";
import { TodoItemModel } from "./utils/getTodoItems";

export enum Priority {
  HIGH,
  MEDIUM,
  LOW,
}

export interface Props {
  id: string;
  title: string;
  content: string;
  priority: Priority;
  assignee?: string;
  resolved: boolean;
  updateTodo: (id: string, update: Partial<TodoItemModel>) => void;
  deleteTodo: (id: string) => void;
}

export const TodoItem: FC<Props> = ({
  id,
  title,
  content,
  priority,
  assignee,
  resolved,
  updateTodo,
  deleteTodo,
}) => {
  // 切換編輯頁面
  const [editing, setEditing] = useState<boolean>(false);

  // 根據優先程度，改變顏色
  const color = (priority: Priority, resolved: boolean): string => {
    if (resolved === true) return "is-grey"; // 已解決，灰色
    switch (priority) {
      case Priority.LOW:
        return "is-info"; // 優先度低，藍色
      case Priority.MEDIUM:
        return "is-warning"; // 優先度中，黃色
      case Priority.HIGH:
        return "is-danger"; // 優先度高，紅色
    }
  };

  const handleEditClick = () => setEditing(true); // 由當前元件執行
  const handleCancelClick = () => setEditing(false); // 由下一層 <Editor/> 執行
  const handleDeleteClick = () => deleteTodo(id); // 由當前元件執行
  const handleSaveClick = (todo: EditorItemModel) => {
    updateTodo(id, todo);
    setEditing(false);
  };

  return editing ? (
    <Editor
      {...{
        todo: {
          title,
          content,
          priority,
          resolved,
          assignee,
        },
        onSave: handleSaveClick,
        onCancel: handleCancelClick,
      }}
    />
  ) : (
    <>
      {/* 每張 todo-item 的外型 */}
      <article className={`message ${color(priority, resolved)}`}>
        <div className="message-header">
          <p>{title}</p>
          <span>
            <FontAwesomeIcon
              icon={faList}
              className="is-clickable mr-1"
              onClick={handleEditClick}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="is-clickable"
              onClick={handleDeleteClick}
            />
          </span>
        </div>
        <div className="message-body">
          <div>{content}</div>
          <div className="columns is-mobile">
            <div className="column">
              <span className="has-text-grey-light is-size-7 is-8">{id}</span>
            </div>
            <div className="column">
              <div className="has-text-right">
                {assignee ? (
                  <span className="has-text-grey-light is-size-7">{`assigned to @${assignee}`}</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
