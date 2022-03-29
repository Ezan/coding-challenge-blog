import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @prop({ unique: true })
  @Field()
  username!: string;

  @prop()
  password!: string;

  @prop()
  @Field(() => Date)
  createdAt!: Date;

  @prop()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export const UserSchema = getModelForClass(User);
