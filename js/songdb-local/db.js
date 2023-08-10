
import dbOnline from '../../js/song-db.js';
import dbOffline from '../songdb-local/songdb-local.js'




    class SongDB {
        constructor () {

            console.log ('Online DB:', dbOnline); 
            console. log ('Offline DB:', dbOffline);
            this.dbOnline = dbOnline; 
            this.dbOffline = dbOffline;
            this.swController = null;
            this.swRegistration = null;
            }
         


            open ( ) {
                console.log ('SongDb open.');
                
                return new Promise((resolve, reject) => {
                if ('serviceWorker' in navigator) {
                navigator.serviceworker.ready.then((registration) => {
                if ('active' in registration && 'sync' in registration) {
                console. log('SW and Sync available!');
                this.dbOffline.open()
                .then(()=>{
                    console. log ('SW, Sync, and local DB available!');
                    this.swController = registration.active;
                    this.swRegistration = registration;
                    this.dbOnline.open().then(resolve).catch(reject)
                })
                .catch(()=>{
                    this.dbOnline.open ().then(resolve).catch(reject);

                })
                }
                else {
                this.dbOnline.open().then(resolve).catch(reject);
                }
                });
                }
                else {
                this.dbOnline.open ().then(resolve).catch(reject);
                }
                }); 
            } 


          
            
    
                
        add(title, genre, hasFinished) {
        console. log ('GameDB add:', title, genre, hasFinished);
        console.log ('is online',navigator.onLine)
        }
        getAll () {
        console. log ('GameDB getAll.');

        }
    }

    export default new SongDB(); 