import React from "react";
import SearchForm from "../../components/SearchForm";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const {query} = await searchParams;
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
    </>
  );
}
