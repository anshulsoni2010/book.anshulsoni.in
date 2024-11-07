import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';

const DiscountPopup = ({ onClose, onApplyCoupon }: { onClose: () => void; onApplyCoupon: (coupon: { code: string; discount: string }) => void }) => {
  const [selectedCoupon, setSelectedCoupon] = useState<{ code: string; discount: string } | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [showRedeemCode, setShowRedeemCode] = useState(false);

  const coupons = [
    { code: 'EARLYBIRD30', discount: '30%', redeemCode: 'PHF96JT527KHF' },
  ];

  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      onApplyCoupon(selectedCoupon);
      setCouponApplied(true);
      setShowRedeemCode(true);
    }
  };

  const handleCopyRedeemCode = async () => {
    const redeemCode = coupons[0].redeemCode; // Correctly reference redeemCode
    if (redeemCode) {
      try {
        await navigator.clipboard.writeText(redeemCode);
        toast.success('Redeem code copied to clipboard!', { theme: 'dark' });
      } catch (error) {
        console.error('Failed to copy: ', error);
        toast.error('Failed to copy redeem code. Please try again.', { theme: 'dark' });
      }
    } else {
      toast.error('No redeem code available to copy.', { theme: 'dark' });
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative"
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Special Discount!</h2>
      {couponApplied ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }} // Smooth transition for redeem code
          className="flex flex-col items-center"
        >
       
          <motion.div className="flex flex-col items-center" onClick={handleCopyRedeemCode}>
            <p className="text-gray-600 text-center mb-4 font-bold text-lg">Your coupon code: Redeem Code: {coupons[0].redeemCode}</p>
            <Button className="bg-green-500 hover:bg-green-600 text-white mb-2 flex items-center">
              <Copy className="w-4 h-4 mr-2" /> {/* Copy icon added */}
              Copy Redeem Code
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {coupons.map((coupon) => (
            <motion.div
              key={coupon.code}
              className={`p-4 border rounded-lg cursor-pointer ${selectedCoupon === coupon ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
              onClick={() => setSelectedCoupon(coupon)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="font-bold">{coupon.code}</p>
              <p className="text-sm text-gray-600">Discount: {coupon.discount}</p>
            </motion.div>
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        {!couponApplied && (
          <Button onClick={handleApplyCoupon} disabled={!selectedCoupon}>Apply Coupon</Button>
        )}
      </div>
    </motion.div>
  );
};

export default DiscountPopup;
