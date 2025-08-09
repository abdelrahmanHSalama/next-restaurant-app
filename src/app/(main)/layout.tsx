import { Layout } from 'antd';
import { Header, Sidebar } from '@/components/layouts';
import { Content } from 'antd/es/layout/layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content className="p-4 md:p-[30px]">{children}</Content>
      </Layout>
    </Layout>
  );
}
