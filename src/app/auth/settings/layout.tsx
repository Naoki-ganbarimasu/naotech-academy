"use client";

import {
  ArrowLeftOnRectangleIcon,
  EnvelopeIcon,
  KeyIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const subNavigation = [
  {
    name: "プロフィール",
    icon: UserCircleIcon,
    href: "/auth/settings/profile"
  },
  {
    name: "メールアドレス",
    icon: EnvelopeIcon,
    href: "/auth/settings/email"
  },
  {
    name: "パスワード",
    icon: KeyIcon,
    href: "/auth/settings/password"
  },
  {
    name: "ログアウト",
    icon: ArrowLeftOnRectangleIcon,
    href: "/auth/settings/logout"
  }
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1 text-sm space-y-1 font-bold flex flex-col">
        {subNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`${
                item.href == pathname && "bg-sky-100 text-sky-500"
              } hover:bg-sky-100 px-3 py-2 rounded-full`}
            >
              <item.icon className="inline-block w-5 h-5 mr-2" />
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="col-span-2">{children}</div>
    </div>
  );
};

export default SettingsLayout;
