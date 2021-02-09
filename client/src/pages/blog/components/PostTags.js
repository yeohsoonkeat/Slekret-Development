import IconTag from '../../../icons/ic_tag';
import random_numbers from '../../forum/utils/random_numbers';

const colors = ['pink', 'blue', 'green', 'yellow', 'indigo'];

const PostTags = ({ tags, extendedParentClassName }) => {
	const tagRandomIndexes = random_numbers(tags.length);

	return (
		<div
			className={`flex items-center text-gray-500 select-none ${extendedParentClassName}`}
		>
			<IconTag className="w-4 h-4" />
			<span className="text-xs">
				<span className="font-semibold">TAGS: </span>
				{tags.map((tag, index) => {
					const randomColor = colors[tagRandomIndexes[index] % colors.length];

					return (
						<span key={index}>
							{index !== 0 && ', '}
							<span
								className={`hover:font-medium hover:text-${randomColor}-600 hover:tracking-wider transition-all cursor-pointer`}
							>
								{tag.tag_name}
							</span>
						</span>
					);
				})}
			</span>
		</div>
	);
};

export default PostTags;
