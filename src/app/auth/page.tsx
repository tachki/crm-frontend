import dynamic from 'next/dynamic';

const Auth = dynamic(() => import('./Auth'), {
  loading: () => <p>Загрузка...</p>,
});

export default function AuthPage() {
  return (
    <Auth />
  );
}
