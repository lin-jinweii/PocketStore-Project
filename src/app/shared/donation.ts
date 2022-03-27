export class Donation {

  name: string;
  quality: string;
  image;
  imagePath: string; // Path for retrieving
  damages: string;
  available: number;
  status: string;
  username: string;
  id: string;

  constructor(name: string, quality: string, damages: string, available: number, image, status: string, username: string, id?: string) {
    this.name = name;
    this.quality = quality;
    this.damages = damages;
    this.available = available;
    this.image = image;
    this.status = status;
    this.username = username;
    this.id = id;
   }

  }