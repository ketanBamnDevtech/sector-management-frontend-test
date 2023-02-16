import styles from 'styles/Home.module.css'
import FormComponent from '../../components/Form';
import useUser from '../../lib/hooks/useUser';

export default function CreateUser( { sectors }) {
  const { user } = useUser();
  return (
    <main className={styles.main}>
      <h2>Create User</h2>
      <FormComponent sectors={sectors} redirectTo = {`/users/${user?._id}`} redirectIfFound={true} />
    </main>
  )
}

export async function getStaticProps() {
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/api/sectors`, { method: 'GET'}, { headers: {
      "Content-Type": 
      "application/json",
    }},
  );
    const sectors = await response.json();
    return {
        props: { sectors: sectors },
    };
  } catch (e) {
    console.error(e);
    return { notFound: true };
  }
}