import { useState, useCallback } from "react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";
import { ArrowLeft, ArrowRight, Settings } from "lucide-react";
import { ClientBasicsStep } from "./components/ClientBasicsStep";
import { ScheduleCrewStep } from "./components/ScheduleCrewStep";
import { AlbumsAddOnsStep } from "./components/AlbumsAddOnsStep";
import { PackageRecommendationStep } from "./components/PackageRecommendationStep";
import { ReviewConfirmStep } from "./components/ReviewConfirmStep";
import { AdminDashboard } from "./components/AdminDashboard";
import './App.css';
 
export interface BookingData {
  // Client Info
  clientName: string;
  phone: string;
  whatsapp: string;
  email: string;
  homeAddress: string;
  currentLocation: string;

  // Event Summary
  bookingType: "bride" | "groom" | "combined" | "other";
  eventLocation: string;
  eventDate: string;
  guestRange: string;
  budgetRange: string;

  // Main Functions
  mainFunctions: Array<{
    type:
      | "engagement"
      | "wedding"
      | "weddingAndEngagement"
      | "reception"
      | "nikah"
      | "birthday"
      | "anniversary"
      | "baptism"
      | "newbornPhotography"
      | "noolukettu";
    date: string;
    startTime: string;
    endTime: string;
    extraHours: number;
    photographers: number;
    cinematographers: number;
  }>;

  // Additional Functions
  additionalFunctions: Array<{
    type:
      | "haldi"
      | "mehandi"
      | "sangeet"
      | "gulabi"
      | "bridalShower"
      | "previousDay"
      | "reception"
      | "nikah";
    date: string;
    startTime: string;
    endTime: string;
    extraHours: number;
    photographers: number;
    cinematographers: number;
  }>;

  // Crew (Default based on function type)
  photographers: number;
  cinematographers: number;

  // Albums & Add-ons
  albumPages: number;
  albumType: "one" | "two";
  complimentarySelection:
    | "miniPhotobook"
    | "calendarCombo"
    | "photoFrames"
    | "";
  complimentaryFunctions: Array<
    "saveTheDate" | "temple" | "postWedding" | "bridalShower"
  >;
  complimentaryCinematographer: boolean;
  addOns: {
    highlightShortMovie: boolean;
    fullDocumentaryFilm: boolean;
    reel: boolean;
  };

  // Package & Pricing
  selectedPackage: string;
  totalPrice: number;
  couponCode: string;
  couponDiscount: number;

  // Payment
  advance: number;
  balanceDate: string;
}

const steps = [
  {
    title: "Client & Event Basics",
    component: ClientBasicsStep,
  },
  { title: "Event Summary", component: ScheduleCrewStep },
  { title: "Albums & Add-Ons", component: AlbumsAddOnsStep },
  {
    title: "Package & Price",
    component: PackageRecommendationStep,
  },
  { title: "Review & Confirm", component: ReviewConfirmStep },
];

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    clientName: "",
    phone: "",
    whatsapp: "",
    email: "",
    homeAddress: "",
    currentLocation: "",
    bookingType: "bride",
    eventLocation: "",
    eventDate: "",
    guestRange: "300–500",
    budgetRange: "Up to ₹50k",
    mainFunctions: [],
    additionalFunctions: [],
    photographers: 1,
    cinematographers: 1,
    albumPages: 60,
    albumType: "one",
    complimentarySelection: "",
    complimentaryFunctions: [],
    complimentaryCinematographer: false,
    addOns: {
      highlightShortMovie: false,
      fullDocumentaryFilm: false,
      reel: false,
    },
    selectedPackage: "",
    totalPrice: 0,
    couponCode: "",
    couponDiscount: 0,
    advance: 0,
    balanceDate: "",
  });

  const updateBookingData = useCallback(
    (updates: Partial<BookingData>) => {
      setBookingData((prev) => ({ ...prev, ...updates }));
    },
    [],
  );

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  if (isAdminMode) {
    return (
      <AdminDashboard
        onBackToBooking={() => setIsAdminMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <div>
                <h1 className="mb-2 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                  Professional Event Booking System
                </h1>
                <p className="text-gray-600">
                  Photography & Videography Services
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdminMode(true)}
                className="flex items-center gap-2 border-gray-300 hover:bg-gray-100"
              >
                <Settings className="w-4 h-4" />
                Admin
              </Button>
              
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress
              value={progress}
              className="h-3 bg-gray-200 border border-gray-300 shadow-sm"
            />
          </div>

          <div className="text-center">
            <h2 className="text-black">
              {steps[currentStep].title}
            </h2>
          </div>
        </div>

        <Card className="shadow-xl border border-gray-300 mb-8 bg-white rounded-xl">
          <div className="p-8">
            <CurrentStepComponent
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 h-12 px-6 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-gradient-to-r from-black to-gray-800 shadow-sm"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex text-white items-center gap-2 h-12 px-6 bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black hover:shadow-2xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1
              ? "Complete"
              : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}