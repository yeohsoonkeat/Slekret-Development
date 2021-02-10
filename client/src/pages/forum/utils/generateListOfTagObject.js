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

const generateListOfTagObject = (listOfTags) => {
	if (listOfTags.length === 0) {
		return [];
	}
	return listOfTags.map((tagName) => tagObject(tagName));
};

export default generateListOfTagObject;
