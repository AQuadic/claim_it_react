import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ClaimForm from "../components/home/ClaimForm";
import ClaimedUi from "../components/home/ClaimedUi";

type STEPS = "form" | "result";
type CouponStatus = "claimed" | "out_dated" | "used";

const HomePage = () => {
  const [step, setStep] = useState<STEPS>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [couponStatus, setCouponStatus] = useState<CouponStatus>("claimed");

  const handleSubmit = () => {
    // Simulate different coupon statuses for demo
    const statuses: CouponStatus[] = ["claimed", "out_dated", "used"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setCouponStatus(randomStatus);
    setStep("result");
  };

  const handleBack = () => {
    setStep("form");
    setName("");
    setPhone("");
  };

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
        className="relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl p-10 border border-white/40 shadow-xl max-w-sm w-full mx-4"
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
            Influencer
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
            Provider
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
            COUPON50
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
              <p className="text-sm text-gray-600">Valid till 20th of May</p>
              <p className="text-sm text-gray-600">
                For orders from $100 up to $1000
              </p>
              <motion.p
                className="text-sm font-medium text-orange-600"
                whileHover={{ scale: 1.02 }}
              >
                Valid on all products only, but no services
              </motion.p>
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
            <ClaimedUi
              key="result"
              name={name}
              phone={phone}
              result={couponStatus}
              onBack={handleBack}
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

export default HomePage;
