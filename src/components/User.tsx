import { useEffect } from 'react';
import { useGetTheme } from '../hooks/useGetTheme';

const User = () => {
  const { data, isLoading } = useGetTheme();

  const body = document.getElementsByTagName('body');
  useEffect(() => {
    if (body.length > 0 && !isLoading && data) {
      body[0].setAttribute('data-theme', data.theme);
      // Storage.Set("theme", data.theme)
    }
  }, [isLoading, body, data]);
  return <section className="opacity-0 absolute w-0 h-0 top-0 left-0"></section>;
};
export default User;
