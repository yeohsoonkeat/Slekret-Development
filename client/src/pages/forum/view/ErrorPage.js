function ErrorPage({ error }) {
  console.log(error);

  return (
    <div className="bg-gray-300 h-full flex items-center justify-center text-9xl font-black text-gray-800">
      ERROR.
    </div>
  );
}

export default ErrorPage;
