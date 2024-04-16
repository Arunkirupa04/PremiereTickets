import React from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import BookingSummary from "./bookingSummary";
import { useNavigate } from "react-router-dom";

const StyledCardInput = styled(
  ({ component: Component, options, ...props }) => {
    return (
      <TextField
        {...props}
        InputProps={{
          ...props.InputProps,
          inputComponent: React.forwardRef((inputProps, ref) => (
            <Component onReady={ref} options={options} {...inputProps} />
          )),
        }}
      />
    );
  }
)({
  "& .MuiInputBase-input": {
    fontSize: "16px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSmoothing: "antialiased",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  ".StripeElement--invalid": {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
});

const useCardElementOptions = () => ({
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Roboto", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
});

const PaymentForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const options = useCardElementOptions();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.log("Stripe or Elements not loaded");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      console.log("CardNumberElement not available");
      return;
    }

    try {
      const paymentMethodResult = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: "John Doe",
        },
      });

      if (paymentMethodResult.error) {
        console.log(paymentMethodResult.error.message);
        alert(paymentMethodResult.error.message); // Display an alert or use a snackbar for better UX
      } else {
        const { error, token } = await stripe.createToken(cardNumberElement);

        if (error) {
          console.log("Token creation error:", error.message);
          alert(error.message); // Display an alert or use a snackbar for better UX
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/booking/payment",
            {
              token: token.id,
              amount: 2000,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const paymentResponse = response.data;
          console.log(paymentResponse);

          if (paymentResponse.success) {
            navigate("/success");
          } else {
            alert("Payment failed: " + paymentResponse.message); // Display an alert or use a snackbar for better UX
          }
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during the payment process."); // Display an alert or use a snackbar for better UX
    }
  };

  return (
    <Grid container sx={{ paddingY: "15px" }}>
      <Grid item md={8}>
        <Box
          sx={{ maxWidth: 400, m: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}
        >
          <Typography variant="h6" gutterBottom>
            Enter Payment Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledCardInput
                  label="Card Number"
                  variant="outlined"
                  fullWidth
                  component={CardNumberElement}
                  InputProps={{ inputProps: { options: options } }}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledCardInput
                  label="Expiration Date"
                  variant="outlined"
                  fullWidth
                  component={CardExpiryElement}
                  InputProps={{ inputProps: { options: options } }}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledCardInput
                  label="CVC"
                  variant="outlined"
                  fullWidth
                  component={CardCvcElement}
                  InputProps={{ inputProps: { options: options } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="ZIP Code" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!stripe}
                >
                  Pay Now
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
      <Grid item md={4}>
        <BookingSummary />
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PaymentForm;
