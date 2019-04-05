export class Product {
  public imageFeaturedUrl?;

  constructor(
    public id: number = 1,
    public name: string = '',
    public description: string[] = [],
    public price: number = 0,
    public offerprice: number = 0,
    public currency: string,
    public imageURLs: string[] = [],
    public category: string = '',
    public os: string = '',
    public isNew: boolean = false
    ) {}
}
