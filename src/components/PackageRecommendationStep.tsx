import React, { useMemo, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tag, Percent, Star, CheckCircle } from "lucide-react";
import { BookingData } from "../App";
import axios from "axios";

interface PackageRecommendationStepProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

interface Package {
  id: string;
  name: string;
  description: string;
  budgetRange: string[];
  basePrice: number;
  albumPrice: number;
  photographerPrice: number;
  cinematographerPrice: number;
  highlightVideoPrice: number;
  fullVideoPrice: number;
  reelPrice: number;
  extraHourlyRate: number;
  recommended?: boolean;
}

const localPackages: Package[] = [
  {
    id: "neon",
    name: "Neon",
    description: "Essential coverage for intimate events",
    budgetRange: ["Up to ₹50k"],
    basePrice: 25000,
    albumPrice: 10000,
    photographerPrice: 8000,
    cinematographerPrice: 8000,
    highlightVideoPrice: 5000,
    fullVideoPrice: 5000,
    reelPrice: 1000,
    extraHourlyRate: 1000,
  },
  {
    id: "basic",
    name: "Basic Elegance",
    description: "Perfect starter package for small celebrations",
    budgetRange: ["Up to ₹50k", "50–80k"],
    basePrice: 35000,
    albumPrice: 12000,
    photographerPrice: 10000,
    cinematographerPrice: 10000,
    highlightVideoPrice: 8000,
    fullVideoPrice: 7000,
    reelPrice: 2000,
    extraHourlyRate: 1200,
  },
  // ... (keep your remaining local packages unchanged)
];

// Hidden backend coupon logic
const couponCodes = {
  WEDDING10: 10,
  SAVE15: 15,
  NEWCLIENT: 20,
  FESTIVE25: 25,
  EARLYBIRD: 12,
};

interface PackageAPIResponse {
  id: number;
  name: string;
  description: string;
  budget_range: string | string[];
  base_price: string;
  album_price: string;
  photographer_price: string;
  cinematographer_price: string;
  extra_hour_price: string;
}

export function PackageRecommendationStep({
  bookingData,
  updateBookingData,
}: PackageRecommendationStepProps) {
  const [availablePackages, setAvailablePackages] =
    useState<Package[]>(localPackages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState(bookingData.couponCode || "");
  const [couponError, setCouponError] = useState("");

  // ✅ Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get<PackageAPIResponse[]>(
          "http://127.0.0.1:8000/api/packages/"
        );
        const transformed: Package[] = res.data.map((pkg) => ({
          id: pkg.id.toString(),
          name: pkg.name,
          description: pkg.description,
          budgetRange: Array.isArray(pkg.budget_range)
            ? pkg.budget_range
            : [pkg.budget_range],
          basePrice: parseFloat(pkg.base_price),
          albumPrice: parseFloat(pkg.album_price),
          photographerPrice: parseFloat(pkg.photographer_price),
          cinematographerPrice: parseFloat(pkg.cinematographer_price),
          highlightVideoPrice: 0,
          fullVideoPrice: 0,
          reelPrice: 0,
          extraHourlyRate: parseFloat(pkg.extra_hour_price),
        }));
        setAvailablePackages(transformed);
        setError(null);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Could not load packages from server. Using local data.");
        setAvailablePackages(localPackages);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const packages = availablePackages; // use backend or fallback data

  const recommendedPackageId = useMemo((): string => {
    const budget = bookingData.budgetRange;
    const bookingType = bookingData.bookingType;

    const matchingPackages = packages.filter((pkg) =>
      pkg.budgetRange.includes(budget)
    );

    if (matchingPackages.length === 0) return "basic";
    if (bookingType === "other") return "basic";
    if (bookingType === "bride" || bookingType === "groom") {
      return matchingPackages[0]?.id || "basic";
    }
    if (bookingType === "combined") {
      return matchingPackages[matchingPackages.length - 1]?.id || "classic";
    }
    return matchingPackages[0]?.id || "basic";
  }, [bookingData.budgetRange, bookingData.bookingType, packages]);

  const calculatePackagePrice = useMemo(() => {
    return (pkg: Package): number => {
      let total = pkg.basePrice;
      const basePages = bookingData.bookingType === "other" ? 50 : 60;
      const extraPages = Math.max(0, bookingData.albumPages - basePages);
      const extraPagesMultiple = Math.ceil(extraPages / 10) * 10;
      const extraPagesCost = (extraPagesMultiple / 10) * 500;

      total += pkg.albumPrice;
      if (bookingData.albumType === "two") total += pkg.albumPrice;
      total += extraPagesCost;

      const extraPhotographers = Math.max(0, bookingData.photographers - 1);
      const extraCinematographers = Math.max(
        0,
        bookingData.cinematographers - 1
      );
      total += extraPhotographers * pkg.photographerPrice;
      total += extraCinematographers * pkg.cinematographerPrice;

      if (bookingData.complimentaryFunctions?.length > 0) {
        const additionalFunctions =
          bookingData.complimentaryFunctions.length - 1;
        if (additionalFunctions > 0) total += additionalFunctions * 1800 * 8;
      }

      if (bookingData.complimentaryCinematographer) total += 18000;

      total += bookingData.mainFunctions.reduce((sum, func) => {
        const extraPhotographers = Math.max(0, func.photographers - 2);
        const extraCinematographers = Math.max(0, func.cinematographers - 2);
        const extraHoursCost = func.extraHours * pkg.extraHourlyRate;
        return (
          sum +
          extraPhotographers * pkg.photographerPrice +
          extraCinematographers * pkg.cinematographerPrice +
          extraHoursCost
        );
      }, 0);

      total += bookingData.additionalFunctions.reduce((sum, func) => {
        const extraPhotographers = Math.max(0, func.photographers - 1);
        const extraCinematographers = Math.max(0, func.cinematographers - 1);
        const extraHoursCost = func.extraHours * pkg.extraHourlyRate;
        return (
          sum +
          extraPhotographers * pkg.photographerPrice +
          extraCinematographers * pkg.cinematographerPrice +
          extraHoursCost
        );
      }, 0);

      if (bookingData.addOns.highlightShortMovie)
        total += pkg.highlightVideoPrice;
      if (bookingData.addOns.fullDocumentaryFilm) total += pkg.fullVideoPrice;
      if (bookingData.addOns.reel) total += pkg.reelPrice;

      return total;
    };
  }, [bookingData]);

  const calculateFinalPrice = (basePrice: number) => {
    if (
      bookingData.couponCode &&
      couponCodes[bookingData.couponCode as keyof typeof couponCodes]
    ) {
      const discountPercentage =
        couponCodes[bookingData.couponCode as keyof typeof couponCodes];
      const discount = Math.round(basePrice * (discountPercentage / 100));
      return { finalPrice: basePrice - discount, discount };
    }
    return { finalPrice: basePrice, discount: 0 };
  };

  const applyCoupon = () => {
    const upperCoupon = couponInput.toUpperCase();
    if (couponCodes[upperCoupon as keyof typeof couponCodes]) {
      const discountPercentage =
        couponCodes[upperCoupon as keyof typeof couponCodes];
      updateBookingData({
        couponCode: upperCoupon,
        couponDiscount: discountPercentage,
      });
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    updateBookingData({ couponCode: "", couponDiscount: 0 });
    setCouponInput("");
    setCouponError("");
  };

  useEffect(() => {
    if (!bookingData.selectedPackage) {
      updateBookingData({ selectedPackage: recommendedPackageId });
    }
  }, [bookingData.selectedPackage, recommendedPackageId, updateBookingData]);

  useEffect(() => {
    const selectedPkg = packages.find(
      (p) => p.id === (bookingData.selectedPackage || recommendedPackageId)
    );
    if (selectedPkg) {
      const basePrice = calculatePackagePrice(selectedPkg);
      const { finalPrice } = calculateFinalPrice(basePrice);
      if (bookingData.totalPrice !== finalPrice) {
        updateBookingData({ totalPrice: finalPrice });
      }
    }
  }, [bookingData, recommendedPackageId, calculatePackagePrice]);

  const selectPackage = (packageId: string) => {
    const selectedPkg = packages.find((p) => p.id === packageId);
  
    if (selectedPkg) {
      const basePrice = calculatePackagePrice(selectedPkg);
      const { finalPrice } = calculateFinalPrice(basePrice);
  
      // Update both ID and name + total price
      updateBookingData({
        selectedPackage: packageId,             // For saving (ID)
        selectedPackageName: selectedPkg.name,  // For display
        totalPrice: finalPrice,                 // For price
      });
    } else {
      // Fallback in case something goes wrong
      updateBookingData({ selectedPackage: packageId });
    }
  };
  

  if (loading)
    return (
      <div className="text-center py-8 text-gray-500">Loading packages...</div>
    );

  return (
    <div className="space-y-8">
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="text-center">
        <h3 className="text-black-elegant">Recommended Packages</h3>
        <p className="text-black-elegant/70">
          Based on your budget range: {bookingData.budgetRange} and booking
          type: {bookingData.bookingType}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isRecommended = pkg.id === recommendedPackageId;
          const isSelected = bookingData.selectedPackage === pkg.id;
          const matchesBudget = pkg.budgetRange.includes(
            bookingData.budgetRange
          );
          const basePrice = calculatePackagePrice(pkg);
          const { finalPrice, discount } = calculateFinalPrice(basePrice);

          return (
            <Card
              key={pkg.id}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-elegant-lg group border-gray-200 ${
                isSelected
                  ? "ring-2 ring-black-elegant shadow-elegant-lg scale-105 bg-pastel-green/20"
                  : matchesBudget
                  ? "border-gray-300 hover:border-black-elegant hover:scale-102 bg-white"
                  : "opacity-75 hover:opacity-90 bg-gray-50"
              } ${isRecommended ? "border-peach-medium" : ""}`}
              onClick={() => selectPackage(pkg.id)}
            >
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-peach-medium to-peach-light text-black-elegant shadow-elegant flex items-center gap-1 px-3 py-1">
                    <Star className="w-3 h-3 fill-current" />
                    Recommended
                  </Badge>
                </div>
              )}

              {isSelected && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="w-6 h-6 bg-black-elegant rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-black-elegant mb-2">
                  {pkg.name}
                </CardTitle>
                <p className="text-sm text-black-elegant/70 mb-4">
                  {pkg.description}
                </p>
                <div className="space-y-1">
                  {discount > 0 && (
                    <div className="text-lg text-black-elegant/60 line-through">
                      ₹{basePrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-2xl text-black-elegant mb-2">
                    ₹{finalPrice.toLocaleString()}
                  </div>
                  {discount > 0 && (
                    <Badge className="bg-red-100 text-red-700 text-xs">
                      Save ₹{discount.toLocaleString()}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {matchesBudget && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-pastel-green text-black-elegant"
                      >
                        Within Budget
                      </Badge>
                    )}
                    {pkg.budgetRange.map((range) => (
                      <Badge
                        key={range}
                        variant="outline"
                        className="text-xs border-gray-300"
                      >
                        {range}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-center text-sm text-black-elegant/70">
                    Includes: Photography • Videography • Album • Professional
                    Editing
                  </div>

                  {(Object.values(bookingData.addOns).some(Boolean) ||
                    bookingData.photographers > 1 ||
                    bookingData.cinematographers > 1 ||
                    (bookingData.complimentaryFunctions &&
                      bookingData.complimentaryFunctions.length > 0) ||
                    bookingData.additionalFunctions.some(
                      (f) => f.extraHours > 0
                    ) ||
                    bookingData.mainFunctions.some(
                      (f) => f.extraHours > 0
                    )) && (
                    <div className="text-center">
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-300"
                      >
                        + Custom Add-ons Included
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Coupon Code Section */}
      <Card className="bg-gradient-to-br from-peach-light to-pastel-cream border-gray-200 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black-elegant">
            <Tag className="w-5 h-5" />
            Coupon Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!bookingData.couponCode ? (
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Enter coupon code"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    setCouponError("");
                  }}
                  className="border-gray-300 bg-white"
                />
                {couponError && (
                  <p className="text-sm text-red-600 mt-1">{couponError}</p>
                )}
              </div>
              <Button
                onClick={applyCoupon}
                disabled={!couponInput.trim()}
                className="bg-black-elegant hover:bg-gray-800"
              >
                Apply
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-pastel-green/30 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-black-elegant" />
                <span className="text-black-elegant">
                  Coupon "{bookingData.couponCode}" applied -{" "}
                  {bookingData.couponDiscount}% off
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={removeCoupon}
                className="border-gray-300 hover:bg-red-50 hover:border-red-300"
              >
                Remove
              </Button>
            </div>
          )}

          <div className="text-sm text-black-elegant/70">
            <p>
              Enter your coupon code if you have one to get a discount on your
              booking.
            </p>
          </div>
        </CardContent>
      </Card>

      {bookingData.selectedPackage && (
        <Card className="bg-gradient-to-br from-pastel-green to-gray-elegant border-gray-200 shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-black-elegant">
                  {
                    packages.find((p) => p.id === bookingData.selectedPackage)
                      ?.name
                  }{" "}
                  Package Selected
                </h3>
                <div className="mt-2">
                  <span className="text-2xl text-black-elegant">
                    ₹{bookingData.totalPrice.toLocaleString()}
                  </span>
                  <p className="text-sm text-black-elegant/70 mt-1">
                    Final Total Amount
                  </p>
                  {bookingData.couponCode && (
                    <p className="text-sm text-green-700 mt-1">
                      Coupon discount applied: {bookingData.couponDiscount}% off
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-black-elegant">
                    {bookingData.photographers}
                  </div>
                  <div className="text-black-elegant/70">Photographers</div>
                </div>
                <div className="text-center">
                  <div className="text-black-elegant">
                    {bookingData.cinematographers}
                  </div>
                  <div className="text-black-elegant/70">Cinematographers</div>
                </div>
                <div className="text-center">
                  <div className="text-black-elegant">
                    {bookingData.albumPages}
                  </div>
                  <div className="text-black-elegant/70">Album Pages</div>
                </div>
              </div>

              <p className="text-sm text-black-elegant/70">
                You can go back to edit any previous choices before proceeding
                to confirmation.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
