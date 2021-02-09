import React, { useState } from 'react';

import ProfileNavigation from './ProfileNavigation';
import ProfileUserBlogs from './ProfileUserBlogs';

export default function ProfileUserActivity({ username }) {
	const [isBlog, setShowBlog] = useState(true);

	return (
		<div>
			<ProfileNavigation />
			<ProfileUserBlogs username={username} />
		</div>
	);
}
