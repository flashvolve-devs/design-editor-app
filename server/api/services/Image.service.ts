/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Message {
  text: {
    body: string
  }
}

class ImageService {
  private _jsonData: object;

  constructor() {
    this.createImage = this.createImage.bind(this);
    this._jsonData = {};
  }

  public createImage(obj: any): object {
    const imageJSONData = obj.value.messages;

    return this._jsonData;
  }
}

export default ImageService;