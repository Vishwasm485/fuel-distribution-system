"use client";

import {

  motion,

  AnimatePresence

} from "framer-motion";

import "./payment-modal.css";

type Props = {

  open: boolean;

  success: boolean;
};

export default function PaymentModal({

  open,

  success,

}: Props) {

  return (

    <AnimatePresence>

      {

        open

        &&

        <div className="payment-overlay">

          <motion.div

            initial={{

              scale: 0.7,

              opacity: 0,

              y: 40,
            }}

            animate={{

              scale: 1,

              opacity: 1,

              y: 0,
            }}

            exit={{

              scale: 0.8,

              opacity: 0,
            }}

            transition={{

              duration: 0.35,
            }}

            className="payment-modal"
          >

            {

              !success

              ?

              <>

                <div className="processing-wrapper">

                  <div className="payment-spinner"></div>

                  <div className="pulse-ring"></div>

                </div>

                <h1 className="processing-title">

                  Processing Payment

                </h1>

                <p className="processing-text">

                  Securely verifying your transaction.
                  Please wait a moment...

                </p>

                <div className="processing-bar">

                  <motion.div

                    initial={{
                      width: 0
                    }}

                    animate={{
                      width: "100%"
                    }}

                    transition={{
                      duration: 2.8
                    }}

                    className="processing-fill"
                  />

                </div>

              </>

              :

              <>

                <motion.div

                  initial={{

                    scale: 0,

                    rotate: -180,
                  }}

                  animate={{

                    scale: 1,

                    rotate: 0,
                  }}

                  transition={{

                    type: "spring",

                    stiffness: 180,

                    damping: 12,
                  }}

                  className="success-icon"
                >

                  ✓

                </motion.div>

                <h1 className="success-title">

                  Payment Successful

                </h1>

                <p className="success-text">

                  Fuel booking confirmed successfully.
                  Distributor has been notified.

                </p>

                <div className="success-box">

                  Transaction Completed

                </div>

              </>

            }

          </motion.div>

        </div>

      }

    </AnimatePresence>
  );
}