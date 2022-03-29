import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @prop()
  @Field()
  content!: string;

  @prop()
  @Field(() => Date)
  createdAt!: Date;
}

export const PostSchema = getModelForClass(Post);
