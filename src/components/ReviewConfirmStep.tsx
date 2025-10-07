import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Users, Camera, Video, Clock, FileText, CreditCard } from 'lucide-react';
import { BookingData } from '../App';
import { PDFGenerator } from './PDFGenerator';

interface ReviewConfirmStepProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

export function ReviewConfirmStep({ bookingData, updateBookingData }: ReviewConfirmStepProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const advancePercentage = 30; // 30% advance
  const advance = Math.round(bookingData.totalPrice * (advancePercentage / 100));
  const balance = bookingData.totalPrice - advance;

  const handleSubmit = async () => {
    if (!termsAccepted || !signatureName) return;
    
    setIsSubmitting(true);
    
    // Simulate booking submission
    setTimeout(() => {
      const newBookingId = `BK${Date.now().toString().slice(-6)}`;
      setBookingId(newBookingId);
      updateBookingData({ advance });
      setIsSubmitting(false);
    }, 2000);
  };

  if (bookingId) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-pastel-green rounded-full flex items-center justify-center mx-auto shadow-elegant">
          <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div>
          <h3 className="text-black-elegant">Booking Confirmed!</h3>
          <p className="text-lg text-gray-medium">
            Booking ID: <span className="font-mono font-medium text-black-elegant">{bookingId}</span>
          </p>
        </div>
        
        <Card className="text-left bg-gradient-to-br from-pastel-green to-ivory border-gray-200 shadow-elegant">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4>What's Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                  <li>• Email confirmation sent to {bookingData.email}</li>
                  <li>• WhatsApp confirmation sent to {bookingData.whatsapp || bookingData.phone}</li>
                  <li>• Client dashboard link included in confirmation</li>
                  <li>• Our team will contact you within 24 hours</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4>Payment Details</h4>
                <div className="text-sm space-y-1 mt-2">
                  <div className="flex justify-between">
                    <span>Advance Required ({advancePercentage}%):</span>
                    <span className="font-medium">₹{advance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Balance Due:</span>
                    <span>₹{balance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Balance Due:</span>
                    <span>7 days before event</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <PDFGenerator bookingData={bookingData} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Information */}
        <Card className="bg-gradient-to-br from-pastel-green to-gray-elegant border-gray-200 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black-elegant">
              <Users className="w-5 h-5" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">{bookingData.clientName}</p>
              <p className="text-sm text-muted-foreground">{bookingData.email}</p>
            </div>
            <div className="text-sm">
              <p>Phone: {bookingData.phone}</p>
              {bookingData.whatsapp && <p>WhatsApp: {bookingData.whatsapp}</p>}
            </div>
            {bookingData.homeAddress && (
              <div className="text-sm">
                <p>Address: {bookingData.homeAddress}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="bg-gradient-to-br from-peach-light to-pastel-cream border-gray-200 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black-elegant">
              <Calendar className="w-5 h-5" />
              Event Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Badge variant="secondary">{bookingData.bookingType.charAt(0).toUpperCase() + bookingData.bookingType.slice(1)} Side</Badge>
            </div>
            {bookingData.eventDate && (
              <p className="flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" />
                {new Date(bookingData.eventDate).toLocaleDateString()}
              </p>
            )}
            <p className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {bookingData.eventLocation}
            </p>
            <div className="text-sm">
              <p>Guests: {bookingData.guestRange}</p>
              <p>Budget: {bookingData.budgetRange}</p>
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Crew */}
        <Card className="bg-gradient-to-br from-ivory to-pastel-cream border-gray-200 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black-elegant">
              <Clock className="w-5 h-5" />
              Schedule & Crew
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p>Event Date: {bookingData.eventDate ? new Date(bookingData.eventDate).toLocaleDateString() : 'Not specified'}</p>
            </div>
            
{/* Main Functions */}
            {bookingData.mainFunctions.length > 0 && (
              <div className="text-sm">
                <p className="font-medium">Main Functions:</p>
                {bookingData.mainFunctions.map((func, index) => (
                  <div key={index} className="ml-2 space-y-1">
                    <p>• {func.type.charAt(0).toUpperCase() + func.type.slice(1).replace(/([A-Z])/g, ' $1')}: {func.date ? new Date(func.date).toLocaleDateString() + ' - ' : ''}{func.startTime} - {func.endTime}</p>
                    <p className="text-xs text-muted-foreground ml-4">
                      Crew: {func.photographers} photographer(s) + {func.cinematographers} cinematographer(s)
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Additional Functions */}
            {bookingData.additionalFunctions.length > 0 && (
              <div className="text-sm">
                <p className="font-medium">Additional Functions:</p>
                {bookingData.additionalFunctions.map((func, index) => (
                  <div key={index} className="ml-2 space-y-1">
                    <p>• {func.type.charAt(0).toUpperCase() + func.type.slice(1).replace(/([A-Z])/g, ' $1')}: {func.date ? new Date(func.date).toLocaleDateString() + ' - ' : ''}{func.startTime} - {func.endTime}
                      {func.extraHours > 0 && ` (+${func.extraHours.toFixed(1)}h)`}
                    </p>
                    <p className="text-xs text-muted-foreground ml-4">
                      Crew: {func.photographers} photographer(s) + {func.cinematographers} cinematographer(s)
                    </p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="text-sm">
              <p className="font-medium">Main Event Crew:</p>
              <p className="flex items-center gap-1 ml-2">
                <Camera className="w-3 h-3" />
                {bookingData.photographers} Photographer(s)
              </p>
              <p className="flex items-center gap-1 ml-2">
                <Video className="w-3 h-3" />
                {bookingData.cinematographers} Cinematographer(s)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Albums & Add-ons */}
        <Card className="bg-gradient-to-br from-peach-medium to-pastel-cream border-gray-200 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black-elegant">
              <FileText className="w-5 h-5" />
              Albums & Add-ons
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
  <div className="text-sm">
    <p>Album: {bookingData.albumType === 'one' ? 'One Photo-Book' : 'Two Individual Photo-Books'}</p>
    <p>Pages: {bookingData.albumPages}</p>

    {(bookingData.complimentarySelection || (bookingData.complimentaryFunctions && bookingData.complimentaryFunctions.length > 0) || bookingData.complimentaryCinematographer) && (
      <div>
        <p className="font-medium">Complimentary Items:</p>

        {bookingData.complimentarySelection === 'miniPhotobook' && <p className="ml-2">• Mini Photo Book</p>}
        {bookingData.complimentarySelection === 'calendarCombo' && <p className="ml-2">• Table Top Calendar</p>}
        {bookingData.complimentarySelection === 'photoFrames' && <p className="ml-2">• Photo Frames</p>}

        {bookingData.complimentaryFunctions && bookingData.complimentaryFunctions.map((func: string, index: number) => {
          let funcName: string;
          switch (func) {
            case 'saveTheDate':
              funcName = 'Save the Date';
              break;
            case 'temple':
              funcName = 'Temple';
              break;
            case 'preWedding':
              funcName = 'Pre Wedding';
              break;
            case 'postWedding':
              funcName = 'Post Wedding';
              break;
            case 'madhuramVeppu':
              funcName = 'Madhuram Veppu';
              break;
            default:
              funcName = 'Bridal Shower';
          }
          return (
            <p key={func} className="ml-2">
              • {funcName} {index === 0 ? '(Complimentary)' : '(₹1,800/hour)'}
            </p>
          );
        })}

        {bookingData.complimentaryCinematographer && <p className="ml-2">• Extra Cinematographer (₹18,000)</p>}
      </div>
    )}
  </div>

  <div className="text-sm">
    <p className="font-medium">Video Add-ons:</p>
    {bookingData.addOns.highlightShortMovie && <p className="ml-2">• Highlight Short Movie</p>}
    {bookingData.addOns.fullDocumentaryFilm && <p className="ml-2">• Full Documentary Film</p>}
    {bookingData.addOns.reel && <p className="ml-2">• Social Media Reel</p>}
    {!Object.values(bookingData.addOns).some(Boolean) && (
      <p className="ml-2 text-muted-foreground">None selected</p>
    )}
  </div>
</CardContent>

        </Card>
      </div>

      {/* Package & Pricing */}
      <Card className="bg-gradient-to-br from-gray-elegant to-ivory border-gray-200 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black-elegant">
            <CreditCard className="w-5 h-5" />
            Package & Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-lg">{bookingData.selectedPackage ? bookingData.selectedPackage.charAt(0).toUpperCase() + bookingData.selectedPackage.slice(1) + ' Package' : 'No Package Selected'}</p>
              <p className="text-2xl font-medium text-black-elegant">₹{bookingData.totalPrice.toLocaleString()}</p>
            </div>
            
            <Separator />
            
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Advance Required ({advancePercentage}%):</span>
                <span className="font-medium">₹{advance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Balance Amount:</span>
                <span>₹{balance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Terms & Confirmation */}
      <Card className="bg-gradient-to-br from-pastel-cream to-ivory border-gray-200 shadow-elegant">
        <CardHeader>
          <CardTitle className="text-black-elegant">Payment Terms & Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm space-y-2">
            <h4>Payment Terms:</h4>
            <ul className="text-muted-foreground space-y-1 ml-4">
              <li>• {advancePercentage}% advance payment required to confirm booking</li>
              <li>• Balance amount due 7 days before event date</li>
              <li>• Payments accepted via bank transfer, UPI, or card</li>
              <li>• Cancellation policy: 50% refund if cancelled 30+ days before event</li>
            </ul>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="signature" className="text-black-elegant">Digital Signature (Full Name)</Label>
              <Input
                id="signature"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder="Type your full name as digital signature"
                required
                className="h-11 border-gray-300 focus:border-black-elegant bg-white"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked: boolean) => setTermsAccepted(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I accept the terms and conditions and confirm all details are accurate
              </Label>
            </div>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!termsAccepted || !signatureName || isSubmitting}
            className="w-full bg-gradient-to-r from-black-elegant to-gray-800 hover:from-gray-800 hover:to-black transition-all duration-200 shadow-lg hover:shadow-xl"
            size="lg"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Booking & Submit'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}