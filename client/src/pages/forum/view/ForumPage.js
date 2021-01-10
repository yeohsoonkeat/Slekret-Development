import ThreadList from "../components/ThreadList";
import TopAuthors from "../components/TopAuthors";
import TopCategories from "../components/TopCategories";

export default function ForumPage() {
  return (
          <div className="flex-1 flex justify-between container mx-auto px-6 py-8 h-full">
            <ThreadList />
            <div className="-mx-8 w-4/12 hidden lg:block">
              <TopAuthors />
              <TopCategories />
              </div>
          </div>
  );
}
