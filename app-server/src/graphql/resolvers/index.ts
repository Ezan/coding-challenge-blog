import { PostResolver } from './posts';
import 'reflect-metadata';
import { UserResolver } from './users';

export const resolvers: any = [PostResolver, UserResolver];
