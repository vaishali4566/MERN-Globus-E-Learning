import DashboardLayout from "../../components/layout/DashboardLayout";
import ProfileHeader from "../../features/profile/components/ProfileHeader";
import BasicInfoCard from "../../features/profile/components/BasicInfoCard";
import SocialLinksCard from "../../features/profile/components/SocialLinksCard";
import ExpertiseCard from "../../features/profile/components/ExpertiseCard";
import AccountSettingsForm from "../../features/profile/components/AccountSettingsForm";
import DangerZone from "../../features/profile/components/DangerZone";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            <BasicInfoCard />
            <SocialLinksCard />
            <ExpertiseCard />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-6">
            <AccountSettingsForm />
            <DangerZone />
          </div>
        </div>
        
      </div>
    </DashboardLayout>
  );
};

export default Profile;