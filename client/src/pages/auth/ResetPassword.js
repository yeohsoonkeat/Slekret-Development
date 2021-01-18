import { Link } from 'react-router-dom';
import IconMail from '../../icons/icon_mail';
import IconLeft from '../../icons/ic_left';
import ButtonAuth from './components/ButtonAuth';
import Container from './components/Container';
import Input from './components/Input';
import InputPassword from './components/InputPassword';
import Title from './components/Title';
import LayoutForm from './Layout/LayoutForm';

export default function ResetPassword() {
	return (
		<LayoutForm>
			<Container>
				<div className="p-5">
					<Title value="Reset Password" />
					<Input name="text" placeholder="email" type="text" icon={IconMail} />
					<InputPassword name="password" placeholder="password" />
					<InputPassword
						name="confirm-password"
						placeholder="confirm password"
					/>
					<ButtonAuth value="submit" />
					<Link
						to="/auth/login"
						className="mt-5 flex  justify-center hover:tracking-wide transition-all"
					>
						<IconLeft filled className="w-6 h-6" />
						<span>back to loign</span>
					</Link>
				</div>
			</Container>
		</LayoutForm>
	);
}
