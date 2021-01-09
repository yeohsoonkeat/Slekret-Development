import React from 'react';
import ProfileCard from '../components/profileCard';
import ProfileSettingForm from '../components/ProfileSetting'
export default function ProfileSettingPage() {
	return (
        <div>
            <ProfileCard>
                <ProfileSettingForm/>
            </ProfileCard>
        </div>
	);
}
