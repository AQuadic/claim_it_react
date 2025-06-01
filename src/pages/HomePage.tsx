"use client";
import { getCoupons } from "@/api/coupons";
import ClaimCard from "@/components/home/ClaimCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

// Skeleton component for individual claim card
const ClaimCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full blur-3xl" />
      </div>

      {/* Main skeleton card */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl p-10 border border-white/40 max-w-sm w-full mx-4">
        {/* Header - Influencer and Provider avatars */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center flex-col">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-4 w-20 mt-2" />
          </div>
          <Skeleton className="w-1 h-1 rounded-full" />
          <div className="flex items-center flex-col">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
        </div>

        {/* Coupon code */}
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-32 mx-auto mb-3" />
          <Skeleton className="h-px w-16 mx-auto" />
        </div>

        {/* Coupon details */}
        <div className="text-center space-y-3 mb-8">
          <Skeleton className="h-4 w-40 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>

        {/* Form inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>

        {/* Submit button */}
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* Decorative dots */}
        <Skeleton className="absolute top-4 right-4 w-2 h-2 rounded-full" />
      </div>
    </div>
  );
};

// Skeleton for slider navigation
const SliderSkeletonControls = () => {
  return (
    <>
      {/* Arrow skeletons */}
      <Skeleton className="absolute top-1/2 left-2 -translate-y-1/2 z-10 w-10 h-10 rounded-full" />
      <Skeleton className="absolute top-1/2 right-2 -translate-y-1/2 z-10 w-10 h-10 rounded-full" />

      {/* Dots skeleton */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} className="w-3 h-3 rounded-full" />
        ))}
      </div>
    </>
  );
};

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
  }, [isLoading, claimCards, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <div className="relative">
        {/* Single skeleton for mobile, multiple for larger screens */}
        <div className="block sm:hidden">
          <ClaimCardSkeleton />
        </div>

        {/* Multiple skeletons for larger screens */}
        <div className="hidden sm:block">
          <div className="flex gap-4 p-4">
            <div className="flex-1">
              <ClaimCardSkeleton />
            </div>
            <div className="flex-1 hidden lg:block">
              <ClaimCardSkeleton />
            </div>
            <div className="flex-1 hidden lg:block">
              <ClaimCardSkeleton />
            </div>
          </div>
        </div>

        {/* Skeleton controls */}
        <SliderSkeletonControls />
      </div>
    );
  }

  // Single card case
  if (claimCards?.length === 1) {
    return (
      <div>
        <ClaimCard card={claimCards[0]} />
      </div>
    );
  }

  // Multiple cards case
  return (
    <div className="relative">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {claimCards?.map((card, i) => (
          <div
            key={i}
            className="keen-slider__slide bg-transparent max-h-[80dvh]"
          >
            <ClaimCard card={card} />
          </div>
        ))}
      </div>

      {/* Show controls only if there are multiple cards */}
      {(claimCards?.length ?? 0) > 1 && (
        <>
          {/* Arrows */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-orange-500 p-2 rounded-full text-white shadow-md hover:bg-orange-600 transition-colors duration-200"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-orange-500 p-2 rounded-full text-white shadow-md hover:bg-orange-600 transition-colors duration-200"
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
        </>
      )}
    </div>
  );
};

export default HomePage;
