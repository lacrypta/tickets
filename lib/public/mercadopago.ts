export const isMercadoPagoLink = (link: string) => {
  try {
    const url = new URL(link);
    return url.origin == "https://mpago.la";
  } catch (e) {
    return false;
  }
};
