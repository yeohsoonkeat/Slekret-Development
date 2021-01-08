import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required().min(2),
})

const formsInput = [
	{
		name: 'name',
		type: 'text',
		placeholder: 'Name',
	},
	{
		name: 'email',
		type: 'email',
		placeholder: 'Email',
	},
	{
		name: 'password',
		type: 'password',
		placeholder: 'password',
	},
]

export default function Register() {
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	})
	const onSubmit = (data) => {
		console.log(data)
		//send this data to backend
	}

	return (
		<>
			<div className="container mx-auto px-4 h-full">
				<div className="flex content-center items-center justify-center h-full">
					<div className="w-full lg:w-6/12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
							<div className="rounded-t mb-0 px-6 py-6">
								<div className="text-center mb-3">
									<h6 className="text-gray-600 text-sm font-bold">
										Sign up with
									</h6>
								</div>
								<div className="btn-wrapper text-center">
									<button className="btn-login-socail mr-2" type="button">
										<img
											alt="..."
											className="w-5 mr-1"
											src={process.env.PUBLIC_URL + '/assets/github.svg'}
										/>
										Github
									</button>
									<button className="btn-login-socail mr-1" type="button">
										<img
											alt="..."
											className="w-5 mr-1"
											src={process.env.PUBLIC_URL + '/assets/google.svg'}
										/>
										Google
									</button>
								</div>
								<hr className="mt-6 border-b-1 border-gray-400" />
							</div>
							<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
								<div className="text-gray-500 text-center mb-3 font-bold">
									<small>Or sign up with credentials</small>
								</div>
								<form onSubmit={handleSubmit(onSubmit)}>
									{formsInput.map((form, index) => {
										return (
											<div className="relative w-full mb-3" key={index}>
												<label
													className="block uppercase text-gray-700 text-xs font-bold mb-2"
													htmlFor="grid-password"
												>
													{form.name}
												</label>
												<input
													ref={register}
													type={form.type}
													className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
													placeholder={form.placeholder}
													name={form.name}
													autoComplete="true"
												/>
												<p className="text-sm text-red-500">
													{errors[form.name]?.message}
												</p>
											</div>
										)
									})}
									<div className="text-center mt-6">
										<input
											className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
											type="submit"
											value="Create Account"
										/>
									</div>
								</form>
							</div>
						</div>
						<div className="text-center">
							<Link to="/auth/login" className="text-gray-300 text-xl">
								<small className="underline">Already have an account ?</small>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
