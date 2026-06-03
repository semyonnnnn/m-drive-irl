import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { NavButtonsMenu } from '@/components/custom/NavButtonsMenu';
// import Guest from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Dashboard from '../Dashboard/Index';

export default function Welcome({ }: PageProps<{}>) {
  const handleImageError = () => {
    document
      .getElementById('screenshot-container')
      ?.classList.add('!hidden');
    document.getElementById('docs-card')?.classList.add('!row-span-1');
    document
      .getElementById('docs-card-content')
      ?.classList.add('!flex-row');
    document.getElementById('background')?.classList.add('!hidden');
  };



  return (
    <>
      <Head title="Main" />
      <AuthenticatedLayout >
        <Dashboard />
      </AuthenticatedLayout>
    </>
  );
}
