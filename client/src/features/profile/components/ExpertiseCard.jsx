const Skill = ({ name, value }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>{name}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-gray-200 dark:bg-darkHover rounded-full">
      <div
        className="h-2 bg-blue-600 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const ExpertiseCard = () => {
  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl p-5 shadow">
      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
        Expertise
      </h4>

      <div className="space-y-3 text-sm">
        <Skill name="JavaScript" value={75} />
        <Skill name="PHP" value={87} />
        <Skill name="Photoshop" value={67} />
        <Skill name="Illustrator" value={84} />
      </div>
    </div>
  );
};

export default ExpertiseCard;
