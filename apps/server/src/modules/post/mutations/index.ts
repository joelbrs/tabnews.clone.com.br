import { CreatePostMutation as CreatePost } from "./create-post";
import { DeletePostMutation as DeletePost } from "./delete-post";
import { UpdatePostMutation as UpdatePost } from "./update-post";
import { VotePostMutation as VotePost } from "./vote-post";

export const PostMutations = {
  CreatePost,
  VotePost,
  UpdatePost,
  DeletePost,
};
