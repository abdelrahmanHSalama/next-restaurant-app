import { Button, Checkbox, Input } from 'antd';
import Link from 'next/link';

const Login = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-primary">
      <div className="w-[1440px] h-full flex items-center justify-center ">
        <div className="w-[43.75%] h-[68%] bg-card rounded-2xl flex items-center">
          <div className="flex justify-between items-center flex-col w-full space-y-2">
            <div className="text-center">
              <h1 className="text-[2rem] font-bold font-main">Login to Account</h1>
              <h2 className="text-lg text-text">
                Please enter your email and password to continue
              </h2>
            </div>
            <div className="w-[82%] space-y-1">
              <h3 className="text-text font-semibold">Email address:</h3>
              <Input
                className="w-full"
                style={{
                  backgroundColor: 'var(--color-auth-input)',
                  height: 56,
                }}
              ></Input>{' '}
            </div>
            <div className="w-[82%] space-y-1">
              <div className="flex justify-between">
                <h3 className="text-text font-semibold">Password:</h3>
                <Link href="" className="text-text font-semibold">
                  Forget Password?
                </Link>
              </div>
              <Input
                className="w-full"
                style={{
                  backgroundColor: 'var(--color-auth-input)',
                  height: 56,
                }}
              ></Input>{' '}
              <Checkbox className="text-text font-semibold">Remember Password</Checkbox>
            </div>
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
            >
              Sign In
            </Button>
            <p className="font-semibold">
              Don’t have an account?{' '}
              <Link href="" className="text-primary underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
