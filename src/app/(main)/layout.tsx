import { Layout } from 'antd';
import { Header, Sidebar } from '@/components/layouts';
import { Content } from 'antd/es/layout/layout';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetchedCookies = await cookies();
  const token = fetchedCookies.get('access-token')?.value;
  if (!token) {
    redirect('/login');
  }

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content className="p-4 md:p-[30px]">{children}</Content>
      </Layout>
    </Layout>
  );
}
