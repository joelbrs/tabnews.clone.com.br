import Link from "next/link";
import { Post } from "../graphql";
import { useTime } from "../hooks";

interface Props {
  posts: Post[];
}

export default function PublishCard({ posts }: Props): JSX.Element {
  const time = useTime()

  return (
    <>
      {posts?.map((item, i) => (
        <div className="flex items-start gap-3">
          <span>{i + 1}.</span>
          <div>
            <Link
              className="hover:underline font-medium capitalize text-wrap"
              href={`${item.user.username}/${item.slug}`}
              key={item.slug}
            >
              {item.title}
            </Link>
            <div className="text-xs text-muted-foreground">
              <span>{item.tabcoins} tabcoins · </span>
              <span>0 comentário · </span>
              <Link className="hover:underline" href={item.user.username}>
                {item.user.username} · 
              </Link>
              <span>{" "}{time.timeFromNow(item.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
