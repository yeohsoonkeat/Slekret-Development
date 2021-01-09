import React from 'react';
import ProfileCard from '../components/profileCard';
import ProfileFollow from '../components/profileFollow';

export default function ProfilePage() {
  const ysk = {
    follower: '1M',
    posts: '100',
    following: '1',
  };

  return (
    <ProfileCard>
      <ProfileFollow user={ysk} />
    </ProfileCard>
  );
}
