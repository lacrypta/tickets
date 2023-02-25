const randomString = (length: number = 10): string => {
  let outString: string = "";
  let inOptions: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < length; i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }
  return outString;
};

const getTicketId = (text: string): string | null => {
  const matched = text.match(/\/entrada\/([\d\w]+)$/);
  return matched ? matched[1] : null;
};

const removeDuplicates = (list: string[]) => {
  const seen: any = {};
  return list.filter(function (item) {
    // eslint-disable-next-line no-prototype-builtins
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
};

export { randomString, getTicketId, removeDuplicates };
