"use client";

import { getCoupons } from "@/api/coupons";
import Header from "@/components/general/Header";
import ClaimCard from "@/components/home/ClaimCard";
import { useQuery } from "@tanstack/react-query";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const HomePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: claimCards, isLoading } = useQuery({
    queryKey: ["claimCards", id],
    queryFn: () => getCoupons(id as string),
    refetchOnWindowFocus: false,
  });

  console.log("Claim Cards:", claimCards);
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
          slides: { perView: claimCards?.length === 2 ? 2 : 3, spacing: 20 },
        },
      },
      slides: { perView: 1, spacing: 10 },
    },
    (claimCards?.length ?? 0) > 1 ? [] : undefined // Disable slider if only 1 item
  );

  useEffect(() => {
    if (!isLoading && !claimCards) {
      navigate("/not_found", { replace: true });
    }
  }, [instanceRef]);

  // Single card case
  if (claimCards?.length === 1) {
    return (
      <div>
        <ClaimCard card={claimCards[0]} />
      </div>
    );
  }

  return (
    <div className="relative ">
      <Header />
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {claimCards?.map((card, i) => (
          <div key={i} className="keen-slider__slide bg-transparent">
            <ClaimCard card={card} />
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
        {claimCards?.map((_, idx) => (
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
