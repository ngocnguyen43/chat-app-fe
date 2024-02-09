export class Storage {
  public static Set<T extends string>(key: string, item: T) {
    if (typeof item === 'string') {
      localStorage.setItem(key, item);
      return;
    }
    console.log('set');

    localStorage.setItem(key, JSON.stringify(item));
  }

  public static Get(key: string) {
    return localStorage.getItem(key);
  }

  public static Del(key: string) {
    return localStorage.removeItem(key);
  }

  public static Clear() {
    localStorage.clear();
  }
}
