import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: '게시물 모델' })
export class Post {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  author_id: number;

  @Field()
  title: string;

  @Field((type) => Int, { nullable: true, description: '좋아요' })
  votes?: number;
}

/*
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `votes` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);
*/
