import React from 'react';

export default function DeleteSetting() {
  const [checked, setChecked] = React.useState<boolean>(false);
  const id = React.useId()
  const handleChange = () => {
    setChecked(prev => !prev);
  };

  return <div className='p-8 flex flex-col text-white'>
    <h1 className='text-2xl font-semibold mb-4'>Delete your account</h1>
    <p className='text-sm flex-2 mb-8'>All your data will be erased and can not recoverable </p>
    <form >
      <div className='flex gap-2 mb-2'>
        <input id={id + "check"} type="checkbox" onChange={handleChange} checked={checked} />
        <label htmlFor={id + "check"}>
          I understand the consequences
        </label>
      </div>
      <button className='bg-red-400 drop-shadow-lg p-2 items-center flex font-semibold rounded-xl'>Delete Account</button>
    </form>
  </div>;
}
