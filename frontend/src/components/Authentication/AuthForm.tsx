import React, { FormEvent, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";

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
  <Form onSubmit={onSubmit} className="w-full px-10">
    <Form.Group className="mb-4">
      <Form.Label className="block">Email</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={onEmailChange}
        className="w-full py-2 px-3 border rounded-md bg-gray-100"
      />
    </Form.Group>
    {
      <Form.Group className="mb-4">
        <Form.Label className="block">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={onUsernameChange}
          className="w-full py-2 px-3 border rounded-md bg-gray-100"
        />
      </Form.Group>
    }
    <Form.Group className="mb-4">
      <Form.Label className="block">Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        className="w-full py-2 px-3 border rounded-md bg-gray-100"
      />
    </Form.Group>
    <Button
      className="w-full py-2 px-3 border rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      variant="primary"
      type="submit"
    >
      {isRegistration ? "Register" : "Sign In"}
    </Button>
  </Form>
);

export default AuthForm;
