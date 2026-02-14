"use client";
import { usePathname } from "next/navigation";

const Profile = () => {
  const pathname = usePathname();
  //   console.log(pathname)

  return <div>Profile</div>;
};

export default Profile;
