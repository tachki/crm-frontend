import dynamic from 'next/dynamic';

const Feed = dynamic(() => import('./Feed'), {
  loading: () => <p>Загрузка...</p>,
});

export default function FeedPage() {
  return (
    <Feed />
  );
}
