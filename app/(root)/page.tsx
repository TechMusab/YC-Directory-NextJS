import React from "react";
import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const posts = [
    {
      _createdAt: Date.now(),
      views: 55,
      author: {
        _id: 1,
        name: "Musab Joiya",
      },
      _id: 1,
      description: "This is a sample post",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Fettjl2rGDjHBlCYCXcWMRAoKDr_AQOoXQ&s",
      title: "Robots",
      category: "Robots",
    },
  ];
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
    </>
  );
}
