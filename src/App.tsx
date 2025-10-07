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

import "./App.css";
import axios from "axios";

export interface BookingData {
  clientName: string;
  phone: string;
  whatsapp: string;
  email: string;
  homeAddress: string;
  currentLocation: string;
  bookingType: "bride" | "groom" | "combined" | "other";
  eventLocation: string;
  eventDate: string;
  guestRange: string;
  budgetRange: string;
  mainFunctions: Array<any>;
  additionalFunctions: Array<any>;
  photographers: number;
  cinematographers: number;
  albumPages: number;
  albumType: "one" | "two";
  complimentarySelection: string;
  complimentaryFunctions: Array<string>;
  complimentaryCinematographer: boolean;
  addOns: {
    highlightShortMovie: boolean;
    fullDocumentaryFilm: boolean;
    reel: boolean;
  };
  selectedPackage: string;
  totalPrice: number;
  couponCode: string;
  couponDiscount: number;
  advance: number;
  balanceDate: string;

  clientId?: number; // numeric PK for ForeignKey
  clientCode?: string; // CL003, for display
}

const steps = [
  { title: "Client & Event Basics", component: ClientBasicsStep },
  { title: "Event Summary", component: ScheduleCrewStep },
  { title: "Albums & Add-Ons", component: AlbumsAddOnsStep },
  { title: "Package & Price", component: PackageRecommendationStep },
  { title: "Review & Confirm", component: ReviewConfirmStep },
];

export default function App() {
  const [loading, setLoading] = useState(false);

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

  const updateBookingData = useCallback((updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  }, []);

  const saveClient = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/clients/", {
        name: bookingData.clientName,
        email: bookingData.email,
        phone: bookingData.phone,
        location: bookingData.currentLocation,
      });
  
      // Assuming backend returns both id (numeric) and client_id (string)
      const client = response.data as { id: number; client_id: string };
  
      updateBookingData({ 
        clientId: client.id,      // numeric PK for Booking
        clientCode: client.client_id // display string
      });
  
      alert("Client saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save client.");
      throw error; // stop moving to next step
    } finally {
      setLoading(false);
    }
  };
  

  const saveBooking = async () => {
    try {
      if (!bookingData.clientId) {
        alert("Client must be saved first!");
        return;
      }
  
      setLoading(true);
  
      const bookingPayload = {
        client: bookingData.clientId,   // numeric PK of client
        event_date: bookingData.eventDate,
        event_location: bookingData.eventLocation,
        guest_range: bookingData.guestRange,
        budget_range: bookingData.budgetRange,
        main_functions: bookingData.mainFunctions,
        additional_functions: bookingData.additionalFunctions,
        photographers: bookingData.photographers,
        cinematographers: bookingData.cinematographers,
        add_ons: bookingData.addOns,
        album_pages: bookingData.albumPages,
        album_type: bookingData.albumType,
        selected_package: bookingData.selectedPackage,
        total_amount: bookingData.totalPrice,
        coupon_code: bookingData.couponCode,
        coupon_discount: bookingData.couponDiscount,
        advance: bookingData.advance,
        balance_date: bookingData.balanceDate,
      };
      
  
      console.log("Booking payload:", bookingPayload);
  
      const response = await axios.post(
        "http://localhost:8000/api/bookings/",
        bookingPayload
      );
  
      alert("Booking saved successfully!");
      console.log("Booking saved:", response.data);
    } catch (error: any) {
      console.error("Booking save error:", error.response?.data || error);
      alert("Failed to save booking. Check console for details.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  if (isAdminMode) {
    return <AdminDashboard onBackToBooking={() => setIsAdminMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
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

          <h2 className="text-black text-center">{steps[currentStep].title}</h2>
        </div>

        {/* Step Card */}
        <Card className="shadow-xl border border-gray-300 mb-8 bg-white rounded-xl">
          <div className="p-8">
            <CurrentStepComponent
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 h-12 px-6 border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
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
            onClick={async () => {
              try {
                if (currentStep === 0) {
                  // Save client on Step 1
                  await saveClient();
                  nextStep(); // move next only if saveClient succeeds
                } else {
                  // For steps 3, 4, etc., just move next
                  nextStep();
                }
              } catch (error) {
                console.error("Save failed:", error);
                alert("Failed to save. Please check the form or try again.");
                // nextStep is NOT called if an error occurs
              }
            }}
            disabled={currentStep === steps.length - 1 || loading}
            className="flex text-white items-center gap-2 h-12 px-6 bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black hover:shadow-2xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
