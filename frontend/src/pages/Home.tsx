import { useState } from "react";
import { Link } from "react-router-dom";
import { Page, TaskForm, TaskList } from "src/components";

export function Home() {
  const [refresh, setRefresh] = useState(0);

  return (
    <Page>
      <title>Home | TSE Todos</title>

      <Link to="/about">About this app</Link>

      <TaskForm mode="create" onSubmit={() => setRefresh(refresh + 1)} />

      <TaskList title="All tasks" refresh={refresh} onUpdate={() => setRefresh(refresh + 1)} />
    </Page>
  );
}
