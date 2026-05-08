import React, { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { Dialog, TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export type TaskListProps = {
  title: string;
};

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      const result = await getAllTasks();

      if (result.ok) {
        setTasks(result.value as Task[]);
      } else {
        setError(result.error as string);
      }
    }

    void fetchTasks();
  }, []);

  return (
    <div className={styles.listContainer}>
      <span className={styles.listTitle}>{title}</span>

      <div className={styles.itemContainer}>
        {tasks.length === 0 ? (
          <p>No tasks yet — create one above to get started!</p>
        ) : (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        )}
      </div>

      {error && (
        <Dialog
          title="Error"
          contentClassName={styles.errorModalText}
          onClose={() => setError(null)}
        >
          {error}
        </Dialog>
      )}
    </div>
  );
}
