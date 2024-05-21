import { getUserProfile } from "@/services/supabaseServices";

const UserProfile = ({ params }: { params: { handle: string } }) => {
  // const userProfile = getUserProfile();
  return (
    <div>
      <h3>User Profile</h3>
    </div>
  );
};

export default UserProfile;
