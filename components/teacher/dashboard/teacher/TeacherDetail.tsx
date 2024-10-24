import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoveUpRight } from "lucide-react";
import { Typography } from "@/components/ui/typography";

const TeacherDetail = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="p-2 rounded-full flex justify-center items-center text-sm font-medium text-white bg-blue-500  hover:bg-blue-600 ">
          <MoveUpRight size={15} />
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Teacher Detail</DialogTitle>
            <DialogDescription>All about teacher details</DialogDescription>
          </DialogHeader>
          {/* Teacher details */}
          <div className="grid grid-cols-2 bg-gray-500 rounded-lg p-3">
            <Typography variant="t3" className="text-white">
              Teacher Name
            </Typography>
            <Typography variant="t3" className="text-white">
              Ali Rehn
            </Typography>
            <Typography variant="t3" className="text-white">
              Department
            </Typography>
            <Typography variant="t3" className="text-white">
              Computer Science
            </Typography>
            <Typography variant="t3" className="text-white">
              Total Lectures
            </Typography>
            <Typography variant="t3" className="text-white">
              5
            </Typography>
          </div>
          {/* Teacher Lectures */}
          <div className="flex flex-col gap-2">

            <div className="grid grid-cols-4 bg-gray-500 rounded-lg p-3">
              <Typography variant="t3" className="text-white">
                Book Name
              </Typography>
              <Typography variant="t3" className="text-white">
                Deparment
              </Typography>
              <Typography variant="t3" className="text-white">
                Time
              </Typography>
              <Typography variant="t3" className="text-white">
                Days
              </Typography>
            </div>
            <div className="grid grid-cols-4 bg-gray-500 rounded-lg p-3">
              <Typography variant="t3" className="text-white">
                Ali Sb.
              </Typography>
              <Typography variant="t3" className="text-white">
                CS
              </Typography>
              <Typography variant="t3" className="text-white">
                12:45 pm to 1:00 pm
              </Typography>
              <Typography variant="t3" className="text-white">
                Monday, Tuesday and Wednesday
              </Typography>
            </div>


          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDetail;
