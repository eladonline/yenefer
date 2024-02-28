class Utility {
  get cookie() {
    return this.getCookie();
  }
  getCookie() {
    const cookies = document?.cookie?.split(";");
    const nextMap = new Map();
    cookies.forEach((item) => {
      const [key, value] = item.split("=");
      nextMap.set(key, value);
    });
    return nextMap;
  }
}

export default Utility;
