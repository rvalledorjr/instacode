import { array, date, object, string, z } from 'zod';

const commentSchema = z.object({
  comment: string(),
  date: date(),
  by: string(),
});

const topicSchema = z.object({
  guid: string(),
  name: string().min(1).max(50),
  comments: commentSchema.array().max(10),
});

const personSchema = z.object({
  guid: string(),
  email: string().email(),
  first: string(),
  last: string(),
});

export type Comment = typeof commentSchema._type;

export type Topic = typeof topicSchema._type;

export type Person = typeof personSchema._type;