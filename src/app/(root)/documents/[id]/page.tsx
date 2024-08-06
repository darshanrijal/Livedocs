import { CollaborativeRoom } from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DocumentPage({
  params: { id },
}: SearchParamProps) {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }
  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });
  if (!room) {
    redirect("/");
  }

  // To acces permission
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={room.id}
        //@ts-ignore
        roomMetadata={room.metadata}
      />
    </main>
  );
}
