export class DataBase {

  constructor(dbConfig, storeConfig) {
    this.dbName = dbConfig.dbName;
    this.dbVersion = dbConfig.version;
    this.storeName = storeConfig.storeName;
    this.keyPath = storeConfig.keyPath;
    this.indexList = storeConfig.indexList;

    this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    this.db = null;

    this.createStore().then(res => {
      console.log(res.message);
    });
  }

  /**
   * 创建store
   */
  createStore() {
    const request = this.indexedDB.open(this.dbName, this.dbVersion);

    return new Promise(resolve => {

      /**
       * 创建数据库失败事件
       */
      request.onerror = () => {
        resolve({
          status: false,
          message: `DataBase '${this.dbName}' connected failed`
        });
      };

      /**
       * 创建数据库成功事件
       */
      request.onsuccess = e => {
        this.db = e.currentTarget.result;
        resolve({
          status: true,
          message: `DataBase '${this.dbName}' connected success`
        });
      };

      /**
       * 数据库版本改变事件
       */
      request.onupgradeneeded = e => {
        let db = e.currentTarget.result;
        let storeName = this.storeName;
        if (!db.objectStoreNames.contains(storeName)) {
          let objectStore = db.createObjectStore(storeName, { keyPath: this.keyPath });
          this.indexList.map(item => {
            objectStore.createIndex(item, item, { unique: false });
          });
          resolve({
            status: true,
            message: `ObjectStore '${storeName}' created success`
          });
        }
      }

    });
  }

  /**
   * 添加数据
   * @param {Object} data 
   */
  add(data) {
    let storeName = this.storeName;
    let openRequest = this.indexedDB.open(this.dbName, this.dbVersion);

    return new Promise(resolve => {

      /**
       * 打开数据库成功事件
       */
      openRequest.onsuccess = e => {
        let db = e.currentTarget.result;
        let store = db.transaction(storeName, 'readwrite').objectStore(storeName);
        let addAction = store.add(data);

        /**
         * 添加数据失败事件
         */
        addAction.onerror = () => {
          resolve({
            status: false,
            message: '数据库中已有该数据',
            data: data
          });
        };

        /**
         * 添加数据成功事件
         */
        addAction.onsuccess = () => {
          resolve({
            status: true,
            message: '数据已存入数据库',
            data: data
          });
        };

      }

    });
  }

  /**
   * 查询所有数据
   */
  getAll() {
    let resultList = [];
    let storeName = this.storeName;
    let openRequest = this.indexedDB.open(this.dbName, this.dbVersion);

    return new Promise(resolve => {

      /**
       * 打开数据库成功事件
       */
      openRequest.onsuccess = e => {
        let db = e.currentTarget.result;
        let objectStore = db.transaction(storeName).objectStore(storeName);

        /**
         * 打开游标成功事件
         */
        objectStore.openCursor().onsuccess = e => {
          var cursor = e.currentTarget.result;
          if (cursor) {
            resultList.push(cursor.value);
            cursor.continue();
          } else {
            /**
             * 遍历完毕游标，返回查询到的数据
             */
            resolve({
              status: true,
              message: '查询成功',
              data: resultList
            });
          }
        };
      };

    });

  }

  /**
   * 查询数据
   * @param {any} query 
   */
  getData(query) {
    let storeName = this.storeName;
    let openRequest = this.indexedDB.open(this.dbName, this.dbVersion);

    return new Promise(resolve => {

      /**
       * 打开数据库成功事件
       */
      openRequest.onsuccess = e => {
        let db = e.currentTarget.result;
        let store = db.transaction(storeName, 'readwrite').objectStore(storeName);
        let request = store.get(query);
        let result;

        /**
         * 查询store成功事件
         */
        request.onsuccess = e => {
          result = e.target.result;
          if (typeof result === 'undefined') {
            /**
             * 未查询到数据
             */
            resolve({
              status: false,
              message: '查询失败',
              data: null
            });
          } else {
            /**
             * 数据查询成功
             */
            resolve({
              status: true,
              message: '查询成功',
              data: result
            });
          }
        };
      }

    });

  }

  /**
   * 生成key
   */
  genaratorKey() {
    let num = Math.round(Math.random() * 10);
    let timestamp = new Date().getTime();
    return timestamp + num.toString();
  }

  /**
   * 更新数据
   * @param {String} key 
   * @param {JSON} data 
   */
  update(key, data) {
    let storeName = this.storeName;
    let openRequest = this.indexedDB.open(this.dbName, this.dbVersion);

    return new Promise(resolve => {

      /**
       * 打开数据库成功事件
       */
      openRequest.onsuccess = e => {
        let db = e.currentTarget.result;

        let store = db.transaction(storeName, 'readwrite').objectStore(storeName);
        let request = store.get(key);

        /**
         * 查询数据成功事件
         */
        request.onsuccess = e => {
          let res = e.target.result;
          if (typeof res !== 'undefined') {
            for (let prop in data) {
              res[`${prop}`] = data[prop];
            }
            store.put(res)
            resolve({
              status: true,
              message: '数据更新成功',
              data: res
            });
          } else {
            resolve({
              status: false,
              message: '数据更新失败',
              data: null
            });
          }
        };
      }

    });

  }

  /**
   * 删除数据
   * @param {Object} key
   */
  delete(key) {
    let storeName = this.storeName;
    let openRequest = this.indexedDB.open(this.dbName, this.dbVersion);

    return new Promise(resolve => {

      /**
       * 打开数据库成功事件
       */
      openRequest.onsuccess = e => {
        let db = e.currentTarget.result;

        let store = db.transaction(storeName, 'readwrite').objectStore(storeName);
        let request = store.delete(key);

        /**
         * 删除数据成功事件
         */
        request.onsuccess = e => {
          let res = e.target.result;
          if (typeof res !== 'undefined') {
            resolve({
              status: true,
              message: '数据删除成功',
              data: res
            });
          } else {
            resolve({
              status: false,
              message: '数据删除失败',
              data: null
            });
          }
        }

      }

    });

  }


}




