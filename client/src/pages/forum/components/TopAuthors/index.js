import Author from "./Author";

export default function TopAuthors() {
  const users = [
    {
      username: "YSK",
      Threads: 12,
    },
    {
        username: "YSK",
        Threads: 12,
      },
  ];
  return (
    <div className="px-8">
      <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
      <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
        <ul className="-mx-4">
          {users.map((user, index) => (
            <li key={index}>
              <Author Author={user}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
