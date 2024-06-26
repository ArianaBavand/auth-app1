import { getServerSession } from 'next-auth/next';
import UserProfile from '../components/profile/user-profile';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from './api/auth/[...nextauth]';

export default function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
