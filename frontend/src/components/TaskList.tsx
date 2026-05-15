import { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { Dialog, TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export type TaskListProps = {
  title: string;
  refresh: number;
  onUpdate: () => void; // 👈 add this
};

export function TaskList({ title, refresh, onUpdate }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log("TASKLIST TASKS:", tasks);

  useEffect(() => {
    async function fetchTasks() {
      const result = await getAllTasks();

      if (result.success) {
        setTasks(result.data);
      } else {
        setError(result.error);
      }
    }

    void fetchTasks();
  }, [refresh]);

  return (
    <div className={styles.listContainer}>
      <span className={styles.listTitle}>{title}</span>

      <div className={styles.itemContainer}>
        {tasks.length === 0 ? (
          <p>No tasks yet — create one above to get started!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={onUpdate} // 👈 forward the callback
            />
          ))
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
