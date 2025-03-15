"use client";

import Link from "next/link";
import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { Session } from "next-auth";

interface UserButtonProps {
  session: Session | null;
}

export function UserButton({ session }: UserButtonProps) {
  return (
    <Link
      href={session ? "/profile" : "/api/auth/signin"}
      className="w-[36px] h-[36px] rounded-full overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
      aria-label={session ? "プロフィール" : "ログイン"}
    >
      {session && session.user?.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name || "ユーザープロフィール"}
          width={36}
          height={36}
          className="object-cover w-full h-full"
        />
      ) : (
        <BiUser className="text-lg text-gray-600" />
      )}
    </Link>
  );
}
