export const range = size => [...Array(size).keys()];

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const urlToTitle = str => capitalize(str.replace(/-/i, ' '));

export const generateId = () =>
  Math.random()
    .toString(36)
    .substring(2);

export const validateEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
