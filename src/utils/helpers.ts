const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomId = () => {
  let id = "";

  for (let i = 0; i < 8; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return id;
};

export const capitalizeFirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
