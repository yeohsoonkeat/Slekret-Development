import React from 'react';
import ButtonAuth from './components/ButtonAuth';
import ButtonSocial from './components/ButtonSocial';
import Container from './components/Container';
import Footer from './components/Footer';
import Input from './components/Input';
import Title from './components/Title';
import content from './constant';

export default function SignUp() {
	return (
			<Container>
				<Title value={'Sign Up'} />
				{content.signupForm.map((input, index) => {
					return (
						<Input
							key={index}
							placeholder={input.placeholder}
							icon={input.icon}
							type={input.type}
						/>
					);
				})}

				<ButtonAuth value={'Sign Up'} />

				<p className="text-center mt-5 text-sm">or sign up with</p>
				<ButtonSocial
					value={'github'}
					imgSrc={process.env.PUBLIC_URL + '/assets/github.svg'}
				/>
				<Footer content={'Already have an account?'} path="/auth/signin" />
			</Container>
	);
}
