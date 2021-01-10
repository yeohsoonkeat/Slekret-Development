import Category from "./category";

export default function index() {
  const categories = [{ name: "Laravel", url: "category/laravel" }];
  return (
    <div>
      <div className="mt-10 px-8">
        <h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
        <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
          {categories.map((cat, index) => (
            <li key={index}>
              <Category cat={cat}/>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
