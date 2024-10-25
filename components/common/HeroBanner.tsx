import Image from "next/image";
import React from "react";
import { Typography } from "../ui/typography";
import { getDate, getTime } from "@/utils/getDateAndTime";

const HeroBanner = () => {
  return (
    <div className="w-full relative py-3">
      <Image
        src={"/images/hero.jpg"}
        height={400}
        width={1280}
        className="w-[1280px] h-56 md:h-96 rounded-2xl"
        alt="Hero"
        quality={100}
      />

      <div className="absolute flex flex-col gap-1 md:gap-3 bottom-6 md:bottom-20 left-6 md:left-10 text-white">
        <Typography variant="h1" weight="bold" className="text-white">
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
