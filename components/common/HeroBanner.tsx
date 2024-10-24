import Image from "next/image";
import React from "react";
import { Typography } from "../ui/typography";
import { getDate, getTime } from "@/utils/getDateAndTime";

const HeroBanner = () => {
  return (
    <div className="w-full relative py-3">
      {/* <Image
        src={"/images/hero-bg.svg"}
        height={1200}
        width={1280}
        className="w-[1280px] rounded-2xl"
        alt="Hero"
        quality={100}
      /> */}

      <div className="absolute flex flex-col gap-1 md:gap-3 bottom-6 md:bottom-20 left-6 md:left-10 text-white">
        <Typography variant="h2" weight="bold" className="text-white">
            { getTime() }
        </Typography>
        <Typography className="text-white">
            { getDate() }
        </Typography>
      </div>
    </div>
  );
};

export default HeroBanner;
