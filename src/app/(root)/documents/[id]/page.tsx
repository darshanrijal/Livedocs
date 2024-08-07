import { CollaborativeRoom } from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
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

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const usersData = users?.map((user) => ({
    ...user,
    //@ts-ignore
    userType: room.usersAccesses[user?.email!]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));
  if (!usersData) {
    redirect("/sign-in");
  }
  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
    //@ts-ignore
  ].includes("room:write")
    ? "editor"
    : "viewer";
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={room.id}
        //@ts-ignore
        roomMetadata={room.metadata}
        //@ts-ignore
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
}
