export interface Track {
  album_image: string,
  album_name: string,
  audio: string,
  duration: number,
  name: string
}

export interface Album {
  id: string,
  image: string,
  name: string,
  releasedate: string
}

export interface Audio {
  audio: string;
}
