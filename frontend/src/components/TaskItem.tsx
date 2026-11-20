import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks";
import { CheckButton, Dialog, UserTag } from "src/components";
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
    setLoading(true);

    const result = await updateTask({
      _id: task._id,
      title: task.title,
      description: task.description,
      isChecked: !task.isChecked,
      dateCreated: task.dateCreated,
      assignee: task.assignee?._id,
    });

    if (result.success) {
      setTask(result.data);
      onUpdate();
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
        <Link className={styles.titleLink} to={`/task/${task._id}`}>
          <span className={styles.title}>{task.title}</span>
        </Link>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>

      <UserTag className={styles.userTag} user={task.assignee} />
    </div>
  );
}
