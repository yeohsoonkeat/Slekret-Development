import DefaultLayout from '../../layout/default';
import ProfileRoute from './routes';

export default function Profile() {
  return (
    <DefaultLayout>

    <div className="w-full max-w-8xl flex-1">
      <ProfileRoute />
    </div>
    </DefaultLayout>

  );
}
