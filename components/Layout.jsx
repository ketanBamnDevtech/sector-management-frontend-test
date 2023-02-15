import Header from './Header';
import Container from 'react-bootstrap/Container';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
    </>
  )
}
