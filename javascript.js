
const inputTitle = document.getElementById("song")
const inputArtist = document.getElementById("name");
const listContainer = document.getElementById("list-container")


console.log(inputArtist)

// const btnAdd = document.getElementsByTagName("button");
// console.log(btnAdd)

function myFunction() {

  let songName = inputTitle.value;
  let artistName = inputArtist.value;

  console.log(songName)


  if (songName === "" || artistName == "") {
    alert("Please enter a song name and artist.");
    return;
  }

  //Create a new list item
  const displaySongAndArtist = document.createElement("li");
  const img = document.createElement('img');
  img.src = 'images/image.png';
  img.alt = 'Logo';
  const textNode = document.createTextNode(`${songName} - ${artistName}`);
  displaySongAndArtist.appendChild(img);
  displaySongAndArtist.appendChild(textNode);
  listContainer.appendChild(displaySongAndArtist)
  console.log("success")

  inputTitle.value = "";
  inputArtist.value = "";

 

}
