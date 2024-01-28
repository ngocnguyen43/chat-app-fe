import { env } from '../config';

export const GetImageUrl = async (id: string) => {
  const res = await fetch(`${env.BACK_END_URL}/file/img/` + id);
  return (await res.json()) as string;
};
