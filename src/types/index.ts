export interface TypeProducts {
  data: ProductsDatum[]
}
export interface ItemProduct {
  data: ProductsDatum
}

export interface ProductsDatum {
  id: number
  attributes: PurpleAttributes
}

export interface PurpleAttributes {
  title: string
  description: string
  price: number
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
  category: string
  size: string
  image: Image
  soldOut?: boolean
}

export interface Image {
  data: ImageDatum[]
}

export interface ImageDatum {
  id: number
  attributes: FluffyAttributes
}

export interface FluffyAttributes {
  name: string
  alternativeText: null
  caption: null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
  createdAt: Date
  updatedAt: Date
}

export interface Formats {
  thumbnail: Large
  small: Large
  medium: Large
  large: Large
}

export interface Large {
  name: string
  hash: string
  ext: string
  mime: string
  path: null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}


export interface PostProduct {
  title: string
  description: string
  price: number
  category: string
  size: string
  image: {
    data: string
  }
  soldOut: boolean
}

export interface TypeOwnCart {
  data: Datum[];

}

export interface Datum {
  id:         number;
  attributes: Attributes;
}

export interface Attributes {
  productId:   null | string;
  userId:      string;
  quantity:    number;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
}
