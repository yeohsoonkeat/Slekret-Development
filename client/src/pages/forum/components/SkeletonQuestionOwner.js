function SkeletonQuestionOwner() {
  return (
    <div className="mt-4 flex items-center justify-between select-none animate-pulse">
      <div className="flex items-center">
        <div className="bg-gray-300 w-12 h-12 rounded-full" />
        <div className="ml-2">
          <div className="bg-gray-300 w-40 h-6 mb-1" />
          <div className="bg-gray-300 w-16 h-4" />
        </div>
      </div>
      <div className="bg-gray-300 w-32 h-9 rounded" />
    </div>
  );
}

export default SkeletonQuestionOwner;
