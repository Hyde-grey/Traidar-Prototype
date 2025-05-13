import { useEffect, useState } from 'react';
import { 
  Flex, 
  TextField, 
  Button, 
  Text,
  useAuthenticator
} from '@aws-amplify/ui-react';
import { signUp as amplifySignUp } from 'aws-amplify/auth';
import styles from './Login.module.css';

export function CustomSignUp() {
  const { toSignIn } = useAuthenticator();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear error when inputs change
  useEffect(() => {
    if (error) setError('');
  }, [email, password, confirmPassword, nickname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!email || !password || !confirmPassword || !nickname) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (nickname.length < 2) {
      setError('Nickname must be at least 2 characters');
      return;
    }

    try {
      setIsSubmitting(true);
      await amplifySignUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            nickname
          },
          autoSignIn: true
        }
      });
      // After successful signup, redirect to sign in
      toSignIn();
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.signupForm}>
      <Flex direction="column" gap="1rem">
        <Text variation="primary" fontSize="1.5rem" fontWeight="bold">
          Create an account
        </Text>
        
        {error && (
          <Text variation="error" fontSize="0.875rem">
            {error}
          </Text>
        )}
        
        <TextField
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <TextField
          label="Nickname"
          name="nickname"
          placeholder="Choose a nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        
        <TextField
          label="Password"
          name="password"
          placeholder="Create a password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <TextField
          label="Confirm Password"
          name="confirm-password"
          placeholder="Confirm your password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        <Button type="submit" variation="primary" isLoading={isSubmitting}>
          Sign Up
        </Button>
        
        <Flex justifyContent="center">
          <Text fontSize="0.875rem">
            Already have an account?{' '}
            <Button
              variation="link"
              onClick={toSignIn}
              fontWeight="normal"
              padding="0"
            >
              Sign In
            </Button>
          </Text>
        </Flex>
      </Flex>
    </form>
  );
}