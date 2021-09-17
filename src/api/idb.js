const DB_NAME = 'consumer_db';
const DB_VERSION = 1;
let DB;

export default {

  async getDb(store) {
    return new Promise((resolve, reject) => {

      if (DB) {
        return resolve(DB);
      }
      console.log('OPENING DB', DB);
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = e => {
        console.log('Error opening db', e);
        reject('Error');
      };

      request.onsuccess = e => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        let db = e.target.result;
        db.createObjectStore(store, {autoIncrement: true, keyPath: 'id'});
      };
    });
  },


  async deleteConsumer(consumer, db_field) {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction([db_field], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore(db_field);
      store.delete(consumer.id);
    });
  },


  async getConsumers(db_field) {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction([db_field], 'readonly');
      trans.oncomplete = () => {
        resolve(cats);
      };

      let store = trans.objectStore(db_field);
      let cats = [];

      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          cats.push(cursor.value)
          cursor.continue();
        }
      };

    });
  },


  async getConsumersByID() {
    // let db = await this.getDb();
    //
    // return new Promise(resolve => {
    //
    //   let trans = db.transaction(['cats'],'readonly');
    //   trans.oncomplete = () => {
    //     resolve(cats);
    //   };
    //
    //   let store = trans.objectStore('cats');
    //   let cats = [];
    //
    //   store.openCursor().onsuccess = e => {
    //     let cursor = e.target.result;
    //     if (cursor) {
    //       cats.push(cursor.value)
    //       cursor.continue();
    //     }
    //   };
    //
    // });
  },


  async saveConsumer(consumer, db_field) {
    let db = await this.getDb();
    return new Promise(resolve => {
      let trans = db.transaction([db_field], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      let store = trans.objectStore(db_field);
      store.put(consumer);
    });

  }

}