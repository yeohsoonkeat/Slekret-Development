function QuestionDetailSkeleton() {
  return (
    <div className="select-none animate-pulse">
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Question Owner Avatar */}
          <div className="bg-gray-300 w-12 h-12 rounded-full" />
          <div className="ml-2">
            {/* Question Owner Display Name */}
            <div className="bg-gray-300 w-40 h-6 mb-1" />
            {/* Question Published Date */}
            <div className="bg-gray-300 w-16 h-4" />
          </div>
        </div>
        {/* Follow Button */}
        <div className="bg-gray-300 w-32 h-9 rounded" />
      </div>

      {/* Question Content */}
      <div className="py-4 flex flex-col space-y-2">
        <div className="bg-gray-300 w-full h-4"></div>
        <div className="bg-gray-300 w-full h-4"></div>
        <div className="bg-gray-300 w-4/5 h-4"></div>
        <div className="bg-gray-300 w-3/5 h-4"></div>
      </div>

      {/* Answers */}
      <div className="bg-gray-300 mt-12 mb-4 w-24 h-8"></div>
      <div className="border" />

      {/* Answer Card */}
      <div className="mt-6 px-4 pt-4 pb-12 bg-gradient-to-b from-white to-transparent rounded-lg flex">
        <div className="bg-gray-300 w-12 h-12 rounded-full z-10" />

        <div className="ml-4 w-full">
          <div className="flex justify-between items-center w-full">
            <div>
              {/* Answer Owner Display Name */}
              <div className="bg-gray-300 w-40 h-6 mb-1" />
              {/* Answer Published Date */}
              <div className="bg-gray-300 w-16 h-4" />
            </div>

            {/* Vote Buttons */}
            <div className="flex items-center">
              <div className="bg-gray-300 w-8 h-8 mr-2" />
              <div className="bg-gray-300 w-8 h-8" />
            </div>
          </div>

          <div className="py-3">
            {/* Answer Content */}
            <div className="py-4 flex flex-col space-y-2">
              <div className="bg-gray-300 w-full h-4"></div>
              <div className="bg-gray-300 w-full h-4"></div>
              <div className="bg-gray-300 w-4/5 h-4"></div>
              <div className="bg-gray-300 w-3/5 h-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetailSkeleton;
