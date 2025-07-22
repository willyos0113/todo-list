import "bulma/css/bulma.min.css";
import { TodoList } from "./Todos/TodoList";

export const App = () => {
  return (
    <section className="section">
      <TodoList />
    </section>
  );
};
