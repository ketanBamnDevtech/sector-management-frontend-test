import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useUser from '../lib/hooks/useUser';

export default function Header () {

  const { user, mutateUser } = useUser();
  const router = useRouter();
  const handleLogout = async (event) => {
    event.preventDefault();
    mutateUser(
      await fetch('/api/session', { method: 'POST' }),
      false
    )
    router.push('/users/create');
  }

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && 
            <>
              <Nav.Link href="/">Home</Nav.Link>
              { !user?.isLoggedIn && <Nav.Link href="/users/create">Create User</Nav.Link> }
              { user?.isLoggedIn && <Nav.Link href={`/users/${user._id}`}>Profile</Nav.Link>}
            </>}
          </Nav>
          <Nav>
            { user?.isLoggedIn && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
