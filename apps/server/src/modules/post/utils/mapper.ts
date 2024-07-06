import { IPost } from "..";

export const mapPostDtoOut = ({
  createdAt,
  creatorId,
  description,
  id,
  slug,
  tabcoins,
  title,
}: IPost) => {
  const [strCreatedAt] = createdAt.toISOString().split("T");
  return {
    creatorId,
    id,
    tabcoins,
    slug,
    title,
    description,
    createdAt: strCreatedAt,
  };
};
