import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
          Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
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
          Phone
        </Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
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
        Claim Coupon
      </motion.button>
    </motion.form>
  );
};

export default ClaimForm;
