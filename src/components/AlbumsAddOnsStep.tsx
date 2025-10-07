import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { Plus, Minus, Camera, Calendar, Gift } from 'lucide-react';
import { BookingData } from '../App';

interface AlbumsAddOnsStepProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

export function AlbumsAddOnsStep({ bookingData, updateBookingData }: AlbumsAddOnsStepProps) {
  const basePages = bookingData.bookingType === 'other' ? 50 : 60;
  
  // Calculate pages based on functions
  const calculateRecommendedPages = () => {
    const mainFunctionsCount = bookingData.mainFunctions.length;
    const additionalFunctionsCount = bookingData.additionalFunctions.length;
    const complimentaryFunctionsCount = bookingData.complimentaryFunctions ? bookingData.complimentaryFunctions.length : 0;
    const totalFunctions = mainFunctionsCount + additionalFunctionsCount;
    
    // Special case: 1 main function + 2 additional functions = 80 pages total (including complimentary functions)
    if (mainFunctionsCount === 1 && additionalFunctionsCount === 2) {
      return 80; // 80 pages total including complimentary functions
    }
    
    // Regular calculation for other combinations
    const mainFunctionPages = mainFunctionsCount * 8; // 8 pages per main function
    const additionalFunctionPages = additionalFunctionsCount * 4; // 4 pages per additional function
    const complimentaryBonus = complimentaryFunctionsCount > 0 ? 2 : 0; // +2 for complimentary functions
    const functionPages = mainFunctionPages + additionalFunctionPages + complimentaryBonus;
    
    return basePages + functionPages;
  };
  
  const recommendedPages = calculateRecommendedPages();
  
  // Auto-update album pages when functions change
  React.useEffect(() => {
    if (bookingData.albumPages < recommendedPages) {
      updateBookingData({ albumPages: recommendedPages });
    }
  }, [recommendedPages, bookingData.albumPages, updateBookingData]);

  const extraPages = Math.max(0, bookingData.albumPages - basePages);
  const extraPagesMultiple = Math.ceil(extraPages / 10) * 10;
  const extraPagesCost = (extraPagesMultiple / 10) * 500;

  const handleAlbumPagesChange = (value: string) => {
    const pages = parseInt(value) || recommendedPages;
    updateBookingData({ albumPages: Math.max(recommendedPages, pages) });
  };

  const increasePages = () => {
    updateBookingData({ albumPages: bookingData.albumPages + 10 });
  };

  const decreasePages = () => {
    const newPages = Math.max(recommendedPages, bookingData.albumPages - 10);
    updateBookingData({ albumPages: newPages });
  };

  const handleComplimentarySelection = (selection: 'miniPhotobook' | 'calendarCombo' | 'photoFrames') => {
    updateBookingData({ 
      complimentarySelection: bookingData.complimentarySelection === selection ? '' : selection 
    });
  };

  const handleComplimentaryFunction = (func: 'saveTheDate' | 'temple' | 'postWedding' | 'bridalShower') => {
    const currentFunctions = bookingData.complimentaryFunctions || [];
    const isSelected = currentFunctions.includes(func);
    
    const updatedFunctions = isSelected
      ? currentFunctions.filter(f => f !== func)
      : [...currentFunctions, func];
    
    // Update complimentary functions and let the useEffect handle page recalculation
    updateBookingData({ 
      complimentaryFunctions: updatedFunctions
    });
  };

  const handleComplimentaryCinematographer = (checked: boolean) => {
    updateBookingData({ complimentaryCinematographer: checked });
  };

  const handleAddOnChange = (addOn: keyof BookingData['addOns'], checked: boolean) => {
    updateBookingData({
      addOns: { ...bookingData.addOns, [addOn]: checked }
    });
  };

  const getRecommendedAlbumSetup = () => {
    // Check for combined events or specific main function types
    const isCombinedEvent = bookingData.bookingType === 'combined';
    const hasWeddingMainFunctions = bookingData.mainFunctions.some(func => 
      ['engagement', 'wedding', 'weddingAndEngagement', 'reception'].includes(func.type)
    );

    if (isCombinedEvent || hasWeddingMainFunctions) {
      return {
        recommendation: 'two',
        reason: 'Two Individual Photo-Books recommended for Engagement+Wedding or Combined events',
        complimentaryDescription: 'Two individual Mini Photo books and Table Top Calendar'
      };
    }
    return {
      recommendation: 'one',
      reason: 'Single album with extra pages for additional functions',
      complimentaryDescription: 'Mini Photo book and Table Top Calendar'
    };
  };

  const albumRecommendation = getRecommendedAlbumSetup();

  // Auto-suggest two albums for combined events
  React.useEffect(() => {
    if (albumRecommendation.recommendation === 'two' && bookingData.albumType !== 'two') {
      updateBookingData({ albumType: 'two' });
    }
  }, [albumRecommendation.recommendation, bookingData.albumType, updateBookingData]);

  return (
    <div className="space-y-8">
      <Card className="bg-white border-gray-300 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-black">
            <Camera className="w-5 h-5" />
            Photo Albums / Photo-Books
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
            <h4 className="text-black mb-2">Album Configuration</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {bookingData.mainFunctions.length === 1 && bookingData.additionalFunctions.length === 2 ? (
                <div className="space-y-1">
                  <p className="text-black font-medium">✨ Special Package: 1 Main + 2 Additional Functions = 80 pages</p>
                  {bookingData.complimentaryFunctions && bookingData.complimentaryFunctions.length > 0 && (
                    <p>Complimentary functions included in the 80 pages</p>
                  )}
                  <p className="text-black">Total recommended: {recommendedPages} pages</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p>Base: {basePages} pages {bookingData.bookingType === 'other' && '(reduced for "Other" events)'}</p>
                  {bookingData.mainFunctions.length > 0 && <p>Main functions: +{bookingData.mainFunctions.length * 8} pages ({bookingData.mainFunctions.length} × 8)</p>}
                  {bookingData.additionalFunctions.length > 0 && <p>Additional functions: +{bookingData.additionalFunctions.length * 4} pages ({bookingData.additionalFunctions.length} × 4)</p>}
                  {bookingData.complimentaryFunctions && bookingData.complimentaryFunctions.length > 0 && (
                    <p>Complimentary functions bonus: +2 pages</p>
                  )}
                  <p className="text-black">Recommended minimum: {recommendedPages} pages</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-black">Total Album Pages</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={decreasePages}
                disabled={bookingData.albumPages <= recommendedPages}
                className="h-11 w-11 p-0 border-gray-300 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3 flex-1">
                <Input
                  type="number"
                  min={recommendedPages}
                  step="10"
                  value={bookingData.albumPages}
                  onChange={(e) => handleAlbumPagesChange(e.target.value)}
                  className="h-11 text-center border-gray-300 bg-white"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => updateBookingData({ albumPages: recommendedPages })}
                  className="h-11 border-gray-300 hover:bg-gray-100"
                >
                  Reset
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={increasePages}
                className="h-11 w-11 p-0 border-gray-300 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              {extraPages > 0 && (
                <p>Extra pages: {extraPagesMultiple} (minimum 10-page increments) - ₹{extraPagesCost.toLocaleString()}</p>
              )}
              <p>You can add more pages in increments of 10 for ₹500 per 10 pages</p>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-black">Album Type</Label>
            <RadioGroup
              value={bookingData.albumType}
              onValueChange={(value: 'one' | 'two') => updateBookingData({ albumType: value })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300">
                <RadioGroupItem value="one" id="one-album" />
                <Label htmlFor="one-album" className="flex items-center gap-2 cursor-pointer text-black">
                  One Photo-Book
                  {albumRecommendation.recommendation === 'one' && (
                    <Badge variant="secondary" className="bg-gray-200 text-black">Recommended</Badge>
                  )}
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300">
                <RadioGroupItem value="two" id="two-albums" />
                <Label htmlFor="two-albums" className="flex items-center gap-2 cursor-pointer text-black">
                  Two Individual Photo-Books
                  {albumRecommendation.recommendation === 'two' && (
                    <Badge variant="secondary" className="bg-gray-200 text-black">Recommended</Badge>
                  )}
                </Label>
              </div>
            </RadioGroup>
            
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg">
              <p className="text-sm text-black">
                <strong>Recommendation:</strong> {albumRecommendation.reason}
              </p>
              {bookingData.albumType === 'two' && (
                <p className="text-sm text-gray-600 mt-1">
                  Two albums are ideal for Combined events, Reception, Engagement+Wedding to separate different event styles.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-50 border-gray-300 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-black">
            <Gift className="w-5 h-5" />
            Complimentary Selection
          </CardTitle>
          <p className="text-sm text-gray-600">
            Choose complimentary items with your package: {albumRecommendation.complimentaryDescription}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                bookingData.complimentarySelection === 'miniPhotobook' 
                  ? 'border-black bg-gray-200' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleComplimentarySelection('miniPhotobook')}
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                  📖
                </div>
                <h4 className="text-black">Mini Photo Book</h4>
                <p className="text-sm text-gray-600">Compact 20-page photo book with highlights</p>
              </div>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                bookingData.complimentarySelection === 'calendarCombo' 
                  ? 'border-black bg-gray-200' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleComplimentarySelection('calendarCombo')}
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                  📅
                </div>
                <h4 className="text-black">Table Top Calendar</h4>
                <p className="text-sm text-gray-600">12-month desk calendar with your photos</p>
              </div>
            </div>

            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                bookingData.complimentarySelection === 'photoFrames' 
                  ? 'border-black bg-gray-200' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleComplimentarySelection('photoFrames')}
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                  🖼️
                </div>
                <h4 className="text-black">Photo Frames</h4>
                <p className="text-sm text-gray-600">Set of elegant photo frames with best shots</p>
              </div>
            </div>
          </div>

          {bookingData.complimentarySelection && (
            <div className="p-3 bg-gray-200 border border-gray-300 rounded-lg">
              <p className="text-sm text-black">
                ✓ Selected: {
                  bookingData.complimentarySelection === 'miniPhotobook' ? 'Mini Photo Book' :
                  bookingData.complimentarySelection === 'calendarCombo' ? 'Table Top Calendar' :
                  'Photo Frames'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-300 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-black">
            <Calendar className="w-5 h-5" />
            Complimentary Functions
          </CardTitle>
          <p className="text-sm text-gray-600">
            First function is complimentary. Additional functions: ₹1,800/hour for photography + cinematographer if selected. 
            {bookingData.mainFunctions.length === 1 && bookingData.additionalFunctions.length === 2 
              ? " For the special 80-page package, complimentary functions are included in the total." 
              : " Selecting any function automatically adds +2 bonus pages to your album."
            }
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'saveTheDate', label: 'Save the Date' },
              { id: 'temple', label: 'Temple' },
              { id: 'postWedding', label: 'Post Wedding' },
              { id: 'bridalShower', label: 'Bridal Shower' }
            ].map((func) => (
              <Button
                key={func.id}
                variant={bookingData.complimentaryFunctions?.includes(func.id as any) ? "default" : "outline"}
                size="sm"
                onClick={() => handleComplimentaryFunction(func.id as any)}
                className={`h-12 ${
                  bookingData.complimentaryFunctions?.includes(func.id as any)
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {func.label}
              </Button>
            ))}
          </div>

          {/* Cinematographer Option */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300">
              <input
                type="checkbox"
                id="complimentaryCinematographer"
                checked={bookingData.complimentaryCinematographer}
                onChange={(e) => handleComplimentaryCinematographer(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="complimentaryCinematographer" className="flex flex-col cursor-pointer">
                <span className="text-black">Add Cinematographer</span>
                <span className="text-sm text-gray-600">
                  ₹2,100/hour (max 8 hours = ₹18,000)
                </span>
                <span className="text-xs text-gray-500 italic">
                  Additional reel included with cinematographer service
                </span>
              </Label>
            </div>
          </div>

          {((bookingData.complimentaryFunctions && bookingData.complimentaryFunctions.length > 0) || bookingData.complimentaryCinematographer) && (
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg space-y-1">
              {bookingData.complimentaryFunctions && bookingData.complimentaryFunctions.length > 0 && (
                <div className="space-y-1">
                  {bookingData.complimentaryFunctions.map((func, index) => (
                    <p key={func} className="text-sm text-black">
                      ✓ Function {index + 1}: {
                        func === 'saveTheDate' ? 'Save the Date' :
                        func === 'temple' ? 'Temple' :
                        func === 'postWedding' ? 'Post Wedding' :
                        'Bridal Shower'
                      } {index === 0 ? '(Complimentary)' : '(₹1,800/hour)'}
                    </p>
                  ))}
                  <p className="text-sm text-black font-medium">
                    {bookingData.mainFunctions.length === 1 && bookingData.additionalFunctions.length === 2 
                      ? "✓ Included in the 80-page special package" 
                      : "✓ Bonus: +2 extra album pages included"
                    }
                  </p>
                  {bookingData.complimentaryFunctions.length > 1 && (
                    <p className="text-sm text-gray-600 italic">
                      Additional charges apply for functions beyond the first one
                    </p>
                  )}
                </div>
              )}
              {bookingData.complimentaryCinematographer && (
                <div className="space-y-1">
                  <p className="text-sm text-black">
                    ✓ Cinematographer: ₹18,000 (max 8 hours)
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Additional reel will be available with cinematographer service
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-100 border-gray-300 shadow-lg">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-black">
            🎬 Video Add-Ons
          </CardTitle>
          <p className="text-sm text-gray-600">
            Select additional video services. Pricing varies by package.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
              <Checkbox
                id="highlightShortMovie"
                checked={bookingData.addOns.highlightShortMovie}
                onCheckedChange={(checked: boolean) => 
                  handleAddOnChange('highlightShortMovie', checked as boolean)
                }
                className="mt-1"
              />
              <Label htmlFor="highlightShortMovie" className="flex flex-col cursor-pointer text-center">
                <span className="text-black">Highlight Short Movie</span>
                <span className="text-sm text-gray-600">
                  Highlight Video depending with music and event schedule it may changes the duration. Approximate 3 to 5 minutes
                </span>
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
              <Checkbox
                id="fullDocumentaryFilm"
                checked={bookingData.addOns.fullDocumentaryFilm}
                onCheckedChange={(checked: boolean) => 
                  handleAddOnChange('fullDocumentaryFilm', checked as boolean)
                }
                className="mt-1"
              />
              <Label htmlFor="fullDocumentaryFilm" className="flex flex-col cursor-pointer text-center">
                <span className="text-black">Full Documentary Film</span>
                <span className="text-sm text-gray-600">
                  Full Video 45 minutes approximately depending with music and event schedule may changes the duration.
                </span>
              </Label>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
              <Checkbox
                id="reel"
                checked={bookingData.addOns.reel}
                onCheckedChange={(checked: boolean) => 
                  handleAddOnChange('reel', checked as boolean)
                }
                className="mt-1"
              />
              <Label htmlFor="reel" className="flex flex-col cursor-pointer text-center">
                <span className="text-black">Social Media Reel</span>
                <span className="text-sm text-gray-600">
                  Short-form vertical video optimized for Instagram/social sharing
                </span>
              </Label>
            </div>
          </div>

          <div className="p-4 bg-gray-200 border border-gray-300 rounded-lg">
            <h4 className="text-black mb-2">Selected Add-Ons Summary</h4>
            <div className="space-y-1">
              {bookingData.addOns.highlightShortMovie && (
                <p className="text-sm text-black">✓ Highlight Short Movie</p>
              )}
              {bookingData.addOns.fullDocumentaryFilm && (
                <p className="text-sm text-black">✓ Full Documentary Film</p>
              )}
              {bookingData.addOns.reel && (
                <p className="text-sm text-black">✓ Social Media Reel</p>
              )}
              {!bookingData.addOns.highlightShortMovie && !bookingData.addOns.fullDocumentaryFilm && !bookingData.addOns.reel && (
                <p className="text-sm text-gray-600">No video add-ons selected</p>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Final pricing will be calculated based on your selected package in the next step.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}