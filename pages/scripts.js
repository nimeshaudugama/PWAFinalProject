

//import songDB from '../js/song-db.js';
//import songDB from '../js/songdb-local/songdb-local.js';

import songDB from '../js/songdb-local/db.js'



if ('serviceWorker' in navigator){
  navigator.serviceWorker.ready
  .then((registration) => {
    const controller = registration.active
      console.log('Register Sucess',registration);
      // Validate if Background Sync is available.
if ('sync' in registration) {
  console.log('Background Sync:', registration.sync);
  registration.sync.getTags ()
  .then ((tags) => {
    console.log ('Tag registered!!!');
    if (tags.includes ('my-tag-name')) {
  }
  })
}
  else {
  console.log('Background Sync not Available.');
  }
}
  )
 
  
  .catch((error) => {
      console.log('Register Failed:',error);
  });
}
else{
  console.log ('Service Worker are not supported')
}




songDB.open()
  .then(() => {
    songDB.getAll()
    console.log('success')

    // songDB.get('FrS63jeP3vPZsCIHIARJ')
    // console.log('GET ID')
  })
  .catch(error => {
    console.log(error)

  })


 

//message output reference 

const messageOutput = document.getElementsByClassName('song-added')
const listContainer = document.getElementById("list-container")





document.getElementById('addButton').addEventListener('click', () => {
  console.log('button clicked')

  const title = document.getElementById("song").value;
  const artist = document.getElementById("name").value;

  const likes = 0


  // ######################################################################

})


const listOutPut = document.getElementById('songlist-container')



songDB.getAll()
  .then(displaySongs)
  .catch(error => {
    console.log(error);
  });

function displaySongs(songs) {
  listOutPut.innerHTML = '';


  songs.forEach((song) => {
    console.log(song)
    const songElement = document.createElement('div');
    songElement.className = 'song-list';
    listOutPut.appendChild(songElement);

    // Include title
    const elementTitle = document.createElement('h3');
    elementTitle.innerText = song.title;
    songElement.appendChild(elementTitle);

    // Include artist
    const elementArtist = document.createElement('h3');
    elementArtist.innerText = song.artist;
    songElement.appendChild(elementArtist);

    // Include likes
    const elementLikes = document.createElement('span');
    elementLikes.innerText = 'Likes: ' + song.likes;
    elementArtist.appendChild(elementLikes);

    //Include Remove button
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove'
    removeButton.id = 'removeBtn'
    elementLikes.appendChild(removeButton);

    removeButton.addEventListener('click', () => {

      console.log("Remove")
      songDB.delete(song.id)
    })

    //Include Likes button
    const likebutton = document.createElement('button');
    likebutton.innerText = '+Like'
    likebutton.id = 'likeButton'
    elementLikes.appendChild(likebutton);




    // Call displaySongs immediately after the page loads
    window.addEventListener('DOMContentLoaded', () => {
      songDB.getAll()
        .then(displaySongs)
        .catch(error => {
          console.log(error);
        });
    })

    // const likebutton = document.getElementById('likeButton');
    // listOutPut.addEventListener('click',() => {
    //   console.log('update game',song)
    //   song.likes +=1
    //   console.log(song.likes)
    //   songDB.update(song)
    //   .then (() =>{
    //     elementLikes.innerText = song.likes

    //   })
    // .catch((error) =>{
    //   console.log('Failed with',error)
    // })

    // });

    listContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (target.id === 'likeButton') {
        const listItem = target.parentNode;
        const likeCount = listItem.querySelector('#likeCount');
        let likes = parseInt(likeCount.innerText);
        likes++;
    
        // Call the update method from songDB
        const songId = listItem.getAttribute('data-id');
        songDB.update(songId, { likes: likes })
          .then(() => {
            likeCount.innerText = likes.toString();
            console.log('Likes updated successfully');
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      }
    });

    // const btnRmv = document.getElementById('removeBtn')
    listContainer.addEventListener('click', (event) => {
      const target = event.target;
      if (target.id === 'removeBtn') {
        const listItem = target.parentNode;
        const songId = listItem.getAttribute('data-id');

        songDB.get(songId)
          .then((songData) => {

            console.log('Retrieved song data:', songData);


            songDB.delete(songId)
              .then(() => {
                listItem.remove();
                console.log('Record deleted successfully');
              })
              .catch((error) => {
                console.log('Error:', error);
              });
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      }

    })

  })
}

