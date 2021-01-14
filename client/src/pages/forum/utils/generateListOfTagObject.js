const tagObject = (tagName) => {
	return {
		tag: {
			data: { tag_name: tagName },
			on_conflict: {
				constraint: 'tags_tag_name_key',
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
