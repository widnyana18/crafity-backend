import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { ArtworkInterface } from './artwork.interface';

@Schema({
  collection: 'artwork',
  strict: 'throw',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Artwork extends Document implements ArtworkInterface {
  @Prop({
    required: true,
  })
  art: string;

  @Prop({
    required: true,
  })
  artist: string;

  @Prop({
    required: true,
  })
  price: number;

  createdAt: Date;
  updatedAt: Date;

}

export type ArtworkDocument = HydratedDocument<Artwork>;

export const ArtworkSchema =
  SchemaFactory.createForClass(Artwork);
