"use client";

import Header from "@/components/general/Header";
import ClaimCard from "@/components/home/ClaimCard";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const items = [1, 2, 3, 4, 5]; // Replace with your actual claim data
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 15 },
        },
        "(min-width: 1024px)": {
          slides: { perView: items.length === 2 ? 2 : 3, spacing: 20 },
        },
      },
      slides: { perView: 1, spacing: 10 },
    },
    items.length > 1 ? [] : undefined // Disable slider if only 1 item
  );

  // Single card case
  if (items.length === 1) {
    return (
      <div>
        <ClaimCard />
      </div>
    );
  }

  return (
    <div className="relative ">
      <Header />
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {items.map((_, i) => (
          <div key={i} className="keen-slider__slide">
            <ClaimCard />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-orange-500 p-2 rounded-full text-white shadow-md hover:bg-orange-600"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-orange-500 p-2 rounded-full text-white shadow-md hover:bg-orange-600"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === idx ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
