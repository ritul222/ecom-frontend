import { Alert, AlertTitle, Skeleton } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!clientSecret) {
  //   const sendData = {
  //     amount: Number(totalPrice) * 100,
  //     currency: "usd",
  //     email: user.email,
  //     name: `${user.username}`,
  //     address: selectedUserCheckoutAddress,
  //     description: `Order for ${user.email}`,
  //     metadata: {
  //       test: "1"
  //     }
  //   };
  //     dispatch(createStripePaymentSecret(sendData));
  //   }
  // }, [clientSecret]);

//   useEffect(() => {
//   if (!clientSecret && selectedUserCheckoutAddress) {
//     const sendData = {
//       amount: Number(totalPrice) * 100,
//       currency: "usd",
//       email: user.email,
//       name: `${user.username}`,
//       address: selectedUserCheckoutAddress,
//       description: `Order for ${user.email}`,
//       metadata: {
//         test: "1"
//       } 
//     };
//     dispatch(createStripePaymentSecret(sendData));
//   }
// }, [clientSecret, selectedUserCheckoutAddress]);



useEffect(() => {
  if (!clientSecret && selectedUserCheckoutAddress && user) {
    const addr = selectedUserCheckoutAddress;

//     const sendData = {
//       amount: Number(totalPrice) * 100,
//       currency: "usd",
//       email: user?.email ?? "no-email@invalid.com",
//       name: user?.username ?? "Unknown",
//       description: `Order for ${user?.email ?? "guest"}`,
//       address: {
//         // line1: addr.street,
//         // line2: addr.buildingName,
//         // city: addr.city,
//         // state: addr.state,
//         // country: addr.country,
//         // postal_code: addr.pincode
//         street: addr.street,
//         buildingName: addr.buildingName,
//         city: addr.city,
//         state: addr.state,
//         country: addr.country,
//         pincode: addr.pincode
//       },
//       metadata: { test: "1" }
//     };


const sendData = {
  amount: Number(totalPrice) * 100,
  currency: "usd",
  email: user?.email,
  name: user?.username,
  description: `Order for ${user?.email}`,
  address: {
    street: selectedUserCheckoutAddress.street,
    buildingName: selectedUserCheckoutAddress.buildingName,
    city: selectedUserCheckoutAddress.city,
    state: selectedUserCheckoutAddress.state,
    country: selectedUserCheckoutAddress.country,
    pincode: selectedUserCheckoutAddress.pincode
  },
  metadata: { test: "1" }
};

    dispatch(createStripePaymentSecret(sendData));
  }
}, [clientSecret, selectedUserCheckoutAddress, user]);







console.log("Selected Address → ", selectedUserCheckoutAddress);


  if (isLoading) {
    return (
      <div className='max-w-lg mx-auto'>
        <Skeleton />
      </div>
    )
  }


  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  )
}

export default StripePayment