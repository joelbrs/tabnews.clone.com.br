import Link from "next/link";

interface Props {
    posts: any[]
}

export default function PublishCard({posts}: Props): JSX.Element {
    return <>
        {posts?.map((item, i) => (
            <div className="space-x-2">
                <span>{i + 1}.</span>
                <Link
                    className="hover:underline"
                    href={`${item.user.username}/${item.slug}`}
                    key={item.id}
                >
                    {item.title}
                </Link>
                <div className="text-xs text-muted-foreground pl-3">
                    <span>{item.tabcoins} tabcoins · </span>
                    <span>{item.user.username} · </span>
                    <span>{item.createdAt}</span>
                </div>
            </div>
        ))}
    </>
}