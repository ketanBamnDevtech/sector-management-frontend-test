import styles from '../../styles/Home.module.css'
import FormComponent from '../../components/Form';

export default function EditUser( { sectors, user }) {
  return (
    <main className={styles.main}>
      <h2>Edit User</h2>
      <FormComponent sectors={sectors} user={user} redirectTo={'/users/create'} />
    </main>
  )
}

export async function getStaticPaths() {
  try {
  const API_URL = process.env.API_URL;
  const response = await fetch(`${API_URL}/api/users`);
  const users = await response.json();

  const paths = users.map((user) => ({
    params: { id: user._id },
  }))

  return { paths, fallback: "blocking" }
  } catch (err) {
    console.error(err);
    return { paths: [], fallback: "blocking" }
  }
}

export async function getStaticProps({ params }) {
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/api/sectors`);
    const sectors = await response.json();
    const userResponse = await fetch(`${API_URL}/api/users/${params.id}`);
    const user = await userResponse.json();
    return {
        props: { sectors, user },
    };
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }
}