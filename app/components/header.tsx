import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { Navigation } from "./navigation";

export default async function Header() {
  const session = await auth();

  return (
    <header className="h-[70px] border-b border-gray-100 flex items-center px-4 sm:px-6 md:px-10 bg-white z-10 shadow-sm">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="h-full flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <div className="relative h-[40px] w-[40px] mr-2">
                <Image
                  src="/codefolio-logo-only.svg"
                  alt="logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 hidden md:block">
                codefolio
              </span>
            </div>
          </Link>
        </div>

        <Navigation session={session} />
      </div>
    </header>
  );
}
