import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { MapPin, Calendar, Users, IndianRupee, Camera, Video, Plus, Minus, Heart, Crown, Gift, PartyPopper } from 'lucide-react';
import { BookingData } from '../App';

interface ScheduleCrewStepProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

const guestRanges = ['300–500', '500–1,000', '1,000–1,500', '1,500–2,000', '2,000+'];
const budgetRanges = ['Up to ₹50k', '50–80k', '80k–1L', '1–1.5L', '1.5–2L', '2–3L', '3L+'];

const mainFunctionTypes = [
  { id: 'engagement', label: 'Engagement', icon: '💍', category: 'wedding' },
  { id: 'wedding', label: 'Wedding', icon: '👰', category: 'wedding' },
  { id: 'weddingAndEngagement', label: 'Wedding and Engagement', icon: '💒', category: 'wedding' },
  { id: 'reception', label: 'Reception', icon: '🎉', category: 'wedding' },
  { id: 'nikah', label: 'Nikah', icon: '🕌', category: 'wedding' },
  { id: 'birthday', label: 'Birthday', icon: '🎂', category: 'other' },
  { id: 'anniversary', label: 'Anniversary', icon: '💝', category: 'other' },
  { id: 'baptism', label: 'Baptism', icon: '⛪', category: 'other' },
  { id: 'newbornPhotography', label: 'Newborn Photography', icon: '👶', category: 'other' },
  { id: 'noolukettu', label: 'Noolukettu', icon: '🎭', category: 'other' }
];

const additionalFunctionTypes = [
  { id: 'haldi', label: 'Haldi', icon: '💛' },
  { id: 'mehandi', label: 'Mehandi', icon: '🌿' },
  { id: 'sangeet', label: 'Sangeet', icon: '🎵' },
  { id: 'gulabi', label: 'Gulabi', icon: '🌸' },
  { id: 'bridalShower', label: 'Bridal Shower', icon: '🚿' },
  { id: 'previousDay', label: 'Previous Day', icon: '📅' },
  { id: 'reception', label: 'Reception', icon: '🥂' },
  { id: 'nikah', label: 'Nikah', icon: '🕌' }
];

export function ScheduleCrewStep({ bookingData, updateBookingData }: ScheduleCrewStepProps) {
  const updateCrewCount = (type: 'photographers' | 'cinematographers', increment: boolean) => {
    const currentCount = bookingData[type];
    const newCount = increment ? currentCount + 1 : Math.max(1, currentCount - 1);
    updateBookingData({ [type]: newCount });
  };

  const addMainFunction = (functionType: string) => {
    // Define function categories
    const isWeddingFunction = ['wedding', 'engagement', 'weddingAndEngagement', 'nikah', 'reception'].includes(functionType);
    const isReducedCrewFunction = ['birthday', 'anniversary', 'baptism', 'noolukettu'].includes(functionType);
    const isNewbornFunction = functionType === 'newbornPhotography';
    
    // Set default times and crew based on function type
    let defaultStartTime, defaultEndTime, defaultPhotographers, defaultCinematographers;
    
    if (isWeddingFunction) {
      // Wedding functions: 8 hours (7:30 AM - 3:30 PM), 2+2 crew
      defaultStartTime = '07:30';
      defaultEndTime = '15:30';
      defaultPhotographers = 2;
      defaultCinematographers = 2;
    } else if (isReducedCrewFunction) {
      // Birthday/Anniversary/Baptism/Noolukettu: 6 hours (9:30 AM - 3:30 PM), 1+1 crew
      defaultStartTime = '09:30';
      defaultEndTime = '15:30';
      defaultPhotographers = 1;
      defaultCinematographers = 1;
    } else if (isNewbornFunction) {
      // Newborn Photography: 1 photographer only, no time constraints
      defaultStartTime = '10:00';
      defaultEndTime = '18:00';
      defaultPhotographers = 1;
      defaultCinematographers = 0;
    } else {
      // Default fallback
      defaultStartTime = '10:00';
      defaultEndTime = '18:00';
      defaultPhotographers = 2;
      defaultCinematographers = 2;
    }
    
    const newFunction = {
      type: functionType as any,
      date: '',
      startTime: defaultStartTime,
      endTime: defaultEndTime,
      extraHours: 0,
      photographers: defaultPhotographers,
      cinematographers: defaultCinematographers
    };
    updateBookingData({ 
      mainFunctions: [...bookingData.mainFunctions, newFunction],
      photographers: defaultPhotographers,
      cinematographers: defaultCinematographers
    });
  };

  const removeMainFunction = (index: number) => {
    const newFunctions = bookingData.mainFunctions.filter((_, i) => i !== index);
    updateBookingData({ mainFunctions: newFunctions });
  };

  const updateMainFunction = (index: number, updates: any) => {
    const newFunctions = [...bookingData.mainFunctions];
    const currentFunc = newFunctions[index];
    
    // If start or end time is being updated, recalculate extra hours
    if (updates.startTime || updates.endTime) {
      const startTime = updates.startTime || currentFunc.startTime;
      const endTime = updates.endTime || currentFunc.endTime;
      const { extraHours } = calculateMainFunctionHours(startTime, endTime, currentFunc.type);
      updates.extraHours = extraHours;
    }
    
    newFunctions[index] = { ...currentFunc, ...updates };
    updateBookingData({ mainFunctions: newFunctions });
  };

  const addAdditionalFunction = (functionType: string) => {
    const newFunction = {
      type: functionType as any,
      date: '',
      startTime: '17:30', // Default to 5:30 PM
      endTime: '21:30', // Default to 9:30 PM (4 hours later)
      extraHours: 0, // No extra hours for minimum 4-hour booking
      photographers: 1, // Default for additional functions
      cinematographers: 1 // Default for additional functions
    };
    updateBookingData({ additionalFunctions: [...bookingData.additionalFunctions, newFunction] });
  };

  const removeAdditionalFunction = (index: number) => {
    const newFunctions = bookingData.additionalFunctions.filter((_, i) => i !== index);
    updateBookingData({ additionalFunctions: newFunctions });
  };

  const calculateHours = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return { totalHours: 3, extraHours: 0 };
    
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    
    // Handle overnight events
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    
    const diffMs = end.getTime() - start.getTime();
    const totalHours = Math.max(4, Math.round(diffMs / (1000 * 60 * 60))); // Minimum 4 hours
    const extraHours = Math.max(0, totalHours - 5); // Extra hours after complimentary 5 hours (4 standard + 1 complimentary)
    
    return { totalHours, extraHours };
  };

  const calculateMainFunctionHours = (startTime: string, endTime: string, functionType?: string) => {
    if (!startTime || !endTime) return { totalHours: 8, extraHours: 0 };
    
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    
    // Handle overnight events
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }
    
    const diffMs = end.getTime() - start.getTime();
    const actualHours = Math.round(diffMs / (1000 * 60 * 60));
    
    // Determine minimum hours and complimentary policy based on function type
    const isReducedCrewFunction = functionType && ['birthday', 'anniversary', 'baptism', 'noolukettu'].includes(functionType);
    const minimumHours = isReducedCrewFunction ? 6 : 8;
    const complimentaryHours = isReducedCrewFunction ? 7 : 9; // 6+1 for reduced crew functions, 8+1 for wedding functions
    
    const totalHours = Math.max(minimumHours, actualHours);
    const extraHours = Math.max(0, totalHours - complimentaryHours);
    
    return { totalHours, extraHours };
  };

  const updateAdditionalFunction = (index: number, updates: any) => {
    const newFunctions = [...bookingData.additionalFunctions];
    const currentFunc = newFunctions[index];
    
    // If start or end time is being updated, recalculate extra hours
    if (updates.startTime || updates.endTime) {
      const startTime = updates.startTime || currentFunc.startTime;
      const endTime = updates.endTime || currentFunc.endTime;
      const { extraHours } = calculateHours(startTime, endTime);
      updates.extraHours = extraHours;
    }
    
    newFunctions[index] = { ...currentFunc, ...updates };
    updateBookingData({ additionalFunctions: newFunctions });
  };

  // Auto-update crew defaults based on selected functions
  React.useEffect(() => {
    const hasMainFunctions = bookingData.mainFunctions.length > 0;
    const hasWeddingFunctions = bookingData.mainFunctions.some(func => 
      ['engagement', 'wedding', 'weddingAndEngagement', 'reception'].includes(func.type)
    );

    if (hasMainFunctions && bookingData.photographers === 1) {
      updateBookingData({ photographers: 2, cinematographers: 2 });
    }
  }, [bookingData.mainFunctions]);

  // Auto-calculate extra hours for additional functions on component load
  React.useEffect(() => {
    let hasChanges = false;
    const updatedFunctions = bookingData.additionalFunctions.map(func => {
      const { extraHours } = calculateHours(func.startTime, func.endTime);
      if (func.extraHours !== extraHours) {
        hasChanges = true;
        return { ...func, extraHours };
      }
      return func;
    });

    if (hasChanges) {
      updateBookingData({ additionalFunctions: updatedFunctions });
    }
  }, [bookingData.additionalFunctions.length]); // Only run when functions are added/removed

  return (
    <div className="space-y-8">
      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-300 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h3 className="text-black">Event Location</h3>
            </div>
            <Input
              placeholder="Enter event venue/location"
              value={bookingData.eventLocation}
              onChange={(e) => updateBookingData({ eventLocation: e.target.value })}
              className="border-gray-300 focus:border-black bg-white"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-300 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="text-black">Event Date</h3>
            </div>
            <Input
              type="date"
              value={bookingData.eventDate}
              onChange={(e) => updateBookingData({ eventDate: e.target.value })}
              className="border-gray-300 focus:border-black bg-white"
            />
          </CardContent>
        </Card>
      </div>

      {/* Guest Range & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-100 border-gray-300 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-gray-600" />
              <h3 className="text-black">Expected Guests</h3>
            </div>
            <Select value={bookingData.guestRange} onValueChange={(value) => updateBookingData({ guestRange: value })}>
              <SelectTrigger className="border-gray-300 focus:border-black bg-white">
                <SelectValue placeholder="Select guest range" />
              </SelectTrigger>
              <SelectContent>
                {guestRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-300 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee className="w-5 h-5 text-gray-600" />
              <h3 className="text-black">Budget Range</h3>
            </div>
            <Select value={bookingData.budgetRange} onValueChange={(value) => updateBookingData({ budgetRange: value })}>
              <SelectTrigger className="border-gray-300 focus:border-black bg-white">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>₹{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Main Functions */}
      <Card className="bg-gray-50 border-gray-300 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-black">
            <Crown className="w-5 h-5" />
            Main Functions
          </CardTitle>
          <p className="text-sm text-gray-600">
            Select primary event functions (Minimum 8 hours + 1 hour complimentary, Default: 2 Photographers + 2 Cinematographers)
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wedding Functions */}
          <div>
            <h4 className="text-black mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Wedding Functions
              <Badge variant="secondary" className="bg-gray-200 text-black">
                Classic Memories, Signature Luxury, Gold Moments, Premium Royal
              </Badge>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {mainFunctionTypes.filter(func => func.category === 'wedding').map((func) => (
                <Button
                  key={func.id}
                  variant="outline"
                  size="sm"
                  onClick={() => addMainFunction(func.id)}
                  disabled={bookingData.mainFunctions.some(f => f.type === func.id)}
                  className="h-16 flex flex-col items-center gap-1 border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                >
                  <span className="text-lg">{func.icon}</span>
                  <span className="text-xs text-center">{func.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator className="border-gray-400" />

          {/* Other Functions */}
          <div>
            <h4 className="text-black mb-3 flex items-center gap-2">
              <PartyPopper className="w-4 h-4" />
              Other Functions
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {mainFunctionTypes.filter(func => func.category === 'other').map((func) => (
                <Button
                  key={func.id}
                  variant="outline"
                  size="sm"
                  onClick={() => addMainFunction(func.id)}
                  disabled={bookingData.mainFunctions.some(f => f.type === func.id)}
                  className="h-16 flex flex-col items-center gap-1 border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                >
                  <span className="text-lg">{func.icon}</span>
                  <span className="text-xs text-center">{func.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Selected Main Functions */}
          {bookingData.mainFunctions.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-black-elegant">Selected Main Functions</h4>
              {bookingData.mainFunctions.map((func, index) => {
                const funcInfo = mainFunctionTypes.find(f => f.id === func.type);
                return (
                  <Card key={index} className="p-4 bg-white border border-gray-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{funcInfo?.icon}</span>
                        <span className="text-black">{funcInfo?.label}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeMainFunction(index)}
                        className="text-red-600 hover:bg-red-50 border-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      <div>
                        <Label className="text-sm text-gray-600">Date</Label>
                        <Input
                          type="date"
                          value={func.date}
                          onChange={(e) => updateMainFunction(index, { date: e.target.value })}
                          className="border-gray-300 bg-white"
                        />
                      </div>
                      {func.type !== 'newbornPhotography' && (
                        <>
                          <div>
                            <Label className="text-sm text-gray-600">Start Time</Label>
                            <Input
                              type="time"
                              value={func.startTime}
                              onChange={(e) => updateMainFunction(index, { startTime: e.target.value })}
                              className="border-gray-300 bg-white"
                            />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-600">End Time</Label>
                            <Input
                              type="time"
                              value={func.endTime}
                              onChange={(e) => updateMainFunction(index, { endTime: e.target.value })}
                              className="border-gray-300 bg-white"
                            />
                          </div>
                        </>
                      )}
                      {func.type === 'newbornPhotography' && (
                        <div className="col-span-2">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-blue-600 text-sm">📷</span>
                              <span className="text-blue-800 text-sm font-medium">Flexible Schedule</span>
                            </div>
                            <p className="text-blue-700 text-xs mt-1">No fixed time schedule required for newborn photography sessions</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Duration Info for Main Functions */}
                    {func.type !== 'newbornPhotography' && (() => {
                      const { totalHours, extraHours } = calculateMainFunctionHours(func.startTime, func.endTime, func.type);
                      const isReducedCrewFunction = ['birthday', 'anniversary', 'baptism', 'noolukettu'].includes(func.type);
                      const standardHours = isReducedCrewFunction ? 6 : 8;
                      const complimentaryTotal = isReducedCrewFunction ? 7 : 9;
                      
                      return (
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Duration:</span>
                            <span className="text-black font-medium">{totalHours} hours total</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-1">
                            <span className="text-gray-600">Standard ({standardHours} hrs):</span>
                            <span className="text-green-600">Included</span>
                          </div>
                          {totalHours > standardHours && totalHours <= complimentaryTotal && (
                            <div className="flex items-center justify-between text-sm mt-1">
                              <span className="text-gray-600">Complimentary (+{totalHours - standardHours} hr):</span>
                              <span className="text-blue-600">Free</span>
                            </div>
                          )}
                          {extraHours > 0 && (
                            <div className="flex items-center justify-between text-sm mt-1">
                              <span className="text-gray-600">Extra Hours:</span>
                              <span className="text-orange-600 font-medium">{extraHours} hours (additional charges apply)</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                    
                    {/* Individual Crew Selection for Main Functions */}
                    <div className="border-t border-gray-300 pt-4">
                      <h5 className="text-sm text-gray-600 mb-3">Crew for this function</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Camera className="w-4 h-4 text-gray-600" />
                            <Label className="text-sm text-black">Photographers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newCount = Math.max(1, func.photographers - 1);
                                updateMainFunction(index, { photographers: newCount });
                              }}
                              className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <div className="bg-white border border-gray-300 rounded px-3 py-1 text-center min-w-[40px]">
                              <span className="text-sm text-black">{func.photographers}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newCount = func.photographers + 1;
                                updateMainFunction(index, { photographers: newCount });
                              }}
                              className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {func.type !== 'newbornPhotography' && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Video className="w-4 h-4 text-gray-600" />
                              <Label className="text-sm text-black">Cinematographers</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newCount = Math.max(1, func.cinematographers - 1);
                                  updateMainFunction(index, { cinematographers: newCount });
                                }}
                                className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <div className="bg-white border border-gray-300 rounded px-3 py-1 text-center min-w-[40px]">
                                <span className="text-sm text-black">{func.cinematographers}</span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newCount = func.cinematographers + 1;
                                updateMainFunction(index, { cinematographers: newCount });
                              }}
                              className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        )}
                        
                        {func.type === 'newbornPhotography' && (
                          <div>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <span className="text-yellow-600 text-sm">👶</span>
                                <span className="text-yellow-800 text-sm font-medium">Photography Only</span>
                              </div>
                              <p className="text-yellow-700 text-xs mt-1">No cinematographer needed for newborn sessions</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Functions */}
      <Card className="bg-white border-gray-300 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-black">
            <Gift className="w-5 h-5" />
            Additional Functions
          </CardTitle>
          <p className="text-sm text-gray-600">
            Add pre-wedding ceremonies and additional events (Minimum 4 hours + 1 hour complimentary, Default: 1 Photographer + 1 Cinematographer)
          </p>
          <Badge variant="secondary" className="bg-gray-200 text-black w-fit">
            Neon, Basic, Classic packages available
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {additionalFunctionTypes.map((func) => (
              <Button
                key={func.id}
                variant="outline"
                size="sm"
                onClick={() => addAdditionalFunction(func.id)}
                className="h-16 flex flex-col items-center gap-1 border-gray-300 hover:bg-gray-100"
              >
                <span className="text-lg">{func.icon}</span>
                <span className="text-xs text-center">{func.label}</span>
              </Button>
            ))}
          </div>

          {/* Selected Additional Functions */}
          {bookingData.additionalFunctions.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-black-elegant">Selected Additional Functions</h4>
              {bookingData.additionalFunctions.map((func, index) => {
                const funcInfo = additionalFunctionTypes.find(f => f.id === func.type);
                return (
                  <Card key={index} className="p-4 bg-gray-50 border border-gray-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{funcInfo?.icon}</span>
                        <span className="text-black">{funcInfo?.label}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAdditionalFunction(index)}
                        className="text-red-600 hover:bg-red-50 border-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      <div>
                        <Label className="text-sm text-gray-600">Date</Label>
                        <Input
                          type="date"
                          value={func.date}
                          onChange={(e) => updateAdditionalFunction(index, { date: e.target.value })}
                          className="border-gray-300 bg-white"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Start Time</Label>
                        <Input
                          type="time"
                          value={func.startTime}
                          onChange={(e) => updateAdditionalFunction(index, { startTime: e.target.value })}
                          className="border-gray-300 bg-white"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">End Time</Label>
                        <Input
                          type="time"
                          value={func.endTime}
                          onChange={(e) => updateAdditionalFunction(index, { endTime: e.target.value })}
                          className="border-gray-300 bg-white"
                        />
                      </div>
                    </div>
                    
                    {/* Duration Info */}
                    {(() => {
                      const { totalHours, extraHours } = calculateHours(func.startTime, func.endTime);
                      return (
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Duration:</span>
                            <span className="text-black font-medium">{totalHours} hours total</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-1">
                            <span className="text-gray-600">Standard (4 hrs):</span>
                            <span className="text-green-600">Included</span>
                          </div>
                          {totalHours > 4 && totalHours <= 5 && (
                            <div className="flex items-center justify-between text-sm mt-1">
                              <span className="text-gray-600">Complimentary (+{totalHours - 4} hr):</span>
                              <span className="text-blue-600">Free</span>
                            </div>
                          )}
                          {extraHours > 0 && (
                            <div className="flex items-center justify-between text-sm mt-1">
                              <span className="text-gray-600">Extra Hours:</span>
                              <span className="text-orange-600 font-medium">{extraHours} hours (additional charges apply)</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                    
                    {/* Individual Crew Selection for Additional Functions */}
                    <div className="border-t border-gray-300 pt-4">
                      <h5 className="text-sm text-gray-600 mb-3">Crew for this function</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Camera className="w-4 h-4 text-gray-600" />
                            <Label className="text-sm text-black">Photographers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newCount = Math.max(1, func.photographers - 1);
                                updateAdditionalFunction(index, { photographers: newCount });
                              }}
                              className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <div className="bg-white border border-gray-300 rounded px-3 py-1 text-center min-w-[40px]">
                              <span className="text-sm text-black">{func.photographers}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newCount = func.photographers + 1;
                                updateAdditionalFunction(index, { photographers: newCount });
                              }}
                              className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Video className="w-4 h-4 text-gray-600" />
                            <Label className="text-sm text-black">Cinematographers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newCount = Math.max(1, func.cinematographers - 1);
                                updateAdditionalFunction(index, { cinematographers: newCount });
                              }}
                              className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <div className="bg-white border border-gray-300 rounded px-3 py-1 text-center min-w-[40px]">
                              <span className="text-sm text-black">{func.cinematographers}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newCount = func.cinematographers + 1;
                                updateAdditionalFunction(index, { cinematographers: newCount });
                              }}
                              className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>


    </div>
  );
}