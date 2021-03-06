export const validateLoginInput = (username: string, password: string) => {
  const errors: any = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return { errors, valid: Object.keys(errors).length < 1 };
};
