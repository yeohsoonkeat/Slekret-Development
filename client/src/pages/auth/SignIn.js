import React from 'react';
import IconEmail from '../../icons/ic_email';
import ButtonAuth from './components/ButtonAuth';
import ButtonSocial from './components/ButtonSocial';
import Container from './components/Container';
import Footer from './components/Footer';
import Input from './components/Input';
import InputPassword from './components/InputPassword';
import Title from './components/Title';
import LayoutForm from './Layout/LayoutForm';
export default function SignIn() {
	return (
		<LayoutForm>
			<Container>
				<div className="p-5">
					<Title value={'Sign In'} />
					<Input
						placeholder="Email"
						icon={IconEmail}
						type="text"
						name="email"
					/>
					<InputPassword placeholder="Password" />

					<ButtonAuth value={'Sign In'} />

					<p className="text-center mt-5 text-sm">or sign in with</p>

					<ButtonSocial
						imgSrc={process.env.PUBLIC_URL + '/assets/github.svg'}
						title="github"
					/>

					<Footer content={'Already have an account?'} path="/auth/signup" />
				</div>
			</Container>
		</LayoutForm>
	);
}
