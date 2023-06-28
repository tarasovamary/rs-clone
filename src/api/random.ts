const artist = [
  "Jon Worthy",
  "Color Out",
  "Lisof",
  "Anitek",
  "TAB",
  "Glass Violet",
  "Sadme",
  "James Bell",
  "StimiBeats",
  "Nargo",
  "The Spin Wires",
  "MAKKENZIE",
  "House Of Dawn",
  "Makesound",
  "Samie Bower",
  "Carbon Casca",
  "Samie Bower",
  "Artistico",
  "LITTLE SUSPICIONS",
  "Kinematic",
  "All My Friends Hate Me",
  "Sam Opoku",
  "Arrow & Olive",
  "Rude",
  "Sunwill",
  "Other Noises",
  "Ocean Shiver",
  "Nothung",
  "Alexander Klein",
  "Smoking With Poets",
  "The Rabbitts",
  "Lower Loveday"
]

const albums = [
  "Twilight Season",
  "EQUILIBRIUM",
  "Pyreside",
  "Hillside Residence Acoustic",
  "Wicked City",
  "Unlit",
  "Mpsta & El J - The Return",
  "Snail - Snail",
  "Looking At The Tracks",
  "STOREROOM OF SOUNDZ",
  "Undercover",
  "Wicked City",
  "Universal Islands",
  "Zodiac Hour",
  "Zodiac Hour",
  "Sweaty Gug",
  "Strange Vibrations - Meditation Music",
  "Background Music Vol. 3",
  "At A Distance",
  "Edinburg",
  "LoFi Meditation",
  "Amor",
  "Universal",
  "Chillstep Dreams",
  "CLEAR THE WAY",
  "Enchanted Forest"
]

export const getRandomArtist = () => {
  const artistRand = artist[Math.floor(Math.random() * artist.length)];
  return `${artistRand}`;
}

export const getRandomAlbums = () => {
  const albumRand = albums[Math.floor(Math.random() * albums.length)];
  return `${albumRand}`;
}