'use client';
import { supabase } from '@/services/libs/auth';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type FieldType = {
  email?: string;
  username?: string;
  password?: string;
};

const MainRegister = () => {
  const t = useTranslations('RegisterPage');
  const router = useRouter();
  const [form] = Form.useForm<FieldType>();

  const handleSignUp = async (values: FieldType) => {
    const { email, username, password } = values;
    if (!email || !username || !password) {
      console.error('Please fill in all fields');
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: email || '',
      password: password || '',
      options: {
        data: {
          DisplayName: username || '',
        },
      },
    });

    if (error) {
      console.error('Error signing up:', error.message);
      return;
    }
    router.replace('/dashboard');
  };
  const handleSignUpWithGoogle = async () => {
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
        onFinish={handleSignUp}
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
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Enter your your username." />
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
            {t('registerBtn')}
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="primary"
        icon={<GoogleOutlined />}
        className="w-full"
        size="large"
        onClick={handleSignUpWithGoogle}
      >
        {t('googleBtn')}
      </Button>
      <p className="text-tex-/75 mt-5">
        {t('haveAcc')}{' '}
        <span className="text-primary cursor-pointer" onClick={() => router.push('/login')}>
          {t('login')}
        </span>
      </p>
    </>
  );
};

export default MainRegister;
