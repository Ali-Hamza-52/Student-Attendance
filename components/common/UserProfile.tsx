import React from "react";
import { UserRound } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface UserType {
    email: string;
    teacherName: string;
    address: string;
    contactNumber: string;
    department: string;
  };  
  

interface MyComponentProps {
    teacher: UserType;
  }

const UserProfile: React.FC<MyComponentProps> = ({ teacher }) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="bg-white px-2 rounded-full flex items-center justify-center py-2 ">
        <UserRound size={25} />
      </HoverCardTrigger>
      <HoverCardContent className="w-fit mx-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {teacher.teacherName}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {teacher.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {teacher.contactNumber}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {teacher.address}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserProfile;
