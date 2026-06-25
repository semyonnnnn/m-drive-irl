import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Dashboard from '../Dashboard/Index';
import Login from '../Auth/Login';

// Define the type to capture the global auth data payload passed by Laravel
interface Props extends PageProps {
  auth: {
    user: any;
  };
}

export default function Welcome({ auth }: Props) {
  return (
    <>
      <Head title="Main // SYSTEM" />

      {auth?.user ? (
        /* Target View Frame for Active Sessions */
        <AuthenticatedLayout>
          <Dashboard />
        </AuthenticatedLayout>
      ) : (
        /* Fallback Module for Anonymous Guest Terminals */
        <Login canResetPassword={false} />
      )}
    </>
  );
}