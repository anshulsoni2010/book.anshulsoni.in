import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";

const DiscountPopup = ({ onClose, onApplyCoupon }: { onClose: () => void; onApplyCoupon: (coupon: { code: string; discount: string }) => void }) => {
  const [selectedCoupon, setSelectedCoupon] = useState<{ code: string; discount: string } | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const coupons = [
    { code: 'JSMASTERY20', discount: '20%' },
    { code: 'EARLYBIRD15', discount: '15%' }
  ];

  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      onApplyCoupon(selectedCoupon);
      setCouponApplied(true);
    }
  };

  const handleAvailDiscount = () => {
    setShowShareOptions(true);
  };

  const handleShare = (platform: string) => {
    if (!selectedCoupon) return;

    const message = `Check out this discount code: ${selectedCoupon.code} for ${selectedCoupon.discount} off!`;
    const url = 'https://jsmastery.com'; // Link to share
    let shareUrl;

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)} ${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)} ${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`; // Instagram doesn't support direct sharing like others
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
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
        <div className="flex flex-col items-center">
          <p className="text-gray-600 mb-4 font-bold text-lg">Your coupon code: <span className="text-green-500">{selectedCoupon?.code}</span></p>
          <Button onClick={handleAvailDiscount} className="bg-green-500 hover:bg-green-600 text-white mb-2">
            Avail Discount
          </Button>
        </div>
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
      {showShareOptions && (
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-600 mb-4">Share this discount on your socials!</p>
          <div className="flex flex-col space-y-2">
            <Button onClick={() => handleShare('whatsapp')} className="bg-green-500 hover:bg-green-600 text-white">
              Share on WhatsApp
            </Button>
            <Button onClick={() => handleShare('twitter')} className="bg-blue-400 hover:bg-blue-500 text-white">
              Share on Twitter
            </Button>
            <Button onClick={() => handleShare('linkedin')} className="bg-blue-700 hover:bg-blue-800 text-white">
              Share on LinkedIn
            </Button>
            <Button onClick={() => handleShare('instagram')} className="bg-pink-500 hover:bg-pink-600 text-white">
              Share on Instagram
            </Button>
          </div>
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
