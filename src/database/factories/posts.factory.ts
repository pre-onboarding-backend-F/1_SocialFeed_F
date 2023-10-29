import { SnsProvider } from '../../commons/enums/sns-provider.enum';
import { Post } from '../../post/entities/post.entity';
import { setSeederFactory } from 'typeorm-extension';

export const PostsFactory = setSeederFactory(Post, (faker) => {
    const post = new Post();
    post.type = faker.helpers.enumValue(SnsProvider);
    post.title = faker.lorem.sentence();
    post.content = faker.lorem.paragraph();
    post.hashtags = faker.helpers.arrayElements(['맛집', '성수동', '신림동', '분위기좋음']);
    return post;
});
