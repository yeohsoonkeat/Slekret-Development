import { useState } from 'react';
import IconAnnotation from '../../../icons/ic_annotation';
import IconGlobe from '../../../icons/ic_globe';
import IconHome from '../../../icons/ic_home';
import IconQuestion from '../../../icons/ic_question';
import IconButton from '../components/IconButton';

const ForumLayout = ({ children }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="w-full max-w-8xl flex-1 px-2 sm:px-6 flex my-8">
			<ul className="w-48 divide-y hidden lg:block mr-8">
				{[
					{ title: 'Home', icon: IconHome },
					{ title: 'Explore Topics', icon: IconGlobe },
					{ title: 'My Questions', icon: IconQuestion },
					{ title: 'My Answers', icon: IconAnnotation },
				].map((category, index) => {
					return (
						<IconButton
							key={index}
							title={category.title}
							icon={category.icon}
							isActive={index === activeIndex}
							onClick={() => setActiveIndex(index)}
						/>
					);
				})}
			</ul>
			<main className="w-full">{children}</main>
		</div>
	);
};

export default ForumLayout;
