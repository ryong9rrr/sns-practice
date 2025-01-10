import * as bcrypt from 'bcrypt';

export const hash = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const isMatch = (a: string, b: string) => {
  return bcrypt.compareSync(a, b);
};
