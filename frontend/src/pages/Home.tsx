import { useState } from "react";
import { Link } from "react-router-dom";
import { Page, TaskForm, TaskList } from "src/components";

export function Home() {
  const [refresh, setRefresh] = useState(0);

  return (
    <Page>
      <title>Home | TSE Todos</title>

      <p>
        <Link to="/about">About this app</Link>
      </p>

      <TaskForm mode="create" onSuccess={() => setRefresh(refresh + 1)} />

      <TaskList title="My Tasks" refresh={refresh} onUpdate={() => setRefresh(refresh + 1)} />
    </Page>
  );
}
