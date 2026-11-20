import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

export type UserTagProps = {
  user?: User | null;
  className?: string;
};

/**
 * Displays a user's profile picture and name, or a "Not assigned" placeholder
 * when no user is provided.
 */
export function UserTag({ user, className }: UserTagProps) {
  const rootClass = className ? `${styles.userTag} ${className}` : styles.userTag;

  if (!user) {
    return <div className={rootClass}>Not assigned</div>;
  }

  const profilePictureURL = user.profilePictureURL || "/userDefault.svg";

  return (
    <div className={rootClass}>
      <img
        className={styles.profilePicture}
        src={profilePictureURL}
        alt={`${user.name}'s profile`}
      />
      <span className={styles.name}>{user.name}</span>
    </div>
  );
}
