/**
 * Game DB API for using IndexedDb
 */

class SongDB {
    constructor() {
        //console.log('GameDB API Initiated');
        this.db = null;
        this.isAvailable = false;
    }


open() {

    return new Promise((resolve,reject) => {
         //console.log(window);

    //Validate whether the indexedDB object is available
    if('indexedDB' in window){
         //open/creates the database
        const request = indexedDB.open('Songs',1);
        //console.log('Request:',request);
        // Handles the errors when opening/creating the database

        request.onerror = (event) => {
            //console.log('Error event:',event);
            //console.log('Error message:',event.target.error.message);
            reject(event.target.error.message);
        }

        //handle the success when opening / creating the database
        request.onsuccess = (event) => {
            //console.log('Success event:',event);
            const db = event.target.result;
            //console.log('Database:',db);
            if (db) {
                this.db = db;
                this.isAvailable = true;
                resolve();
            }else{
                reject('The database is not available');
            }
        }

        //Handles the database update
        request.onupgradeneeded = (event) => {
            //console.log("on upgrade:", event);
            const db = event.target.result;
            const objectStore = db.createObjectStore('SongList',{keyPath: 'id'}); //autoIncrement: true
            //console.log('Object Store:',objectStore);


            // creating the indexes
            objectStore.createIndex('title','title');
            objectStore.createIndex('artist','artist');
        }
    }else{
        reject("Your browser doesn't support IndexedDB");
    }
});


       

    

    
}
   

add(title,genre,hasFinished) {
    return new Promise((resolve,reject) => {
      
            //let isSuccess = false;
        
            // console.log('Game Add');
            // console.log('[add] is available:', this.isAvailable);
            // console.log('[add] Database:',this.db);
            if (!this.isAvailable){
                reject('Database not opened');
            }
            // Transsaction handlers
            const transaction = this.db.transaction(['SongList'],'readwrite');
            transaction.onerror = (event) => {
                //console.log("[Transaction] Error:", event);
                reject(event.target.error.message);
            }
            // transaction.oncomplete = (event) => {
            //     console.log("[Transaction] All done:",event);
            // }
        
            // Store Handlers
            const store = transaction.objectStore('SongList');
            const storeRequest = store.add({
                id: Date.now(),
                title: title,
                genre: genre,
                hasFinished: hasFinished
            });
            storeRequest.onerror = (event) => {
                //console.log('[Store] Add Error :',event);
                reject(event.target.error.message);
            }
            storeRequest.onsuccess = (event) => {
                //console.log('[Store] Add Success:', event);
                //isSuccess = true;
                resolve();

            }
            // return isSuccess;
    });

}

getAll() {
    
    return new Promise((resolve,reject) => {
    // console.log('Game Get All')
    // console.log('[getAll] is available:', this.isAvailable);
    // console.log('[getAll] Database:',this.db);

    if(!this.isAvailable) {
        reject('Database not opened!')
    }

    //Transaction handlers
    const transaction = this.db.transaction(['SongList'],'readonly');
    transaction.onerror = (event) => {
        //console.log('Error:' ,event);
        reject(event.target.error.message);
    };
    //Store handlers
    const store = transaction.objectStore('SongList');
    const request = store.getAll();
    request.onerror = (event) => {
        //console.log('Error:',event);
        reject(event.target.error.message);
    }
    request.onsuccess = (event) => {
        //console.log('Get All Success:', event);
        resolve(event.target.result);
    };

    });
}

get(id) {
    //console.log('Get Id:',id);
    return new Promise((resolve,reject) => {
        if(!this.isAvailable) {
            reject('Database not opened');
        }
        //Transaction handler
        const transaction = this.db.transaction(['SongList'],'readonly');
        transaction.onerror = (event) => {
            reject(event.target.error.message);
        };
        //Get a data from the store
        const store = transaction.objectStore('SongList');
        const request = store.get(id);
        request.onerror = (event) => {
            reject(event.target.error.message);
        }
        request.onsuccess = (event) => {
            console.log('Success:',event);
            resolve(event.target.result);

        }
    });
}
getByGenre(genre){
    console.log('Get genre:',genre);
    return new Promise((resolve,reject) => {
        if(!this.isAvailable) {
            reject('Database not opened!');
        }

        //Transaction handlers
        const transaction = this.db.transaction(['SongList'],'readonly');
        transaction.onerror = (event) => {
            reject(event.target.error.message);
        };

        //Get all the data from the index genre
        const store = transaction.objectStore('SongList');
        const index = store.index('artist');
        const request = index.getAll(genre);
        request.onerror = (event) => {
            reject(event.target.error.message);
        }
        request.onsuccess = (event) => {
            resolve(event.target.result);
        }
    });
}
update(updatedGame) {
    console.log('updated game:', updatedGame);
    return new Promise((resolve,reject) => {
        if(!this.isAvailable) {
            reject('Database not opened!');
        }
        //Transaction handler
        const transaction = this.db.transaction(['SongList'], 'reaWrite');
        transaction.onerror = (event) => {
            reject(event.target.error.message);
        };
        //gets the stores
        const store = transaction.objectStore('SongList');
        const request = store.put(updatedGame);
        request.onerror = (event) => {
            reject(event.target.error.message);
        }
        request.onsuccess = (event) => {
            resolve();
        }
    });
}
delete(id) {
    console.log('Id:',id);
    return new Promise((resolve,reject) => {
        if(!this.isAvailable){
            reject('Database not opened!');
        }
        //Transaction
        const transaction = this.db.transaction(['SongList'],'readWrite');
        transaction.onerror = (event) => {
            reject(event.target.error.message);
        };
        //gets the stors
        const  store = transaction.objectStore('SongList');
        const request = store.delete(id);
        request.onerror = (event) => {
            reject(event.target.error.message);
        }
        request.onsuccess = (event) => {
            resolve();
        }
    })
}
}

export default new SongDB();

