'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
const Home = () => {
  const router = useRouter();
  return <Button onClick={() => router.push('/dashboard')}>dashboard</Button>;
};

export default Home;
