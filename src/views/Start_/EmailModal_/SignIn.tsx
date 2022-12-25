import { FC } from 'react';
import { useContextSelector } from 'use-context-selector';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { EmailModalContext } from '../EmailModal';
import styles from './CreateAccount.module.css';
import useGetFirebaseAuth from '@src/hooks/useGetFirebaseAuth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import useSetNotification from '@src/hooks/useSetNotification';

type ValuesT = Record<string, string>;

const CreateAccount: FC = () => {
  const setChoice = useContextSelector(EmailModalContext, (c) => c?.setChoice);
  const auth = useGetFirebaseAuth();
  const setNotification = useSetNotification();

  const validate = (values: Record<string, string>) => {
    const errors: ValuesT = {};
    const { email, password } = values;
    if (!email?.length) {
      errors.email = 'No email address entered';
    }
    if (password?.length < 10) {
      errors.password = 'Password must be at least 10 characters long';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const { email, password } = values;
      (async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (e: unknown) {
          setNotification({
            title: 'Cannot sign in',
            message: 'Invalid email / password',
            severity: 'error',
            open: true,
          });
        }
      })();
    },
    validate,
  });

  const onCancel = () => {
    setChoice('');
    formik.resetForm();
  };

  return (
    <>
      <Typography variant="h6">Sign-in with email</Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          autoComplete="off"
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="filled"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={!!formik.errors.email && formik.touched.email}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="filled"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={!!formik.errors.password && formik.touched.password}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
        <ButtonGroup fullWidth className={styles.actions}>
          <Button variant="contained" color="warning" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Signin
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export default CreateAccount;
