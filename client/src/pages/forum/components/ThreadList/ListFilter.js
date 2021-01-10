export default function ListFilter() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
                  Discussion
                </h1>
                <div>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Latest</option>
                    <option>Popular</option>
                  </select>
                </div>
              </div>            
        </div>
    )
}
