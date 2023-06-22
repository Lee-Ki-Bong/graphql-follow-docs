import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';

/**
 * nullable 에 줄 수 있는 옵션
 * true: 선택적으로 처리
 * false: 필수로 처리
 * 'items': 필드가 배열 형태일 때, 배열자체는 필수 & 배열 아이템들 선택적
 * 'itemsAndList': 필드가 배열 형태일 때, 배열 자체를 선택적 & 배열 아이템들 선택적
 */

@ObjectType({ description: '작성자 모델' })
export class Author {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field((type) => [Post], { nullable: 'items' })
  posts: Post[];
}

/*
CREATE TABLE `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
*/
