import UsersList from "./components/UsersList";
import CreateUser from "./components/CreateUser";
import UserNotification from "./components/UserNotification";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">GraphQL + Apollo</p>
        <h1>User Management Dashboard</h1>
        <p className="subtitle">
          Create users with optional profile images, view live updates, and explore a
          complete GraphQL CRUD workflow.
        </p>
      </header>

      <UserNotification />

      <main className="app-grid">
        <section className="panel panel-form">
          <CreateUser />
        </section>
        <section className="panel panel-list">
          <UsersList />
        </section>
      </main>
    </div>
  );
}

export default App;
