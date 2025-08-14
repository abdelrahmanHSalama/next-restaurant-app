import { Spin } from 'antd';

const SpinnerLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen"> 
      <Spin size="large" />
    </div>
  );
};

export default SpinnerLoading;
