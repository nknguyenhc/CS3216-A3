import React, { FormEvent, ChangeEvent } from 'react';
import { Form, Button } from 'react-bootstrap';

interface AuthFormProps {
  isRegistration: boolean;
  email: string;
  username: string;
  password: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isRegistration,
  email,
  username,
  password,
  onEmailChange,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => (
  <Form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
    <Form.Group className="mb-4">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={onEmailChange}
        className="border rounded-md"
      />
      <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
    </Form.Group>
    {/*isRegistration &&*/ (
      <Form.Group className="mb-4">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={onUsernameChange}
          className="border rounded-md"
        />
      </Form.Group>
    )}
    <Form.Group className="mb-4">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        className="border rounded-md"
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
);

export default AuthForm;