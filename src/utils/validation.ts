export const validatePassword = (password: string) => {
  let error = '';

  if (!/[A-Z]+/.test(password)) {
    error = 'There must be one capital letter';
  }
  if (!/[0-9]+/.test(password)) {
    error = 'there must be at least one digit';
  }
  if (!/[a-z]/.test(password)) {
    error = 'There must be one lowercase letter';
  }
  if (/[а-я]/.test(password)) {
    error = "Can't use Cyrillic";
  }
  if (password.length < 8) {
    error = 'Password must be longer than 8 сharacters';
  }
  if (!password) {
    error = 'Required';
  }

  return error;
};

export const validateLogin = (login: string) => {
  let error = '';

  if (!login) {
    error = 'Required';
  }
  return error;
};
