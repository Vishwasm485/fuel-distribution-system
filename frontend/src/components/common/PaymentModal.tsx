"use client";

import {
  motion
} from "framer-motion";

type Props = {
  open: boolean;
  success: boolean;
};

export default function PaymentModal({
  open,
  success,
}: Props) {

  if(!open){
    return null;
  }

  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <motion.div

        initial={{
          scale: 0.5,
          opacity: 0,
        }}

        animate={{
          scale: 1,
          opacity: 1,
        }}

        className="bg-slate-900 p-10 rounded-2xl w-100 text-center"
      >

        {!success ? (

          <>

            <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />

            <h1 className="text-3xl font-bold text-orange-400 mb-3">
              Processing Payment
            </h1>

            <p className="text-gray-300">
              Please wait while we process your payment...
            </p>

          </>

        ) : (

          <>

            <motion.div

              initial={{
                scale: 0,
              }}

              animate={{
                scale: 1,
              }}

              className="text-7xl mb-5"
            >
              ✅
            </motion.div>

            <h1 className="text-3xl font-bold text-green-400 mb-3">
              Payment Successful
            </h1>

            <p className="text-gray-300">
              Fuel booking confirmed successfully.
            </p>

          </>

        )}

      </motion.div>

    </div>
  );
}