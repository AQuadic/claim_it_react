import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";

interface ClaimFormProps {
  name: string;
  phone: string;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  onSubmit: () => void;
}

const ClaimForm = ({
  name,
  phone,
  setName,
  setPhone,
  onSubmit,
}: ClaimFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onSubmit();
    }
  };

  const {t} = useTranslation("home");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const validatedInput = input.replace(/\D/g, "");
    setPhone(validatedInput);
  };

  return (
    <motion.form
      className="space-y-5"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="space-y-2"
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          {t('name')}
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('namePlaceholder')}
          className="bg-white/60 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20 h-11"
          required
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          {t('phone')}
        </Label>
        <Input
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          placeholder={t('phonePlaceholder')}
          className="bg-white/60 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:ring-orange-400/20 h-11"
          required
        />
      </motion.div>

      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-all duration-200 mt-6"
        whileHover={{
          scale: 1.01,
          boxShadow: "0 4px 20px rgba(249, 115, 22, 0.25)",
        }}
        whileTap={{ scale: 0.99 }}
      >
        {t('claimButton')}
      </motion.button>
    </motion.form>
  );
};

export default ClaimForm;
