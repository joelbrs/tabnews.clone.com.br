import Link from "next/link";
import { User } from "../hooks";

interface Props {
    user: User
}

export default function PublishCard({user}: Props): JSX.Element {
    return <>
        {user?.posts?.map((item, i) => (
            <div className="space-x-2">
                <span>{i + 1}.</span>
                <Link
                    className="hover:underline"
                    href={`${user.username}/${item.slug}`}
                    key={item.id}
                >
                    {item.title}
                </Link>
                <div className="text-xs text-muted-foreground pl-3">
                    <span>{item.tabcoins} tabcoins · </span>
                    <span>{user.username} · </span>
                    <span>{item.createdAt}</span>
                </div>
            </div>
        ))}
    </>
}