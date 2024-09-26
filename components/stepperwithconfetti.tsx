import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Progress } from "./ui/progress";
import Link from "next/link";

export default function StepperWithConfetti() {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 4;

  useEffect(() => {
    if (activeStep === totalSteps) {
      triggerConfetti();
    }
  }, [activeStep]);

  const handleNextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="relative w-full h-full">
      <div className="text-center bg-gray-200/70 p-6 rounded-lg">
        <h1 className="text-xl lg:text-3xl font-medium mb-4">
          Your AI-Driven Getaway
        </h1>

        <Progress
          value={(activeStep / totalSteps) * 100}
          className="mb-4 max-w-3xl mx-auto"
        />

        <div className="step-content text-center mb-4">
          {activeStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold italic mb-3">
                Describe your dream getaway, and we'll make it happen!
              </h3>
              <p className="max-w-3xl mx-auto">
                Tell us what you're craving for your weekend escape. Fancy a
                beach vibe, a mountain retreat, or a hidden gem in the city? Our
                AI is ready to listen!
              </p>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold italic mb-3">
                Customize Your Experience
              </h3>
              <p className="max-w-3xl mx-auto">
                Where do you want to go? Got a budget? Just let us know, and
                we'll find the destinations that match your preferences
                perfectly. From budget-friendly spots to luxurious stays, we've
                got you covered
              </p>
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold italic mb-3">
                Let Our AI Do the Magic
              </h3>
              <p className="max-w-3xl mx-auto">
                Sit back and relax while our AI scours the best destinations for
                your perfect getaway! Whether it's adventure, relaxation, or a
                bit of both, you'll get tailored suggestions in seconds.
              </p>
            </div>
          )}
          {activeStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold italic mb-3">
                Book, Pack, and Go!
              </h3>
              <p className="max-w-3xl mx-auto">
                Found your dream destination? Time to book! Secure your spot,
                pack your bags, and get ready for an unforgettable weekend. It's
                that easy!
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={handlePreviousStep} disabled={activeStep === 1}>
            Previous
          </Button>
          <Button onClick={handleNextStep}>
            {activeStep === totalSteps ? "All Done!" : "Next Step"}
          </Button>
        </div>

        <p className="mt-5">
          <Link href="/sign-up">Sign up</Link> and try a new experience.
          It&apos;s completely free!
        </p>
      </div>
    </div>
  );
}
