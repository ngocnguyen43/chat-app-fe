import { openDB, deleteDB } from "idb"
export class IDB {
    private async openDb() {
        return await openDB("chat-storage", 1, {
            upgrade(database, oldVersion, newVersion, transaction, event) {
                database.createObjectStore("keys")
            }
        })
    }
    public async SAVE(data: string) {
        const db = await this.openDb()

    }
    public async GET(key: string) { }
}   