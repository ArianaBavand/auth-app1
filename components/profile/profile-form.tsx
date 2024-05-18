import { useRef } from 'react';
import classes from './profile-form.module.css';

interface ProfileFormProps {
  onChangePassword: (
    data: { oldPassword: string; newPassword: string },
    clearInputs: () => void,
  ) => void;
}

export default function ProfileForm(props: ProfileFormProps) {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  function clearInputs() {
    if (oldPasswordRef.current) oldPasswordRef.current.value = '';
    if (newPasswordRef.current) newPasswordRef.current.value = '';
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current?.value;
    const enteredNewPassword = newPasswordRef.current?.value;

    if (!enteredOldPassword || !enteredNewPassword) {
      return;
    }

    props.onChangePassword(
      {
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      },
      clearInputs,
    );
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordRef}
          required
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          ref={oldPasswordRef}
          required
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}
