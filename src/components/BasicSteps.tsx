import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex } from "@chakra-ui/react";

const content = (
  <Flex py={4}>
    Test
  </Flex>
);

const steps = [
  { label: 'Step 1', content },
  { label: 'Step 2', content },
  { label: 'Step 3', content },
];

export default function () {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Steps activeStep={activeStep}>
      {steps.map(({ label, content }) => (
        <Step label={label} key={label}>
          {content}
        </Step>
      ))}
    </Steps>
  );
};
