'use client';
import { supabase } from '@/services/libs/auth';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

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
      console.error('Error signing in:', error.message);
      message.error(error.message);
      return;
    }
    const accessToken = await supabase.auth.getSession();
    const token = accessToken.data.session?.access_token;
    if (token) {
      Cookies.set('access-token', token, { sameSite: 'lax' });
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
    <div className="w-[1440px] h-full flex items-center justify-center ">
      <div className="w-[43.75%] h-[68%] bg-card rounded-2xl flex items-center">
        <div className="flex justify-between items-center flex-col w-full space-y-2">
          <div className="text-center">
            <h1 className="text-[2rem] font-bold font-main">{t('title')}</h1>
            <h2 className="text-lg text-text">{t('subtitle')}</h2>
          </div>
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleSignIn}
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
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <div className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="text-text font-semibold">{t('password')}:</h3>
                  <Link href="" className="text-text font-semibold">
                    {t('forgotPassword')}
                  </Link>
                </div>
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
            <Form.Item name="remember" valuePropName="checked" className="w-[82%]">
              <Checkbox className="text-text font-semibold">{t('rememberPassword')}</Checkbox>
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
            <p className="font-semibold mt-2">
              {t('dontHaveAcc')}{' '}
              <Link href="/register" className="text-primary underline">
                {t('createAccount')}
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MainLogin;
