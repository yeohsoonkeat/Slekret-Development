import React from 'react';
import IconEmail from '../../icons/ic_email';
import IconPassword from '../../icons/ic_password';
import ButtonAuth from './components/ButtonAuth';
import ButtonSocial from './components/ButtonSocial';
import Container from './components/Container';
import Footer from './components/Footer';
import Input from './components/Input';
import Title from './components/Title';
import Layout from './Layout';

export default function SignIn() {
	return (
		<Layout>
			<Container>
				<Title value={'Sign In'} />
				<Input placeholder="Email" icon={IconEmail} type="text" name="email" />
				<Input
					placeholder="Password"
					icon={IconPassword}
					type="password"
					name="password"
				/>
				<ButtonAuth value={'Sign In'} />

				<p className="text-center mt-5 text-sm">or sign in with</p>

				<ButtonSocial
					imgSrc={process.env.PUBLIC_URL + '/assets/github.svg'}
					title="github"
				/>

				<Footer content={'Already have an account?'} path="/auth/signup" />
			</Container>
		</Layout>
	);
}
