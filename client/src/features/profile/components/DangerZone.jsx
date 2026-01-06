const DangerZone = () => {
  return (
    <div className="border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 rounded-xl p-5">
      <h4 className="font-bold text-red-600 mb-1">Danger Zone</h4>
      <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
        Critical actions that affect your account.
      </p>

      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <h6 className="text-red-600 font-semibold">Delete Account</h6>
          <p className="text-sm">
            This action is permanent and cannot be undone.
          </p>
        </div>
        <button className="btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default DangerZone;
