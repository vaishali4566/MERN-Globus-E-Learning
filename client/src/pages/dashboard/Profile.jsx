import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ProfileHeader from "../../components/profile/ProfileHeader";
import BasicInfoCard from "../../components/profile/BasicInfoCard";
import SocialLinksCard from "../../components/profile/SocialLinksCard";
import ExpertiseCard from "../../components/profile/ExpertiseCard";
import AccountSettingsForm from "../../components/profile/AccountSettingsForm";
import DangerZone from "../../components/profile/DangerZone";

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
