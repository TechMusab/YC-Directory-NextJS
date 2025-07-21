import React from "react";
import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupCardType } from "@/components/StartupCard";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const params={search :query || null}
const {data:posts}= await sanityFetch({query:STARTUPS_QUERY,params})

const session=await auth()
console.log(session?.id)

  return (
    <>
      <section className="pink-container pattern">
        <h1 className="heading">
          PITCH YOUR START UP AND CONNECT WITH ENTERPRENEURS
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches and Get Noticed on Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `You searched for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => <StartupCard key={post?.id} post={post} />)
          ) : (
            <p className="no-results">No results found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
