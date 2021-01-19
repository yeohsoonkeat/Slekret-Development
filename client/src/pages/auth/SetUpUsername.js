import AlertError from './components/AlertError';
import ButtonAuth from './components/ButtonAuth';
import Container from './components/Container';
import Input from './components/Input';
import LoadingForm from './components/LoadingForm';
import Title from './components/Title';
import constant from './constant';
import LayoutForm from './Layout/LayoutForm';

export default function SetUpUsername() {
	return (
		<LayoutForm>
			<AlertError />
			<Container>
				<div className="p-5">
					<Title value={'Set up username'} />

					{constant.usernameForm.map((input, index) => {
						return (
							<Input
								key={index}
								type={input.name}
								placeholder={input.placeholder}
								name={input.name}
								icon={input.icon}
							/>
						);
					})}
					<ButtonAuth value={'Submit'} />
				</div>
			</Container>
			<LoadingForm />
		</LayoutForm>
	);
}
