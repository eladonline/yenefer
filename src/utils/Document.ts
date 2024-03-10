class DocumentUtility {
  getCookie(key: string): string {
    return this.cookies.get(key);
  }

  get cookies() {
    const cookies = document?.cookie?.split(";");
    const nextMap = new Map();
    cookies.forEach((item) => {
      const [key, value] = item.split("=");
      nextMap.set(key.trim(), value);
    });
    return nextMap;
  }

  set cookie(value: `${string}=${string}`) {
    document.cookie = value;
  }

  remove(key: string) {
    const cookie = this.cookies.get(key);
    this.cookie = `${key}=${cookie};expires=0`;
  }
}

export default DocumentUtility;
