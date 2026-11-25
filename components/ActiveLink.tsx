"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/** A Link that marks itself aria-current="page" when its href is the current route. */
export function ActiveLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  return <Link href={href} aria-current={pathname === href ? "page" : undefined} {...props} />;
}
