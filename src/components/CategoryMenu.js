import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
function CategoryMenu({ category }) {
  const router = useRouter();

  const activeCategory = category.id === parseInt(router.query.id);

  return (
    <div
      key={category.id}
      className={`${
        activeCategory ? "bg-gray-200 active-menu " : ""
      }mr-5 py-1 hover:bg-gray-200 font-semibold rounded px-2 text-gray-900 `}
    >
      <Link href={`/campaigns/${category.id}`}>
        <a className="text-base font-semibold">{category.name}</a>
      </Link>
    </div>
  );
}

export default CategoryMenu;
