import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

interface NavBarProps {
  onLogout: () => void;
  isLoggedIn: boolean;
  onToggleForm: () => void;
  isRegistrationToggle: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onLogout, isLoggedIn, onToggleForm, isRegistrationToggle }) => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>Authentication App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {isLoggedIn ? (
            <form onSubmit={(e) => { e.preventDefault(); onLogout(); }}>
              <Button type="submit" variant="light">Log out</Button>
            </form>
          ) : (
            <Button onClick={onToggleForm} variant="light">
              {isRegistrationToggle ? "Log in" : "Register"}
            </Button>
          )}
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;