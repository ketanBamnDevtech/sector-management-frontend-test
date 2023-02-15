import styles from '../../styles/Home.module.css'
import FormComponent from '../../components/Form';
import { useRouter } from 'next/router'

export default function EditUser( { sectors, user }) {
  const router = useRouter()
  const { id } = router.query

  return (
    <main className={styles.main}>
      <h2>Edit User</h2>
      <FormComponent sectors={sectors} user={user} />
    </main>
  )
}

export async function getStaticPaths() {
  const API_URL = process.env.API_URL;
  const response = await fetch(`${API_URL}/api/users`);
  const users = await response.json();

  const paths = users.map((user) => ({
    params: { id: user._id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/api/sectors`);
    const sectors = await response.json();
    const userResponse = await fetch(`${API_URL}/api/users/${params.id}`);
    const user = await userResponse.json();
    return {
        props: { sectors: sectors, user: user },
    };
  } catch (e) {
    console.error(e);
  }
}