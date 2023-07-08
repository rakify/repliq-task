import {
  Button,
  Stack,
  Typography,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  Modal,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Container,
  Avatar,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Box } from '@mui/system';
import { useUserContext } from '@/context/userContext';
import { toast } from 'react-toastify';

const steps = [
  {
    label: 'Add shipping & billing info',
  },
  {
    label: 'Confirm products you are about to order',
  },
  {
    label: 'Place order',
  },
];

const CheckoutComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 0)
      toast.success('Shipping & Billing Information Saved Successfully!');
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const { currentUser: user, cart } = useUserContext();
  const [inputs, setInputs] = useState({
    //Shipping Info
    sFullName: '',
    sGender: '',
    sPhoneNumber: '',
    sDivision: '',
    sDistrict: '',
    sUpazila: '',
    sStreet: '',
    //Billing Info
    bFullName: '',
    bGender: '',
    bPhoneNumber: '',
    bDivision: '',
    bDistrict: '',
    bUpazila: '',
    bStreet: '',
  });

  const handleChange = (e: ChangeEvent) => {};

  return (
    <Container maxWidth="xl">
      <Typography variant="h6">Checkout</Typography>
      {cart && cart.products.length === 0 && activeStep != 3 && (
        <Typography variant="h5">
          Theres noting to checkout in your cart!
        </Typography>
      )}
      {cart.products.length > 0 && (
        <Stepper
          nonLinear
          activeStep={activeStep}
          alternativeLabel
          sx={{ width: '90vw' }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {index === 0 && (
                  <Stack
                    direction="column"
                    sx={{
                      overflow: 'auto',
                      maxWidth: '100%',
                      maxHeight: '70vh',
                    }}
                  >
                    {/* Shipping */}
                    <Stack direction="column">
                      <Typography variant="h6" color="primary">
                        Shipping Info
                      </Typography>
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Full Name"
                        id="sfullName"
                        name="sFullName"
                        value={inputs.sFullName || ''}
                        variant="standard"
                        required
                        error={inputs.sFullName === ''}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Phone Number"
                        id="sPhoneNumber"
                        name="sPhoneNumber"
                        value={inputs.sPhoneNumber || ''}
                        variant="standard"
                        required
                        error={inputs.sPhoneNumber === ''}
                        helperText="Phone number must contain 11 characters"
                      />
                      <TextField
                        select
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        fullWidth
                        label="Gender"
                        id="sGender"
                        name="sGender"
                        value={inputs.sGender || 'male'}
                        variant="standard"
                        required
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Division"
                        id="sDivision"
                        name="sDivision"
                        value={inputs.sDivision || ''}
                        variant="standard"
                        required
                        error={inputs.sDivision === ''}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="District"
                        id="sDistrict"
                        name="sDistrict"
                        value={inputs.sDistrict || ''}
                        variant="standard"
                        required
                        error={inputs.sDistrict === ''}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Upazila"
                        id="sUpazila"
                        name="sUpazila"
                        value={inputs.sUpazila || ''}
                        variant="standard"
                        required
                        error={inputs.sUpazila === ''}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Street"
                        id="sStreet"
                        name="sStreet"
                        value={inputs.sStreet || ''}
                        variant="standard"
                        required
                        error={inputs.sStreet === ''}
                      />
                    </Stack>
                    {/* Billing */}
                    <Stack direction="column">
                      <Typography variant="h6" color="primary">
                        Billing Info
                      </Typography>
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Full Name"
                        id="bFullName"
                        name="bFullName"
                        value={inputs.bFullName || ''}
                        variant="standard"
                        error={inputs.bFullName === ''}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Phone Number"
                        id="bPhoneNumber"
                        name="bPhoneNumber"
                        value={inputs.bPhoneNumber || ''}
                        variant="standard"
                        error={inputs.bPhoneNumber === ''}
                        helperText="Phone number must contain 11 characters"
                      />
                      <TextField
                        select
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        fullWidth
                        label="Gender"
                        id="bGender"
                        name="bGender"
                        value={inputs.bGender || 'male'}
                        variant="standard"
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Division"
                        id="bDivision"
                        name="bDivision"
                        value={inputs.bDivision || ''}
                        variant="standard"
                        error={inputs.bDivision === ''}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="District"
                        id="bDistrict"
                        name="bDistrict"
                        value={inputs.bDistrict || ''}
                        variant="standard"
                        error={inputs.bDistrict === ''}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Upazila"
                        id="bUpazila"
                        name="bUpazila"
                        value={inputs.bUpazila || ''}
                        variant="standard"
                        error={inputs.bUpazila === ''}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Street"
                        id="bStreet"
                        name="bStreet"
                        value={inputs.bStreet || ''}
                        variant="standard"
                        error={inputs.bStreet === ''}
                      />
                    </Stack>
                  </Stack>
                )}
                {index === 1 && (
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    sx={{
                      overflow: 'auto',
                      maxWidth: '100%',
                      maxHeight: '70vh',
                    }}
                  >
                    {cart.products.map((product) => (
                      <Stack
                        key={product.productId}
                        direction="row"
                        alignItems="center"
                      >
                        <Avatar
                          src={product.img}
                          sx={{
                            height: 100,
                            width: 80,
                            borderRadius: 0,
                            transition: 'transform .5s',
                            '&:hover': { transform: 'scale(1.2)' },
                            margin: 5,
                          }}
                        />
                        <Stack>
                          <Typography variant="caption">
                            {product.title}
                          </Typography>
                          <Typography variant="caption">
                            Qty: {product.quantity}{' '}
                          </Typography>
                          <Typography variant="caption">
                            ৳ {product.price * product.quantity}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                )}
                {index === 2 && (
                  <Stack direction="column" justifyContent="space-evenly">
                    <Stack>
                      <Typography variant="h6">Order Summary</Typography>
                      <Typography>Subtotal: ৳ {cart.total}</Typography>

                      <Typography>Estimated Shipping: ৳ 50</Typography>

                      <Typography>Shipping Discount: ৳ -50</Typography>
                      <Typography>Total: ৳ {cart.total}</Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        Payment Method
                      </Typography>
                      <RadioGroup
                        row
                        aria-labelledby="demo-form-control-label-placement"
                        name="position"
                        defaultValue="c"
                      >
                        <FormControlLabel
                          value="c"
                          control={<Radio />}
                          label="Cash On Delivery"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                      <Typography>
                        Inside Dhaka delivery will take 24 hours only. Outside
                        Dhaka will take 7 days atmost.
                      </Typography>
                    </Stack>
                  </Stack>
                )}

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      className="mt-1 mr-2 bg-emerald-600"
                      onClick={handleNext}
                    >
                      {index === steps.length - 1
                        ? 'Place Order'
                        : index === 0
                        ? 'Save & Continue'
                        : index === 1
                        ? 'Confirm'
                        : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      )}
      {activeStep === steps.length && (
        <Typography sx={{ mt: 2, mb: 1 }}>
          Thanks for placing your order.
        </Typography>
      )}

      {/* Modal Open For Successful Order Placement Message */}
      <Modal open={Boolean(activeStep === 3)} onClose={() => setActiveStep(2)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full bg-green-500 border-2 border-black shadow-24 p-4">
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ color: 'black', fontWeight: 'bolder' }}
          >
            Order Placed Successfully
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your order has been placed. We will contact with you shortly to
            confirm and process the order. Alternatively you can always check
            the progress of your order from your profile. Thanks for shopping
            with us.
          </Typography>
        </div>
      </Modal>
    </Container>
  );
};
export default CheckoutComponent;
