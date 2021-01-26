const tagObject = (tagName) => {
	return {
		slekret_tag: {
			data: { tag_name: tagName },
			on_conflict: {
				constraint: 'slekret_tags_pkey',
				update_columns: ['tag_name'],
			},
		},
	};
};

const generateListOfTag = (tags) => {
	const listOfTags = [];
	tags.split(',').forEach((tagName) => {
		if (tagName) {
			listOfTags.push(tagObject(tagName));
		}
	});
	return listOfTags;
};

export default generateListOfTag;
