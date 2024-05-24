import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { Share_Tech } from "next/font/google";
import { cn } from "@/lib/utils";
type Props = {};

const logoFont = Share_Tech({ subsets: ["latin"], weight: ["400"] });
const NavBar = (props: Props) => {
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 items-center">
            <Image src="/logo.png" alt="" height={56} width={56} />

            <h2 className={cn("font-bold text-3xl", logoFont.className)}>
              POSD
            </h2>
          </Link>

          <div className="h-full flex items-center space-x-4">
            <Link
              href="/"
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              Login
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
