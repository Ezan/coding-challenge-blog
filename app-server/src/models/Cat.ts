import { Schema, model } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';

export interface Cat {
  id: string;
  name: string;
}

const schema = new Schema<Cat>({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

export const CatSchema = model<Cat>('Cat', schema);
