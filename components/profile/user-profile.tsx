import { useState } from 'react';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { SessionProvider } from 'next-auth/react';

export default function UserProfile() {
  return (
    <SessionProvider>
      <UserProfileContent />
    </SessionProvider>
  );
}

function UserProfileContent() {
  const [passwordUpdateError, setPasswordUpdateError] = useState<string | null>(
    null,
  );
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState<
    string | null
  >(null);

  async function changePasswordHandler(
    passwordData: { oldPassword: string; newPassword: string },
    clearInputs: () => void,
  ) {
    setPasswordUpdateError(null);
    setPasswordUpdateSuccess(null);

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify(passwordData),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setPasswordUpdateSuccess('Password updated successfully.');
      clearInputs(); // Clear the input fields on success
    } catch (error: any) {
      setPasswordUpdateError(error.message || 'Something went wrong');
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
      {passwordUpdateError && (
        <p className={classes.error}>{passwordUpdateError}</p>
      )}
      {passwordUpdateSuccess && (
        <p className={classes.success}>{passwordUpdateSuccess}</p>
      )}
    </section>
  );
}
