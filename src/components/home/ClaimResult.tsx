import type { CouponStatusType } from "@/api/coupons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ClaimedUiProps {
  name: string;
  phone: string;
  result: CouponStatusType;
  onBack: () => void;
  qrcode: string | null;
}

const ClaimResult = ({ result, name, phone, qrcode }: ClaimedUiProps) => {
  const { t } = useTranslation("result");

  const getStatusConfig = (status: CouponStatusType) => {
    switch (status) {
      case "claimed":
        return {
          title: t("claimed"),
          subtitle: t("successfullyCalimed"),
          bgColor: "from-green-500 to-emerald-500",
          textColor: "text-green-600",
          icon: "✓",
        };
      case "expired":
        return {
          title: t("expired"),
          subtitle: t("couponExpired"),
          bgColor: "from-red-500 to-rose-500",
          textColor: "text-red-600",
          icon: "✕",
        };
      case "used":
        return {
          title: t("used"),
          subtitle: t("couponUsed"),
          bgColor: "from-gray-500 to-slate-500",
          textColor: "text-gray-600",
          icon: "!",
        };
      case "available":
        return {
          title: t("available"),
          subtitle: t("couponAvailable"),
          bgColor: "from-blue-500 to-cyan-500",
          textColor: "text-blue-600",
          icon: "◉",
        };
      default:
        return {
          title: t("unknown"),
          subtitle: t("unknownStatus"),
          bgColor: "from-gray-400 to-gray-500",
          textColor: "text-gray-500",
          icon: "?",
        };
    }
  };

  const config = getStatusConfig(result);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Status Header */}
      <motion.div
        className="text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {qrcode && (
          <motion.img
            src={qrcode}
            alt="QR Code"
            className="w-24 h-24 mx-auto mb-4 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          />
        )}
        <motion.div
          className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${config.bgColor} rounded-full flex items-center justify-center text-white text-2xl font-bold`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          {config.icon}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{config.title}</h3>
        <p className={`text-sm ${config.textColor} font-medium`}>
          {config.subtitle}
        </p>
      </motion.div>

      {/* User Details */}
      <motion.div
        className="bg-gray-50/50 rounded-lg p-4 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {result === "available" && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                {t("name")}
              </span>
              <span className="text-sm text-gray-900 font-medium">{name}</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                {t("phone")}
              </span>
              <span className="text-sm text-gray-900 font-medium">{phone}</span>
            </div>
          </>
        )}
      </motion.div>
      {/* Action Button */}
      {/* <motion.button
        onClick={onBack}
        className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {t("tryAnother")}
      </motion.button> */}
    </motion.div>
  );
};

export default ClaimResult;
