/** Song DB API using Firebase */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore,collection,addDoc,getDocs,doc,updateDoc,getDoc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";



class SongDB {
  constructor() {
    this.db = null;
    this.isAvailable = false;
  }

  open() {
    return new Promise((resolve,reject)=> {
      try{
        const firebaseConfig = {
          apiKey: "AIzaSyAtsf05_oCrL4FUo85yhp3aKcw5kC3pH1I",
          authDomain: "song-app-cbe37.firebaseapp.com",
          projectId: "song-app-cbe37",
          storageBucket: "song-app-cbe37.appspot.com",
          messagingSenderId: "916717958668",
          appId: "1:916717958668:web:5807febd5fd552cc762029"
        };
      
    
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
    
        // Initialize Cloud Firestore and get a reference to the service
        const db = getFirestore(app);
        if (db){
          this.db = db;
          this.isAvailable = true;
          resolve()
        }else{
          reject('the databse is not available')

        }
    
        console.log('Song DB Open:', db);
      }catch (error){
        console.log ('open DB error',error.message)
    
      }
    });
    
  }

 

  add(title, artist, likes) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Database not opened");
      }
  
      // Create song object to add
      const song = {
        title: title,
        artist: artist,
        likes: likes
      };
  
      // Connect to Firebase collection
      const dbCollection = collection(this.db, 'SongApp');
  
      // Include new object in the collection
      addDoc(dbCollection, song)
        .then((docRef) => {
          console.log('Firestore added successfully', docRef);
          resolve(); // Resolve the promise since the addition was successful
        })
        .catch((error) => {
          reject(error.message); // Reject the promise with the error message
        });
  
      console.log('SongDB add:', title, artist,likes);
    });
  }
  

  
  getAll() {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Database not opened");
      }
  
      // Connect to Firebase collection
      const dbCollection = collection(this.db, 'SongApp');
  
      // Get the data from the database
      getDocs(dbCollection)
        .then((querySnapshot) => {
          const songs = []; // Array to store retrieved songs
  
          querySnapshot.forEach((doc) => {
            const songData = doc.data();
            songs.push(songData);
          });
  
          console.log('Retrieved songs:', songs);
          resolve(songs);
          console.log(songs) // Resolve the promise with the retrieved songs
        })
        .catch((error) => {
          reject(error.message);
        });
  
      console.log('SongDB getAll');
    });
  }
  

  get(id) {
    console.log('SongDB get:', id);
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Database not opened");
      }


      const docRef = doc(this.db,'SongApp',id)

      getDoc(docRef)
      .then((docSnap) =>{
        const data = docSnap.data()
        console.log('docSnap Data:',data)
        resolve(data)
      })

      .catch((error) => {
        reject(error.message);
      });
      


    
    }) 
  }

  getByGenre(genre) {
    console.log('SongDB getByGenre:', genre);
  }

  update(updatedSong) {
    console.log('SongDB update:', updatedSong);
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Database not opened");
        return;
      }
  
      // Get the document reference
      const docRef = doc(this.db, 'SongApp', updatedSong.id);
  
      // Update the document
      updateDoc(docRef, {
        likes: updatedSong.likes
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }
  

  // update(updatedSong) {
  //   console.log('SongDB update:', updatedSong);
  //   return new Promise((resolve, reject) => {
  //     if (!this.isAvailable) {
  //       reject("Database not opened");
  //     }

  //     const transaction = this.db.transaction(['SongApp'],'rewrite')
  //     transaction.onerror = (event) => {
  //       reject (event.target.error.message)
  //     }

  //     // Get a data fron store
  //     const store = transaction.objectStore ('SongApp')
  //     const request = store.put(updatedSong )
  //     request.onerror = (event) => {
  //       reject (event.target.error.message)
  //     }

  //     request.onsuccess = (event) => {
  //       resolve()
  //     }
  //   console.log('SongDB get:', id);
  //   });
  // }

  delete(id) {
    console.log('SongDB delete:', id);
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Database not opened");
       
      }
  
      // Get the document reference
      const docRef = doc(this.db, 'SongApp', id);
  
      // delete the document
      DeleteDoc(docRef)
        .then(() => {
          resolve();
        })
      
        .catch((error) => {
          reject(error.message);
        });
    });
}}

export default new SongDB();
