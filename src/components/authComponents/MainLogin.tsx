'use client';
import { supabase } from '@/services/libs/auth';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type FieldType = {
  email?: string;
  password?: string;
};

const MainLogin = () => {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const [form] = Form.useForm<FieldType>();

  const handleSignIn = async (values: FieldType) => {
    const { email, password } = values;
    if (!email || !password) {
      console.error('Please fill in all fields');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: email || '',
      password: password || '',
    });

    if (error) {
      console.error('Error signing up:', error.message);
      return;
    }
    router.replace('/dashboard');
  };
  const handleSignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error('Error signing up with Google:', error.message);
      return;
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg text-text/75 mb-10">{t('subtitle')}</p>
      <Form
        form={form}
        name="register"
        initialValues={{ remember: true }}
        onFinish={handleSignIn}
        autoComplete="off"
        layout="vertical"
        className="w-full"
      >
        <Form.Item
          label="Email Address"
          name="email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input placeholder="Enter your Email Address." />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your your password." />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            {t('loginBtn')}
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="primary"
        icon={<GoogleOutlined />}
        className="w-full"
        size="large"
        onClick={handleSignInWithGoogle}
      >
        {t('googleBtn')}
      </Button>
      <p className="text-tex-/75 mt-5">
        {t('dontHaveAcc')}{' '}
        <span className="text-primary cursor-pointer" onClick={() => router.push('/register')}>
          {t('createAccount')}
        </span>
      </p>
    </>
  );
};

export default MainLogin;
