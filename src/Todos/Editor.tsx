import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";
import { Priority } from "./TodoItem";
import teamMembers from "./utils/team-members.json";

export interface TodoItemModel {
  title: string;
  content: string;
  priority: number;
  resolved: boolean;
  assignee?: string;
}

interface Props {
  todo?: TodoItemModel;
  onSave: (todo: TodoItemModel) => void;
  onCancel: () => void;
}

export const Editor: FC<Props> = (props) => {
  // React 狀態
  const [title, setTitle] = useState<string>(props.todo?.title ?? "");
  const [priority, setPriority] = useState<Priority>(
    props.todo?.priority ?? Priority.LOW
  );
  const [assignee, setAssignee] = useState<string>(props.todo?.assignee ?? "");
  const [content, setContent] = useState<string>(props.todo?.content ?? "");
  const [resolved, setResolved] = useState<boolean>(
    props.todo?.resolved ?? false
  );

  // 事件函數
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value);
  const handlePriorityChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPriority(parseInt(e.target.value));
  const handleAssigneeChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
    setAssignee(e.target.value);
  const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setContent(e.target.value);
  const handleResolvedChange: ChangeEventHandler<HTMLInputElement> = () =>
    setResolved(!resolved);
  const handleSaveClick: MouseEventHandler<HTMLButtonElement> = () =>
    props.onSave({ title, priority, assignee, content, resolved });

  return (
    <div className="box">
      {/* 輸入框(text) */}
      <div className="field">
        <div className="control">
          <input
            type="text"
            className="input"
            placeholder="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      </div>

      {/* 功能列(radio, option) */}
      <div className="columns is-vcentered">
        <div className="column">
          <div className="field">
            <div className="control">
              {Object.entries(Priority)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => (
                  <label className="radio" key={key}>
                    <input
                      type="radio"
                      checked={priority === value}
                      value={value}
                      onChange={handlePriorityChange}
                    />
                    {" " + key}
                  </label>
                ))}
            </div>
          </div>
        </div>
        <div className="column has-text-right">
          <div className="field">
            <div className="control">
              <div className="select">
                <select value={assignee} onChange={handleAssigneeChange}>
                  <option value="">assigned to</option>
                  {teamMembers.map((m) => (
                    <option value={m} key={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Todo-Item 主內容(textarea) */}
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            placeholder="content"
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </div>
      </div>

      <div className="columns is-vcentered">
        <div className="column">
          {/* 解決與否 checkbox 按鈕 */}
          <div className="field">
            <div className="control">
              <label>
                Resolved{" "}
                <input
                  type="checkbox"
                  checked={resolved}
                  onChange={handleResolvedChange}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="column">
          {/* 確認、取消按鈕 */}
          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <div className="buttons has-addons">
                <button className="button is-link" onClick={handleSaveClick}>
                  Save
                </button>
                <button
                  className="button is-link is-light"
                  onClick={props.onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
