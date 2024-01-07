import React from 'react';
import { InfinitySpin, Oval, Triangle  } from 'react-loader-spinner';

const Loader: React.FC = () => {
  
  return (
    <>
    <div className='flex items-center justify-center h-screen'>
    <Oval
  visible={true}
  height="90"
  width="90"
  color="#424242"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
    </>
  );
};

export default Loader;
