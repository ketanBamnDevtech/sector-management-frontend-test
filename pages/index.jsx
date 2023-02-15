import styles from '../styles/Home.module.css'
import { Table } from 'react-bootstrap';
import Link from 'next/link';
export default function Home( { users }) {
  return (
    <main className={styles.main}>
      <h2>Transport Sector Test</h2>
      <Table striped bordered hover variant='primary'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sectors</th>
            <th>Terms</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => 
           <tr key={i}>
              <td>{user.name}</td>
              <td>{user.related_sectors.map(s => s.name).join(", ")}</td>
              <td>{user.terms.toString()}</td>
              <td><Link href={`/users/${user._id}`}>Edit</Link></td>
          </tr>
          )}
        
        </tbody>
      </Table>
    </main>
  )
}

export async function getStaticProps() {
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/api/users`, { method: 'GET'}, { headers: {
      "Content-Type": 
      "application/json",
    }},
  );
    const users = await response.json();
    return {
        props: { users: users },
    };
  } catch (e) {
    console.error(e);
  }
}

