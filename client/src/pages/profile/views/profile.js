import React from "react";
import ProfileCard from "../components/profileCard";
import ProfileFollow from "../components/profileFollow";

export default function ProfilePage() {
  const ysk = {
    follower: "1M",
    posts: "100",
    following: "1",
    profile_cover:
      "url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
    profile_image:
      "https://scontent.fpnh10-1.fna.fbcdn.net/v/t1.0-9/90355465_2831326093650021_3661684079125856256_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=rshhzKfx6dIAX-oqhGL&_nc_ht=scontent.fpnh10-1.fna&oh=73d960fec311e9f7533051270f61dfcf&oe=601E0B1D",
    displayName: "Yeoh Soon Keat",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    status: "Online",
  };

  return (
    <ProfileCard user={ysk}>
      <ProfileFollow user={ysk} />
    </ProfileCard>
  );
}
