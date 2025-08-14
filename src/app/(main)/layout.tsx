import { Layout } from 'antd';
import { Header, Sidebar } from '@/components/layouts';
import { Content } from 'antd/es/layout/layout';
import { ProtectedRoute } from '@/components/shared/indexServer';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ProtectedRoute>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Header />
          <Content className="p-4 md:p-[30px]">{children}</Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
}
