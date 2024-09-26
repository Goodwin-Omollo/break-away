"use client";

import { MarqueeDemo } from "@/components/appreciation";
import StepperWithConfetti from "@/components/stepperwithconfetti";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-center">
        Discover The Magic of Break Away
      </h1>
      <div className="mt-4 leading-loose">
        <p className="mb-3">
          When it comes to planning for a holiday - whether short or long, the
          process can often be overwhelming. You know you want to escape the
          hustle and bustle, but finding the perfect spot - one that matches
          your preferences, budget, and timeframe - can feel like a never-ending
          search through countless options. That&apos;s where our app stands
          out.
        </p>
        <p className="mb-3">
          With our unique AI - powered assistant, you don&apos;t have to scroll
          through a sea of destinations. Simply describe your ideal getaway -
          whether it's a romantic beach retreat, a thrilling adventure in the
          mountains, or a peaceful countryside escape - and let our app handle
          the rest.
        </p>
        <p className="mb-3">
          By understanding your preferences, desired locations, and budget, the
          assistant intelligently scans through all available options, filtering
          out the noise and presenting you with a personalized selection of
          destinations. This means no more wasted hours clicking through endless
          pages or wondering if you've missed a hidden gem. The result? A
          stress-free planning experience that&apos;s both enjoyable and
          efficient.
        </p>
        <p className="mb-4">
          Our application is a game-changer in the world of travel planning,
          leveraging advanced AI technology to do all the heavy lifting for you.
        </p>
        <StepperWithConfetti />
      </div>

      {/* <h2 className="text-2xl md:text-3xl font-bold text-center mt-6">
        Breaking Boundaries, One Getaway at a Time
      </h2>
      <blockquote className="italic text-gray-700 mt-4">
        At Break Away, we believe that everyone deserves a perfect escape - a
        chance to leave behind the daily grind and immerse themselves in the
        magic of discovery. Our users have shared their joy, gratitude, and
        memorable experiences, and it&apos;s these stories that inspire us every
        day. Whether it&apos;s a couple finding their dream beachside retreat, a
        family bonding over a weekend adventure, or a solo traveler uncovering
        hidden gems, we&apos;ve been privileged to be part of these journeys.
        Each piece of feedback is a testament to the transformative power of
        travel and the impact our app has had on making these moments effortless
        and unforgettable. We are truly humbled and excited to continue breaking
        boundaries, one getaway at a time, with you.
      </blockquote>
      <MarqueeDemo /> */}
    </div>
  );
};

export default About;
