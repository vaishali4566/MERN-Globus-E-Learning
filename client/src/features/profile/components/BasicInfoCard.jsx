const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
  </div>
);

const BasicInfoCard = () => {
  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl shadow p-5">
      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
        Basic Information
      </h4>

      <div className="space-y-4">
        <InfoRow label="Full Name" value="Emma Smith" />
        <InfoRow label="Email" value="emma.smith@gmail.com" />
        <InfoRow label="Phone" value="+1 (123) 456-7890" />
        <InfoRow label="Date of Birth" value="15 July 1990" />
      </div>
    </div>
  );
};

export default BasicInfoCard;
