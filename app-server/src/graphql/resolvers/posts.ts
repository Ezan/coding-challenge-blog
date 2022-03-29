import { Post, PostSchema } from '../entities/Post';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import 'reflect-metadata';

@Resolver()
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async getPosts() {
    try {
      const posts = await PostSchema.find();
      return posts;
    } catch (err: any) {
      //throw new Error(err);
      return null;
    }
  }

  @Query(() => Post, { nullable: true })
  async getPost(_: any, { postId }: any) {
    try {
      const post = await PostSchema.findById(postId);
      if (post) {
        return post;
      } else {
        //throw new Error('Post not found');
        return null;
      }
    } catch (err: any) {
      //throw new Error(err);
      return null;
    }
  }

  @Mutation(() => Post, { nullable: true })
  async createPost(@Arg('content') content: string): Promise<Post | Error> {
    try {
      const newPost = new PostSchema({
        content,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      if (post) {
        return post;
      } else {
        throw new Error('Cannot create post');
        //return null;
      }
    } catch (err: any) {
      throw new Error(err);
      //return null;
    }
  }
}
