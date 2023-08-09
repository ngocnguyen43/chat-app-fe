export class Storage {
    public static Set<T>(key: string, item: T) {
        localStorage.setItem(key, JSON.stringify(item))
    }
    public static Get(key: string) {
        return localStorage.getItem(key)
    }
    public static Clear() {
        localStorage.clear()
    }
}