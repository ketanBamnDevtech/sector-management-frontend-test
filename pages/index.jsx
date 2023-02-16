import styles from '../styles/Home.module.css'
import { Table } from 'react-bootstrap';
import useUser from '../lib/hooks/useUser';

export default function Home( { users }) {
  const { user } = useUser();

  return (
    <main className={styles.main}>
      {user?.isLoggedIn && <Table striped bordered hover variant='primary'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sectors</th>
            <th>Terms</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => 
           <tr key={i}>
              <td>{user.name}</td>
              <td>{user.related_sectors.map(s => s.name).join(", ")}</td>
              <td>{user.terms.toString()}</td>
          </tr>
          )}
        
        </tbody>
      </Table>}
      { !user?.isLoggedIn && <h2>This is public page</h2>}
    </main>
  )
}

export async function getStaticProps() {
  try {
  const API_URL = process.env.API_URL;

    const response = await fetch(`${API_URL}/api/users`);
    const users = await response.json();
    return {
        props: { users: users },
    };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
}
