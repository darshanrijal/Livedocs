"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { getUserColor } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });
    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
      color: getUserColor(user.id),
    }));
    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );
    return sortedUsers;
  } catch (error) {
    console.log(`Error fetching users ${error}`);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );
    if (text.length) {
      const lowercaseText = text.toLocaleLowerCase();
      const filterdUsers = users.filter((email: string) =>
        email.toLocaleLowerCase().includes(lowercaseText)
      );
    }
    return users;
  } catch (error) {
    console.log("Error fetching document users");
  }
};
