'use client';
import { supabase } from '@/services/libs/auth';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

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
    const accessToken = await supabase.auth.getSession();
    const token = accessToken.data.session?.access_token;
    if (token) {
      Cookies.set('access-token', token, { sameSite: 'lax' });
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
      {/* <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
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
      </p> */}
      <div className="w-[1440px] flex items-center justify-center ">
        <div className="w-[43.75%] h-[68%] bg-card rounded-2xl flex items-center">
          <div className="flex justify-between items-center flex-col w-full space-y-2">
            <div className="text-center">
              <h1 className="text-[2rem] font-bold font-main">{t('title')}</h1>
              <h2 className="text-lg text-text">{t('subtitle')}</h2>
            </div>
            <Form
              form={form}
              name="register"
              initialValues={{ remember: true }}
              onFinish={handleSignUp}
              className="w-full flex flex-col justify-center items-center"
            >
              <Form.Item
                className="w-[82%]"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <div className="space-y-1">
                  <h3 className="text-text font-semibold">{t('email')}:</h3>
                  <Input
                    className="w-full"
                    style={{
                      backgroundColor: 'var(--color-auth-input)',
                      height: 56,
                    }}
                    type="email"
                    autoComplete="email"
                    placeholder="user@example.com"
                  ></Input>
                </div>
              </Form.Item>
              <Form.Item
                className="w-[82%]"
                name="username"
                rules={[{ required: true, message: 'Please enter your username!' }]}
              >
                <div className="space-y-1">
                  <h3 className="text-text font-semibold">{t('username')}:</h3>
                  <Input
                    className="w-full"
                    style={{
                      backgroundColor: 'var(--color-auth-input)',
                      height: 56,
                    }}
                    placeholder="User"
                  ></Input>
                </div>
              </Form.Item>
              <Form.Item
                className="w-[82%]"
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <div className="space-y-1">
                  <h3 className="text-text font-semibold">{t('password')}:</h3>
                  <Input.Password
                    className="w-full"
                    style={{
                      backgroundColor: 'var(--color-auth-input)',
                      height: 56,
                    }}
                    autoComplete="current-password"
                    placeholder="••••••••"
                  ></Input.Password>
                </div>
              </Form.Item>
              <Button
                className="w-[66%] font-bold"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 16,
                  height: 56,
                  marginTop: 16,
                }}
                htmlType="submit"
              >
                {t('loginBtn')}
              </Button>
              <Button
                type="link"
                icon={<GoogleOutlined />}
                className="w-[82%]"
                size="large"
                onClick={handleSignUpWithGoogle}
              >
                {t('googleBtn')}
              </Button>
              <p className="font-semibold mt-2">
                {t('haveAcc')}{' '}
                <Link href="" className="text-primary underline">
                  {t('login')}
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRegister;
