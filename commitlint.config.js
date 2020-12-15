module.exports = {
	rules: {
		'type-enum': [
			2,
			'always',
			[
				':art:',
				':newspaper:',
				':pencil:',
				':memo:',
				':zap:',
				':fire:',
				':books:',
				':bug:',
				':ambulance:',
				':penguin:',
				':apple:',
				':checkered_flag:',
				':robot:',
				':green_ale:',
				':tractor:',
				':recycle:',
				':white_check_mark:',
				':microscope:',
				':green_heart:',
				':lock:',
				':arrow_up:',
				':arrow_down:',
				':fast_forward:',
				':rewind:',
				':rotating_light:',
				':lipstick:',
				':wheelchair:',
				':globe_with_meridians:',
				':construction:',
				':gem:',
				':bookmark:',
				':tada:',
				':loud_sound:',
				':mute:',
				':sparkles:',
				':speech_balloon:',
				':bulb:',
				':construction_worker:',
				':chart_with_upwards_trend:',
				':ribbon:',
				':rocket:',
				':heavy_minus_sign:',
				':heavy_plus_sign:',
				':wrench:',
				':hankey:',
				':leaves:',
				':bank:',
				':whale:',
				':twisted_rightwards_arrows:',
				':pushpin:',
				':busts_in_silhouette:',
				':children_crossing:',
				':building_construction:',
				':iphone:',
				':clown_face:',
				':ok_hand:',
				':boom:',
				':bento:',
				':pencil2:',
				':package:',
				':alien:',
				':truck:',
				':age_facing_up:',
				':busts_in_silhouette:',
				':card_file_box:',
			],
		],
		'body-leading-blank': [2, 'always'],
		'footer-leading-blank': [2, 'always'],
		'header-max-length': [2, 'always', 72],
		'scope-case': [2, 'always', 'lower-case'],
		'subject-case': [2, 'always', ['sentence-case']],
		// 'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', ['.']],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
	},
	parserPreset: {
		parserOpts: {
			headerPattern: /^(:\w*:)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
			headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
		}
	}
}