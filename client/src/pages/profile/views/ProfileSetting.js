import { gql, useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../../components/Loading';
import useAuthProvider from '../../../hook/useAuthProvider';
import ApiService from '../../../service/api';
import AlertError from '../../auth/components/AlertError';
import ProfileSettingLayout from '../layout/ProfileSettingLayout';
import personalInformation from '../schema/personalInformation';

const api = new ApiService();

export default function ProfileSetting() {
	const [authState] = useAuthProvider();
	const [message, setMessage] = useState('');
	const [avatarSrc, setAvatarSrc] = useState('');

	const { register, errors, handleSubmit } = useForm({
		resolver: yupResolver(personalInformation),
	});

	const { data, loading, error } = useQuery(GET_USER_INFO, {
		variables: {
			id: authState.user.id,
		},
	});
	const [updateUserInfo] = useMutation(UPDATE_USER_INFO, {
		onCompleted() {
			window.open(`/user/profile/${authState.user.username}`, '_self');
		},
		onError() {
			setMessage('Username is already exist');
		},
	});

	if (loading) {
		return <Loading />;
	}
	if (error) {
		return <h1>error</h1>;
	}

	const user = data.slekret_users[0];

	const onSubmit = (data) => {
		updateUserInfo({
			variables: {
				id: authState.user.id,
				displayname: data?.displayname || user.username,
				username: data?.username || user.username,
				about: data?.about || user.about,
				avatarSrc: avatarSrc || user.avatar_src,
			},
		});
	};
	const handleFileChange = async (e) => {
		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		const res = await api
			.fileUpload('/file/file-upload', formData)
			.catch((e) => {
				window.open('/error/500', '_self');
			});

		if (res?.data?.fail) {
			setMessage(res.data.message);
		} else {
			setAvatarSrc(res.data.path);
		}
	};

	return (
		<ProfileSettingLayout>

		<div className=" flex-1 flex  items-center flex-col p-5">
			<AlertError message={message} />
			<div className=" relative ">
				<img
					src={avatarSrc ? avatarSrc : user.avatar_src}
					alt=""
					className=" w-32 h-32 rounded-full object-cover object-center"
				/>
				<div>
					<h1 className="text-center text-blue-500 hover:tracking-wide transition-all mt-3">
						Change image
					</h1>
					<input
						className="cursor-pointer w-full h-full opacity-0 absolute top-0"
						type="file"
						name="image"
						accept=".jpg, .png, .jpeg, .gif"
						onChange={handleFileChange}
					/>
				</div>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="flex w-full mt-5 flex-col">
					<label className="w-4/12 mt-2 font-bold">Username</label>
					<input
						ref={register}
						className=" mt-2 border outline-none w-full mx-auto p-3 rounded"
						defaultValue={user.username}
						name="username"
					/>
					<p>{errors.username?.message}</p>
				</div>
				<div className="flex w-full mt-5 flex-col">
					<label className="w-4/12 mt-2 font-bold">Displayname</label>
					<input
						className=" mt-2 border outline-none w-full mx-auto p-3 rounded"
						name="displayname"
						ref={register}
						defaultValue={user.displayname}
					/>
					<p className="text-red-200">{errors.displayname?.message}</p>
				</div>
				<div className="flex w-full mt-5 flex-col">
					<label className="w-4/12 mt-2 font-bold">About</label>
					<textarea
						ref={register}
						name="about"
						className=" mt-2 border outline-none w-full mx-auto p-3 rounded resize-none h-36"
						defaultValue={user.about}
						placeholder="description about yourself"
					/>
					<p className="text-red-400">{errors.about?.message}</p>
				</div>
				<button
					className="bg-blue-500 mt-9 text-white hover:tracking-wide transition-all w-full p-3 rounded"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
		</ProfileSettingLayout>

	);
}

const GET_USER_INFO = gql`
	query MyQuery($id: uuid) {
		slekret_users(where: { id: { _eq: $id } }) {
			about
			avatar_src
			displayname
			username
		}
	}
`;

const UPDATE_USER_INFO = gql`
	mutation MyMutation(
		$id: uuid
		$avatarSrc: String
		$about: String
		$username: String
		$displayname: String
	) {
		update_slekret_users(
			where: { id: { _eq: $id } }
			_set: {
				about: $about
				username: $username
				avatar_src: $avatarSrc
				displayname: $displayname
			}
		) {
			affected_rows
		}
	}
`;
