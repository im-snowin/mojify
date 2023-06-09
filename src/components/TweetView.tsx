import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

type PostWithAuthor = RouterOutputs["posts"]["getAll"][number];

const TweetView = (props: PostWithAuthor) => {
  return (
    <div className="flex items-center gap-4 rounded bg-[#1b1b1b] py-4 px-4">
      <Image
        src={props.author?.profileImageUrl || ""}
        alt="author profile"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-1 text-[#656565]">
          <Link href={`/@${props.author.username}`}>
            <p className="text-white">@{props.author.username}</p>
          </Link>
          <span className="">·</span>
          <span>{dayjs(props.post.createdAt).fromNow()}</span>
        </div>
        <Link href={`/post/${props.post.id}`}>
          <span className="text-2xl">{props.post.content}</span>
        </Link>
      </div>
    </div>
  );
};
export default TweetView;
