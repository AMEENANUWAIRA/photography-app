import React from 'react';
import { Button } from './ui/button';
import { Download, FileText } from 'lucide-react';
import { BookingData } from '../App';

interface PDFGeneratorProps {
  bookingData: BookingData;
}

export function PDFGenerator({ bookingData }: PDFGeneratorProps) {
  const generatePDF = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const formatDate = (dateString: string) => {
      if (!dateString) return 'Not specified';
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const formatTime = (timeString: string) => {
      if (!timeString) return 'Not specified';
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };

    const getSelectedPackageInfo = () => {
      const packages = [
        { id: 'neon', name: 'Neon', description: 'Essential coverage for intimate events' },
        { id: 'basic', name: 'Basic Elegance', description: 'Perfect starter package for small celebrations' },
        { id: 'classic', name: 'Classic Memories', description: 'Comprehensive coverage with professional quality' },
        { id: 'signature', name: 'Signature Luxury', description: 'Premium experience with enhanced deliverables' },
        { id: 'gold', name: 'Gold Moments', description: 'Luxury package for grand celebrations' },
        { id: 'premium', name: 'Premium Royal', description: 'Ultimate luxury with fixed premium crew' }
      ];
      return packages.find(p => p.id === bookingData.selectedPackage) || packages[0];
    };

    const packageInfo = getSelectedPackageInfo();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Booking Summary - ${bookingData.clientName}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #ffffff;
            padding: 20px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #E8F5E8;
          }
          
          .header h1 {
            color: #1a1a1a;
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: bold;
          }
          
          .header p {
            color: #666;
            font-size: 16px;
          }
          
          .section {
            margin-bottom: 25px;
            padding: 20px;
            background: #FFFEF7;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
          }
          
          .section h2 {
            color: #1a1a1a;
            font-size: 20px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #E8F5E8;
          }
          
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          
          .grid-3 {
            grid-template-columns: 1fr 1fr 1fr;
          }
          
          .field {
            display: flex;
            flex-direction: column;
          }
          
          .field label {
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 4px;
            font-size: 14px;
          }
          
          .field span {
            color: #4B5563;
            font-size: 14px;
            padding: 6px 0;
          }
          
          .function-item {
            background: #F8F9FA;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 10px;
            border-left: 4px solid #E8F5E8;
          }
          
          .function-title {
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 8px;
          }
          
          .price-section {
            background: linear-gradient(135deg, #E8F5E8 0%, #F8F9FA 100%);
            border: 2px solid #E8F5E8;
          }
          
          .price-highlight {
            text-align: center;
            padding: 20px;
            background: #FFFFFF;
            border-radius: 8px;
            margin-top: 15px;
          }
          
          .price-highlight .amount {
            font-size: 32px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 5px;
          }
          
          .price-highlight .label {
            color: #666;
            font-size: 16px;
          }
          
          .addons-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
          }
          
          .addon-badge {
            background: #E8F5E8;
            color: #1a1a1a;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: bold;
          }
          
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #E8F5E8;
            color: #666;
            font-size: 14px;
          }
          
          @media print {
            body { padding: 0; }
            .section { break-inside: avoid; }
          }
          
          @page {
            margin: 20px;
            size: A4;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Professional Event Booking Summary</h1>
          <p>Photography & Videography Services</p>
          <p>Generated on: ${new Date().toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
        
        <div class="section">
          <h2>Client Information</h2>
          <div class="grid">
            <div class="field">
              <label>Client Name</label>
              <span>${bookingData.clientName || 'Not provided'}</span>
            </div>
            <div class="field">
              <label>Phone Number</label>
              <span>${bookingData.phone || 'Not provided'}</span>
            </div>
            <div class="field">
              <label>WhatsApp</label>
              <span>${bookingData.whatsapp || 'Same as phone'}</span>
            </div>
            <div class="field">
              <label>Email Address</label>
              <span>${bookingData.email || 'Not provided'}</span>
            </div>
          </div>
          <div class="grid">
            <div class="field">
              <label>Home Address</label>
              <span>${bookingData.homeAddress || 'Not provided'}</span>
            </div>
            <div class="field">
              <label>Current Location</label>
              <span>${bookingData.currentLocation || 'Not provided'}</span>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Event Details</h2>
          <div class="grid">
            <div class="field">
              <label>Booking Type</label>
              <span>${bookingData.bookingType.charAt(0).toUpperCase() + bookingData.bookingType.slice(1)}</span>
            </div>
            <div class="field">
              <label>Event Location</label>
              <span>${bookingData.eventLocation || 'Not specified'}</span>
            </div>
            <div class="field">
              <label>Event Date</label>
              <span>${formatDate(bookingData.eventDate)}</span>
            </div>
            <div class="field">
              <label>Expected Guests</label>
              <span>${bookingData.guestRange}</span>
            </div>
            <div class="field">
              <label>Budget Range</label>
              <span>₹${bookingData.budgetRange}</span>
            </div>
          </div>
        </div>
        
        ${bookingData.mainFunctions.length > 0 ? `
        <div class="section">
          <h2>Main Functions</h2>
          ${bookingData.mainFunctions.map(func => `
            <div class="function-item">
              <div class="function-title">${func.type.charAt(0).toUpperCase() + func.type.slice(1).replace(/([A-Z])/g, ' $1')}</div>
              <div class="grid grid-3">
                <div class="field">
                  <label>Date</label>
                  <span>${formatDate(func.date)}</span>
                </div>
                <div class="field">
                  <label>Start Time</label>
                  <span>${formatTime(func.startTime)}</span>
                </div>
                <div class="field">
                  <label>End Time</label>
                  <span>${formatTime(func.endTime)}</span>
                </div>
              </div>
              <div class="grid">
                <div class="field">
                  <label>Photographers</label>
                  <span>${func.photographers}</span>
                </div>
                <div class="field">
                  <label>Cinematographers</label>
                  <span>${func.cinematographers}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${bookingData.additionalFunctions.length > 0 ? `
        <div class="section">
          <h2>Additional Functions</h2>
          ${bookingData.additionalFunctions.map(func => `
            <div class="function-item">
              <div class="function-title">${func.type.charAt(0).toUpperCase() + func.type.slice(1).replace(/([A-Z])/g, ' $1')}</div>
              <div class="grid grid-3">
                <div class="field">
                  <label>Date</label>
                  <span>${formatDate(func.date)}</span>
                </div>
                <div class="field">
                  <label>Start Time</label>
                  <span>${formatTime(func.startTime)}</span>
                </div>
                <div class="field">
                  <label>End Time</label>
                  <span>${formatTime(func.endTime)}</span>
                </div>
              </div>
              <div class="grid grid-3">
                <div class="field">
                  <label>Extra Hours</label>
                  <span>${func.extraHours}</span>
                </div>
                <div class="field">
                  <label>Photographers</label>
                  <span>${func.photographers}</span>
                </div>
                <div class="field">
                  <label>Cinematographers</label>
                  <span>${func.cinematographers}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        <div class="section">
          <h2>Albums & Services</h2>
          <div class="grid">
            <div class="field">
              <label>Album Pages</label>
              <span>${bookingData.albumPages} pages</span>
            </div>
            <div class="field">
              <label>Album Type</label>
              <span>${bookingData.albumType === 'one' ? 'Single Photo-Book' : 'Two Individual Photo-Books'}</span>
            </div>
            <div class="field">
              <label>Crew Size</label>
              <span>${bookingData.photographers} Photographer(s) + ${bookingData.cinematographers} Cinematographer(s)</span>
            </div>
          </div>
          
          ${bookingData.complimentarySelection || (bookingData.complimentaryFunctions && bookingData.complimentaryFunctions.length > 0) || bookingData.complimentaryCinematographer ? `
          <div style="margin-top: 15px;">
            <label style="font-weight: bold; display: block; margin-bottom: 8px;">Complimentary Items</label>
            <div class="addons-list">
              ${bookingData.complimentarySelection === 'miniPhotobook' ? '<span class="addon-badge">Mini Photo Book</span>' : ''}
              ${bookingData.complimentarySelection === 'calendarCombo' ? '<span class="addon-badge">Table Top Calendar</span>' : ''}
              ${bookingData.complimentarySelection === 'photoFrames' ? '<span class="addon-badge">Photo Frames</span>' : ''}
              ${bookingData.complimentaryFunctions ? bookingData.complimentaryFunctions.map((func, index) => {
                const funcStr = func as string;

const funcName =
  funcStr === 'saveTheDate' ? 'Save the Date' :
  funcStr === 'temple' ? 'Temple' :
  funcStr === 'preWedding' ? 'Pre Wedding' :
  funcStr === 'postWedding' ? 'Post Wedding' :
  funcStr === 'madhuramVeppu' ? 'Madhuram Veppu' :
  'Bridal Shower';


                return `<span class="addon-badge">${funcName} ${index === 0 ? '(Complimentary)' : '(₹1,800/hour)'}</span>`;
              }).join('') : ''}
              ${bookingData.complimentaryCinematographer ? '<span class="addon-badge">Extra Cinematographer (₹18,000)</span>' : ''}
            </div>
          </div>
          ` : ''}
          
          ${Object.values(bookingData.addOns).some(Boolean) ? `
          <div style="margin-top: 15px;">
            <label style="font-weight: bold; display: block; margin-bottom: 8px;">Video Add-Ons</label>
            <div class="addons-list">
              ${bookingData.addOns.highlightShortMovie ? '<span class="addon-badge">Highlight Short Movie</span>' : ''}
              ${bookingData.addOns.fullDocumentaryFilm ? '<span class="addon-badge">Full Documentary Film</span>' : ''}
              ${bookingData.addOns.reel ? '<span class="addon-badge">Social Media Reel</span>' : ''}
            </div>
          </div>
          ` : ''}
        </div>
        
        <div class="section price-section">
          <h2>Package & Pricing</h2>
          <div class="grid">
            <div class="field">
              <label>Selected Package</label>
              <span>${packageInfo.name}</span>
            </div>
            <div class="field">
              <label>Package Description</label>
              <span>${packageInfo.description}</span>
            </div>
            ${bookingData.couponCode ? `
            <div class="field">
              <label>Coupon Applied</label>
              <span>${bookingData.couponCode} (${bookingData.couponDiscount}% discount)</span>
            </div>
            ` : ''}
          </div>
          
          <div class="price-highlight">
            <div class="amount">₹${bookingData.totalPrice.toLocaleString()}</div>
            <div class="label">Total Package Amount</div>
            ${bookingData.couponCode ? `<div style="color: #16a34a; font-size: 14px; margin-top: 5px;">Coupon discount applied</div>` : ''}
          </div>
        </div>
        
        <div class="section">
          <h2>Payment Information</h2>
          <div class="grid">
            <div class="field">
              <label>Advance Payment</label>
              <span>₹${bookingData.advance.toLocaleString() || '0'}</span>
            </div>
            <div class="field">
              <label>Balance Due Date</label>
              <span>${formatDate(bookingData.balanceDate)}</span>
            </div>
            <div class="field">
              <label>Remaining Balance</label>
              <span>₹${Math.max(0, bookingData.totalPrice - (bookingData.advance || 0)).toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>This booking summary was generated from our Professional Event Booking System</p>
          <p>For any queries or modifications, please contact our team</p>
          <p style="margin-top: 10px; font-weight: bold;">Thank you for choosing our photography & videography services!</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-black-elegant mb-2">Download Booking Summary</h4>
        <p className="text-sm text-black-elegant/70 mb-4">
          Generate a comprehensive PDF summary of this booking for your records
        </p>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button
          onClick={generatePDF}
          className="flex items-center gap-2 bg-black-elegant hover:bg-gray-800 text-white px-6 py-3"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {
            // Generate HTML preview in new tab
            const printWindow = window.open('', '_blank');
            if (printWindow) {
              printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8">
                  <title>Booking Summary Preview</title>
                  <style>body { font-family: Arial, sans-serif; padding: 20px; }</style>
                </head>
                <body>
                  <h1>Booking Summary Preview</h1>
                  <p>Client: ${bookingData.clientName}</p>
                  <p>Total: ₹${bookingData.totalPrice.toLocaleString()}</p>
                  <p>Package: ${bookingData.selectedPackage}</p>
                  <p><em>Use the "Download PDF" button to get the complete formatted summary.</em></p>
                </body>
                </html>
              `);
              printWindow.document.close();
            }
          }}
          className="flex items-center gap-2 border-gray-300 hover:bg-pastel-green/30"
        >
          <FileText className="w-4 h-4" />
          Preview
        </Button>
      </div>
    </div>
  );
}