const randomString = (length: number = 10): string => {
  let outString: string = "";
  let inOptions: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < length; i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }
  return outString;
};

export { randomString };
