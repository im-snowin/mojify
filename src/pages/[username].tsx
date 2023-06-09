import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";

import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/utils/helper";

import Spinner from "~/components/Spinner";
import TweetView from "~/components/TweetView";

const ProfileFeed = (props: { userId: string }) => {
  const { data: userPosts, isLoading } = api.posts.getByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <Spinner />;

  if (!userPosts || userPosts.length === 0) return <div>User has no post</div>;

  return (
    <ul className="flex w-full flex-col gap-4">
      {userPosts?.map(({ post, author }) => (
        <TweetView key={post.id} post={post} author={author} />
      ))}
    </ul>
  );
};

const Profile: NextPage<{ username: string }> = ({ username }) => {
  const { data: profile, isLoading } =
    api.profile.getProfileByUsername.useQuery({ username });

  if (isLoading) return <Spinner tw="min-h-screen" />;
  if (!profile) return <p>404</p>;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Image
        src={profile.profileImageUrl}
        alt="user profile"
        width={58}
        height={58}
        className="rounded-full"
      />
      <span className="text-center">
        <h1 className="text-4xl font-bold">
          {profile.firstName} {profile.lastName}
        </h1>
        <span>{`@${profile.username as string}`}</span>
      </span>
      <ProfileFeed userId={profile.id} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.username;

  if (typeof slug !== "string") throw new Error("no username");

  const username = slug.replace("@", "");

  await ssg.profile.getProfileByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default Profile;
