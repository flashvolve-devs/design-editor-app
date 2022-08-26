class ImageService {
  private _jsonData: object;

  constructor() {
    this.createImage = this.createImage.bind(this);
    this._jsonData = {};
  }

  public createImage(obj: any): object {
    this._jsonData = obj;

    return this._jsonData;
  }
}

export default ImageService;