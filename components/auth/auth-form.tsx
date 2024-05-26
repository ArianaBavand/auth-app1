import { useState, useRef, useEffect } from 'react';
import classes from './auth-form.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

async function createUser(email: string, password: string) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailInputRef.current && passwordInputRef.current) {
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
    }
  }, [isLogin]);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setError(null);
    setSuccess(null);
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (enteredEmail && enteredPassword) {
      if (isLogin) {
        const result = await signIn('credentials', {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });
        if (result?.error) {
          setError(result.error || 'Invalid credentials');
          setSuccess(null);
        } else {
          router.replace('/profile');
        }
      } else {
        try {
          const result = await createUser(enteredEmail, enteredPassword);
          console.log(result);
          setSuccess('Sign up successful! You can log in now.');
          setError(null);
        } catch (error: any) {
          setError(error.message || 'Something went wrong');
          setSuccess(null);
        }
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'please Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        {error && <p className={classes.error}>{error}</p>}
        {success && <p className={classes.success}>{success}</p>}
      </form>
    </section>
  );
}
