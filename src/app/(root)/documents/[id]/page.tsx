import { CollaborativeRoom } from "@/components/CollaborativeRoom";
import { Editor } from "@/components/editor/Editor";
import { Header } from "@/components/Header";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

export default function DocumentPage() {
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom />
    </main>
  );
}
