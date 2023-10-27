import { PostRole } from '../../commons/post-role.enum';

export class CreatePostDto {
    userId: string;
    title: string;
    content: string;
    hashtags: string;
    type: PostRole;
}
