import IconInfo from '../../../icons/ic_info';

function ReportButton() {
  return (
    <div className="flex items-center text-gray-600 hover:cursor-pointer hover:font-medium hover:text-gray-800">
      <IconInfo className="w-6 h-6" />
      <p className="ml-1 text-sm">Report</p>
    </div>
  );
}

export default ReportButton;
