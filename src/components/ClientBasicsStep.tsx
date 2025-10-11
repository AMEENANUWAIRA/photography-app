import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { User, Calendar } from "lucide-react";
import { BookingData } from "../App";

interface ClientBasicsStepProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

export function ClientBasicsStep({
  bookingData,
  updateBookingData,
}: ClientBasicsStepProps) {
  return (
    <div className="space-y-8">
      {/* Client Info */}
      <Card className="bg-gradient-to-br from-pastel-green to-gray-elegant border-gray-200 shadow-elegant">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-black-elegant">
            <User className="w-5 h-5" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-black-elegant">
                Full Name *
              </Label>
              <Input
                id="clientName"
                value={bookingData.clientName}
                onChange={(e) =>
                  updateBookingData({ clientName: e.target.value })
                }
                placeholder="Enter full name"
                required
                className="h-11 border-gray-300 focus:border-black-elegant bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-black-elegant">
                Phone *
              </Label>
              <Input
                id="phone"
                value={bookingData.phone}
                onChange={(e) => updateBookingData({ phone: e.target.value })}
                placeholder="Enter phone number"
                required
                className="h-11 border-gray-300 focus:border-black-elegant bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-black-elegant">
                WhatsApp
              </Label>
              <Input
                id="whatsapp"
                value={bookingData.whatsapp}
                onChange={(e) =>
                  updateBookingData({ whatsapp: e.target.value })
                }
                placeholder="WhatsApp number (optional)"
                className="h-11 border-gray-300 focus:border-black-elegant bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black-elegant">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) => updateBookingData({ email: e.target.value })}
                placeholder="Enter email address"
                required
                className="h-11 border-gray-300 focus:border-black-elegant bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="homeAddress" className="text-black-elegant">
                Home Address
              </Label>
              <Input
                id="homeAddress"
                value={bookingData.homeAddress}
                onChange={(e) =>
                  updateBookingData({ homeAddress: e.target.value })
                }
                placeholder="Enter home address"
                className="h-11 border-gray-300 focus:border-black-elegant bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentLocation" className="text-black-elegant">
                Current Location
              </Label>
              <Input
                id="currentLocation"
                value={bookingData.currentLocation}
                onChange={(e) =>
                  updateBookingData({ currentLocation: e.target.value })
                }
                placeholder="Enter current location"
                className="h-11 border-gray-300 focus:border-black-elegant bg-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Summary */}
      <Card className="bg-gradient-to-br from-peach-light to-pastel-cream border-gray-200 shadow-elegant">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-black-elegant">
            <Calendar className="w-5 h-5" />
            Event Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-black-elegant">Booking Type</Label>
            <Select
              value={bookingData.bookingType}
              onValueChange={(
                value: "bride" | "groom" | "combined" | "other"
              ) => updateBookingData({ bookingType: value })}
            >
              <SelectTrigger className="h-11 border-gray-300 focus:border-black-elegant bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bride">Bride Side</SelectItem>
                <SelectItem value="groom">Groom Side</SelectItem>
                <SelectItem value="combined">Combined</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="eventLocation" className="text-black-elegant">
                Event Location
              </Label>
              <Input
                id="eventLocation"
                value={bookingData.eventLocation}
                onChange={(e) =>
                  updateBookingData({ eventLocation: e.target.value })
                }
                placeholder="Enter event location"
                className="h-11 border-gray-300 focus:border-black-elegant bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDate" className="text-black-elegant">
                Event Date
              </Label>
              <Input
                id="eventDate"
                type="date"
                value={bookingData.eventDate}
                onChange={(e) =>
                  updateBookingData({ eventDate: e.target.value })
                }
                className="h-11 border-gray-300 focus:border-black-elegant bg-white"
              />
            </div>
          </div>

          <div className="p-4 bg-pastel-green/30 rounded-lg border border-gray-200">
            <p className="text-sm text-black-elegant/80">
              <strong>Note:</strong> Guest range and budget details will be
              configured in the next step for more accurate package
              recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
