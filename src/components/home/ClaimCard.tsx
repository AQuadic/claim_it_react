import { claimCoupon, type CouponTypes } from "@/api/coupons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ClaimForm from "./ClaimForm";
import ClaimResult from "./ClaimResult";

type STEPS = "form" | "result";

interface ClaimCardProps {
  card: CouponTypes;
}

const ClaimCard = ({ card }: ClaimCardProps) => {
  const { id: hash } = useParams();

  const [step, setStep] = useState<STEPS>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [qr, setQr] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await claimCoupon(card.id, hash as string, name, phone);
      setQr(response.qrcode);
      setStep("result");
    } catch (error) {
      console.error("Error claiming coupon:", error);
    }
  };

  const handleBack = () => {
    setStep("form");
    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (card.status !== "available") {
      setStep("result");
    }
  }, [card]);

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 relative overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content container */}
      <motion.div
        className="relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl p-10 border border-white/40 max-w-sm w-full mx-4 "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="text-lg font-medium text-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center flex-col ">
              <Avatar className="border border-gray-300  w-12 h-12">
                <AvatarImage src={card.influencer.image?.url} />
                <AvatarFallback>
                  {card.influencer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{card.influencer.name}</span>
            </div>
          </motion.div>
          <motion.div
            className="w-1 h-1 bg-orange-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="text-lg font-medium text-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center flex-col">
              <Avatar className="border border-gray-300 w-12 h-12">
                <AvatarImage src={card.provider.image?.url} />
                <AvatarFallback>{card.provider.name.charAt(0)} </AvatarFallback>
              </Avatar>
              <span> {card.provider.name}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Coupon code */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-3"
            whileHover={{ scale: 1.05 }}
          >
            {card.code}
          </motion.div>
          <motion.div
            className="h-px w-16 mx-auto bg-gradient-to-r from-orange-400 to-amber-400"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </motion.div>

        {/* Coupon details - Only show on form step */}
        <AnimatePresence>
          {step === "form" && (
            <motion.div
              className="text-center space-y-3 mb-8"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-gray-600">
                Valid till{" "}
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent font-semibold">
                  {new Date(card.expire_date).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-600">{card.note}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content with Animation */}
        <AnimatePresence mode="wait">
          {step === "form" && (
            <ClaimForm
              key="form"
              name={name}
              phone={phone}
              setName={setName}
              setPhone={setPhone}
              onSubmit={handleSubmit}
            />
          )}
          {step === "result" && (
            <ClaimResult
              key="result"
              name={name}
              phone={phone}
              result={card.status}
              onBack={handleBack}
              qrcode={qr}
            />
          )}
        </AnimatePresence>

        {/* Minimal decorative element */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full opacity-60"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </main>
  );
};

export default ClaimCard;
