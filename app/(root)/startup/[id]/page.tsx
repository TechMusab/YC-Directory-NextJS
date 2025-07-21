import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import React from "react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/view";
import markdownit from "markdown-it";
const md = markdownit();

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id)

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  console.log(post)
  if (!post) {
    notFound();
  }
  const parsedMarkdown = md.render(post?.pitch || "");
  return (
    <>
      <section className="pink-container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={post.image}
          alt="thumbnail"
          width={800}
          height={450}
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              ></Image>
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  {post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedMarkdown ? (
            <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html : parsedMarkdown }} />
          ) : (
            <p className="no-results">No pitch details available</p>
          )}
        </div>
        <hr className="divider" />

      </section>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={post ?._id}></View>
      </Suspense>
    </>
  );
}
