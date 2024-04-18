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
import axios from "axios";
import BookingSummary from "./bookingSummary";
import { useNavigate } from "react-router-dom";
import TheatreBar from "./theatrebar";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

const StyledCardInput = styled(
  ({ component: Component, options, ...props }) => (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        inputComponent: React.forwardRef((inputProps, ref) => (
          <Component onReady={ref} options={options} {...inputProps} />
        )),
      }}
    />
  )
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

  const seats = useSelector((state) => state.seats);
  const show = useSelector((state) => state.show);
  const user = useSelector((state) => state.user);
  const theatre = useSelector((state) => state.theatre);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setMessage("Stripe or Elements not loaded");
      setOpen(true);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      setMessage("Card number element not available");
      setOpen(true);
      return;
    }

    try {
      const paymentMethodResult = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: user.email,
        },
      });

      if (paymentMethodResult.error) {
        setMessage(paymentMethodResult.error.message);
        setOpen(true);
      } else {
        const { error, token } = await stripe.createToken(cardNumberElement);
        if (error) {
          setMessage(error.message);
          setOpen(true);
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/booking/payment",
            {
              token: token.id,
              amount: 2000,
            }
          );
          const paymentResponse = response.data;
          if (paymentResponse.success) {
            try {
              const response = await axios.post(
                "http://localhost:5000/api/booking/",
                {
                  theatre: theatre.theatreId,
                  show: show.showId,
                  user: "66142d4d8754abcf35c65274",
                  seatNumbers: seats.selectedSeats,
                }
              );
              const bookingResponse = response.data;

              if (bookingResponse.success) {
                navigate("/success");
              } else {
                setMessage(
                  "Booking creation failed: " + bookingResponse.message
                );
                setOpen(true);
              }
            } catch (error) {
              setMessage("Booking creation error: " + error.message);
              setOpen(true);
            }
          } else {
            setMessage("Payment failed: " + paymentResponse.message);
            setOpen(true);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
      setMessage("Payment error: " + error.message);
      setOpen(true);
    }
  };

  return (
    <Box sx={{ bgcolor: grey[300], minHeight: "100vh", overflowX: "hidden" }}>
      <TheatreBar />{" "}
      <Grid container sx={{ padding: "15px" }}>
        <Grid item md={6}>
          <Box
            sx={{
              maxWidth: 400,
              m: "auto",
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "white",
            }}
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
    </Box>
  );
};

export default PaymentForm;
