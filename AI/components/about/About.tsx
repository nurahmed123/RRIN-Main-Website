import React from "react";
import Letter from "./Letter";
import SectionHeading from "../SectionHeading";

export default function About() {
  return (
    <div id="about" className="mx-auto max-w-[1000px] px-4">
      <SectionHeading
        heading="What is BiteBD?"
        subheading="Fighting Protein Deficiency with Affordable Nutrition Solutions"
      />
      <div className="mt-6 text-lg leading-relaxed text-gray-300">
      </div>
      <Letter />
    </div>
  );
}
