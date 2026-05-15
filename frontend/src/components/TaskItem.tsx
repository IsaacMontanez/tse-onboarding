import React, { useState } from "react";
import { updateTask } from "src/api/tasks";
import { CheckButton, Dialog } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export type TaskItemProps = {
  task: Task;
  onUpdate: () => void;
};

export function TaskItem({ task: initialTask, onUpdate }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleToggleCheck = async () => {
    console.log("TASK BEFORE UPDATE:", task); // ← ADD THIS LINE
    setLoading(true);

    const result = await updateTask({
      ...task,
      isChecked: !task.isChecked,
    });

    if (result.success) {
      setTask(result.data);
      onUpdate(); // 👈 trigger parent refresh
    } else {
      setErrorMessage(result.error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.item}>
      {errorMessage && (
        <Dialog title="Error" body={errorMessage} onClose={() => setErrorMessage(null)} />
      )}

      <CheckButton
        checked={task.isChecked}
        onPress={() => void handleToggleCheck()}
        disabled={isLoading}
      />

      <div
        className={
          task.isChecked ? `${styles.textContainer} ${styles.checked}` : styles.textContainer
        }
      >
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
