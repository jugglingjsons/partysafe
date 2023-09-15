import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NqavvKp3y1ns7Qo7ayLtRbuWs6LJ34SQK26ULHbxM9paCgAqIhsQ58OVWSSINs27lWxSAzO2Yw9Dt1KGF4DKogZ00fwbqsSmf",
  {
    apiVersion: "2020-08-27", // Specify your desired API version
  }
);

export { stripe };
