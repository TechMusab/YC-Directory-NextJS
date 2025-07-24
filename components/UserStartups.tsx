import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupCardType } from "./StartupCard";

export default async function UserStartups({ id }: { id: string }) {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="text-14-normal text-center mt-5">
          No startups found for this user.
        </p>
      )}
    </>
  );
}
