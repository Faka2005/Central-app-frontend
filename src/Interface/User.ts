export type User = {
  username: string;
  email: string;
  role: string;
  createdAt: string;
};
export type UserProfile = {
  firstname: string;
  lastname: string;
  bio: string;
  interests: UserInterest[];
  niveau: string;
  campus: string;
  isTutor: boolean;
  
};
export type UserWithProfile = User & { profile: UserProfile };

export type UserInterest = {
  id: string;
  name: string;
};