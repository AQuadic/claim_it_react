import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t, i18n } = useTranslation("notFound");
  const isRTL = i18n.language === "ar";

  const handleGoBack = () => {
    // In a real app, this would use router.back() or navigate(-1)
    window.history.back();
  };

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 relative overflow-hidden"
      style={{ fontFamily: isRTL ? "Cairo, sans-serif" : "Inter, sans-serif" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated background elements */}
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
        <motion.div
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content container */}
      <motion.div
        className="relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl p-12 border border-white/40 max-w-lg w-full mx-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 404 Number */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h1
            className="text-8xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            404
          </motion.h1>
          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Error message */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            {t("notFound.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("notFound.description")}
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button
            onClick={handleGoBack}
            className="w-full py-3 px-6 bg-white/50 backdrop-blur-sm text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-white/70 transition-all duration-300"
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {t("notFound.goBack")}
          </motion.button>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className={`absolute top-6 ${
            isRTL ? "left-6" : "right-6"
          } w-3 h-3 bg-orange-400 rounded-full opacity-60`}
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

        <motion.div
          className={`absolute bottom-6 ${
            isRTL ? "right-6" : "left-6"
          } w-2 h-2 bg-amber-400 rounded-full opacity-50`}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className={`absolute top-1/2 ${
            isRTL ? "left-4" : "right-4"
          } w-1 h-1 bg-orange-300 rounded-full`}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>

      {/* Additional floating elements outside the card */}
      <motion.div
        className={`absolute top-1/4 ${
          isRTL ? "left-1/3" : "right-1/3"
        } w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-40`}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute bottom-1/4 ${
          isRTL ? "right-1/3" : "left-1/3"
        } w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-50`}
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </main>
  );
};

export default NotFoundPage;
