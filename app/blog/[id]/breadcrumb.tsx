import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

interface BreadcrumbProps {
  title: string;
}

export function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <div className="px-4 sm:px-6 md:px-10 mt-4 md:mt-7 text-sm text-gray-500">
      <Link href="/blog" className="hover:underline">
        学習ドキュメント
      </Link>
      <BiChevronRight className="inline mx-1 text-gray-400" />
      {title}
    </div>
  );
}
