var DB = {
    newDB: function () {
        var db_manager = {};
        db_manager.db = null;
        db_manager.datas = [];
        db_manager.size=0;
        db_manager.valueByKey;
        db_manager.resByVal;
        //创建或打开数据库
        db_manager.createDB = function (name, storeName, key = null) {
            var request = window.indexedDB.open(name);
            request.onerror = function (e) {
                console.log(e.currentTarget.error.message);
            }
            request.onsuccess = function (e) {
                db_manager.db = e.target.result;
            }
            request.onupgradeneeded = function (e) {
                console.log("upgrade");
                db_manager.db = e.target.result;
                if (!db_manager.db.objectStoreNames.contains(storeName)) {
                    var store = db_manager.db.createObjectStore(storeName, { keyPath: key });
                    store.createIndex("meaning", "meaning", { unique: false });
                }
            }
        }
        //关闭数据库
        db_manager.closeDB = function () {
            db_manager.db.close();
        }
        //删除数据库
        db_manager.deleteDB = function (name) {
            var request = indexedDB.deleteDatabase(name);
            request.onsuccess = function () {
                console.log("delete db success");
            };
            request.onerror = function (e) {
                console.log("delete db failed:");
            }
        }
        //添加数据
        db_manager.addData = function (storeName, obj) {
            var transaction = db_manager.db.transaction(storeName, 'readwrite');
            var store = transaction.objectStore(storeName);
            var request = store.put(obj);
            request.onsuccess = function (e) {
                console.log("add success:", e.target.result);
            }
            request.onerror = function (e) {
                console.log("add error");
            }
        }
        //删除数据
        db_manager.deleteData = function (storeName, key) {
            var store = db_manager.db.transaction(storeName, 'readwrite').objectStore(storeName);
            var request = store.delete(key);
            request.onsuccess = function (e) {
                console.log("delete success");
            }
            request.onerror = function () {
                console.log("delete failed");
            }
        }
        //通过key获取数据
        db_manager.getDataByKey = function (storeName, key) {
            var request = db_manager.db.transaction(storeName).objectStore(storeName).get(key);
            request.onsuccess = function (e) {
                console.log("getdatabykey success", e.target.result);
                db_manager.valueByKey=e.target.result;
            }
            request.onerror = function () {
                console.log("getdatabykey failed")
            }
        }
        //遍历数据
        db_manager.reverseData = function (storeName) {
            var request = db_manager.db.transaction(storeName).objectStore(storeName).getAll()
            request.onsuccess = function (e) {
                console.log("getAll success", e.target.result);
                db_manager.datas = e.target.result;
                db_manager.length=e.target.result.length;
            }
            request.onerror = function () {
                console.log("getAll failed");
            }
        }
        //通过值获取数据
        db_manager.getDataByValue = function (storeName, indexName, value) {
            var index = db_manager.db.transaction(storeName).objectStore(storeName).index(indexName);
            value = IDBKeyRange.only(value);
            index.openCursor(value).onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    console.log(cursor.value);
                    db_manager.resByVal=cursor.value;
                    cursor.continue();
                }else{
                    console.log("no");
                }
            }
        }
        return db_manager;
    }
}