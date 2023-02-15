import styles from '@/styles/Home.module.css'
import FormComponent from '@/components/Form';
import { useRouter } from 'next/router'

export default function EditUser( { sectors, user }) {
  console.log(sectors, user);
  const router = useRouter()
  const { id } = router.query
  console.log(id);

  return (
    <main className={styles.main}>
      <h2>Transport Sector Test</h2>
      <FormComponent sectors={sectors} user={user} />
    </main>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps({ params }) {
  console.log("params", params);
  try {
    const API_URL = process.env.API_URL;
    const response = await fetch(`${API_URL}/api/sectors`, { method: 'GET'}, { headers: {
      "Content-Type": 
      "application/json",
    }},
  );
    const sectors = await response.json();
    const userResponse = await fetch(`${API_URL}/api/users/${params.id}`, { method: 'GET'}, { headers: {
      "Content-Type": 
      "application/json",
    }},
  )
  const user = await userResponse.json();
    return {
        props: { sectors: sectors, user: user },
    };
  } catch (e) {
    console.error(e);
  }

  // try {
  //   const user = await db.collection('users').find({ _id: new ObjectId(params.id) }).toArray();

  //   const sectors = await db
  //       .collection("sectors")
  //       .find({})
  //       .toArray();
  //   return {
  //       props: { sectors: JSON.parse(JSON.stringify(sectors)), user: JSON.stringify(user[0]) },
  //   };
  // } catch (e) {
  //   console.error(e);
  // }
}