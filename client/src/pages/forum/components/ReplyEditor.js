const ReplyEditor = (props) => {
  const { cancel, reply } = props;

  return (
    <>
      <textarea
        className="bg-gray-200 w-full resize-none h-24 rounded-md p-2"
        placeholder="Write comment..."
      />

      <div className="mt-1 flex justify-end items-center space-x-2">
        <button className="px-4 py-2 rounded-md text-sm" onClick={cancel}>
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-md text-sm border bg-blue-600 text-white"
          onClick={reply}
        >
          Reply
        </button>
      </div>
    </>
  );
};

export default ReplyEditor;
