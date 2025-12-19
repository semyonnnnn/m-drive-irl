import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { ButtonMenu } from '@/Components/Custom/ButtonMenu';
import { useTheme } from 'next-themes';

export default function Welcome({ }: PageProps<{}>) {
  const { theme, setTheme } = useTheme();
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


  function handleSetTheme(theme: string) {
    setTheme(theme);
  }

  return (
    <>
      <Head title="Main" />
      <button onClick={() => handleSetTheme('light')}>light</button>
      <button onClick={() => handleSetTheme('dark')}>dark</button>
      <ButtonMenu />
    </>
  );
}
