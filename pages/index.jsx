import styles from '../styles/Home.module.css'
import { Table } from 'react-bootstrap';
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../lib/session';

export default function Home( { users }) {
  return (
    <main className={styles.main}>
      {users && <Table striped bordered hover variant='primary'>
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
    </main>
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  try {
  const user = req.session.user;
  const API_URL = process.env.API_URL;

  if (user === undefined) {
    res.setHeader('location', '/users/create')
    res.statusCode = 301
    res.end()
    return {
      props: {
        user: { isLoggedIn: false },
      },
    }
  } else {
    const response = await fetch(`${API_URL}/api/users`, { method: 'GET'}, { headers: {
      "Content-Type": 
      "application/json",
    }});
    const users = await response.json();
    return {
        props: { users: users },
    };
  }
} catch (err) {
  console.error(err);
  return { notFound: true };
}
},
sessionOptions)