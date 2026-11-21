import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTask } from "src/api/tasks";
import { Button, Page, TaskForm, UserTag } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

import type { Task } from "src/api/tasks";

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = () => {
    if (!task) return;
    deleteTask(task._id)
      .then((result) => {
        if (result.success) {
          void navigate("/");
        } else {
          setDeleteError(result.error);
        }
      })
      .catch((error: unknown) => setDeleteError(String(error)));
  };

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      return;
    }

    setNotFound(false);
    setIsEditing(false);

    getTask(id)
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          setTask(null);
          setNotFound(true);
        }
      })
      .catch(() => {
        setTask(null);
        setNotFound(true);
      });
  }, [id]);

  const formatDateCreated = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(date);

  if (notFound || (!task && id === undefined)) {
    return (
      <Page>
        <title>Task not found | TSE Todos</title>
        <p className={styles.backLink}>
          <Link to="/">Back to home</Link>
        </p>
        <p className={styles.notFound}>This task doesn&apos;t exist!</p>
      </Page>
    );
  }

  if (!task) {
    return (
      <Page>
        <title>Loading... | TSE Todos</title>
        <p className={styles.backLink}>
          <Link to="/">Back to home</Link>
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <title>{`${task.title} | TSE Todos`}</title>
      <p className={styles.backLink}>
        <Link to="/">Back to home</Link>
      </p>

      {isEditing ? (
        <TaskForm
          mode="edit"
          task={task}
          onSubmit={(updatedTask) => {
            setTask(updatedTask);
            setIsEditing(false);
          }}
        />
      ) : (
        <div className={styles.detail}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{task.title}</h1>
            <Button kind="primary" label="Edit task" onClick={() => setIsEditing(true)} />
            <Button kind="secondary" label="Delete task" onClick={handleDelete} />
          </div>
          {deleteError && <p className={styles.description}>{deleteError}</p>}

          {task.description ? (
            <p className={styles.description}>{task.description}</p>
          ) : (
            <p className={styles.description}>(No description)</p>
          )}

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Assignee</span>
            <UserTag user={task.assignee} />
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Status</span>
            <span className={styles.fieldValue}>{task.isChecked ? "Done" : "Not done"}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Date created</span>
            <span className={styles.fieldValue}>{formatDateCreated(task.dateCreated)}</span>
          </div>
        </div>
      )}
    </Page>
  );
}
