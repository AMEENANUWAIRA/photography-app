import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  IndianRupee,
  Camera,
  Video,
  FileText,
  Star,
  TrendingUp,
  Eye,
  Copy
} from 'lucide-react';

export function PackageManagement() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock packages data
  const packages = [
    {
      id: 'neon',
      name: 'Neon',
      description: 'Essential coverage for intimate events',
      budgetRange: ['Up to ₹50k'],
      basePrice: 25000,
      albumPrice: 10000,
      photographerPrice: 8000,
      cinematographerPrice: 8000,
      highlightVideoPrice: 5000,
      fullVideoPrice: 5000,
      reelPrice: 1000,
      extraHourlyRate: 1000,
      isActive: true,
      totalBookings: 45,
      revenue: 1125000,
      popularity: 18.5,
      features: [
        'Professional Photography',
        'Basic Videography',
        'Standard Album (60 pages)',
        'Basic Editing',
        'Digital Gallery'
      ]
    },
    {
      id: 'basic',
      name: 'Basic Elegance',
      description: 'Perfect starter package for small celebrations',
      budgetRange: ['Up to ₹50k', '50–80k'],
      basePrice: 35000,
      albumPrice: 12000,
      photographerPrice: 10000,
      cinematographerPrice: 10000,
      highlightVideoPrice: 8000,
      fullVideoPrice: 7000,
      reelPrice: 2000,
      extraHourlyRate: 1200,
      isActive: true,
      totalBookings: 67,
      revenue: 2345000,
      popularity: 27.6,
      features: [
        'Professional Photography',
        'HD Videography',
        'Premium Album (80 pages)',
        'Professional Editing',
        'Digital Gallery',
        'Basic Highlight Video'
      ]
    },
    {
      id: 'classic',
      name: 'Classic Memories',
      description: 'Comprehensive coverage with professional quality',
      budgetRange: ['50–80k', '80k–1L'],
      basePrice: 50000,
      albumPrice: 15000,
      photographerPrice: 12000,
      cinematographerPrice: 12000,
      highlightVideoPrice: 12000,
      fullVideoPrice: 10000,
      reelPrice: 3000,
      extraHourlyRate: 1500,
      isActive: true,
      totalBookings: 89,
      revenue: 4450000,
      popularity: 36.6,
      features: [
        'Professional Photography',
        'HD Videography',
        'Premium Album (100 pages)',
        'Professional Editing',
        'Digital Gallery',
        'Highlight Video',
        'Same Day Edit',
        'Drone Coverage'
      ]
    },
    {
      id: 'signature',
      name: 'Signature Luxury',
      description: 'Premium experience with enhanced deliverables',
      budgetRange: ['80k–1L', '1–1.5L'],
      basePrice: 75000,
      albumPrice: 18000,
      photographerPrice: 15000,
      cinematographerPrice: 15000,
      highlightVideoPrice: 18000,
      fullVideoPrice: 12000,
      reelPrice: 4000,
      extraHourlyRate: 1800,
      isActive: true,
      totalBookings: 32,
      revenue: 2400000,
      popularity: 13.2,
      features: [
        'Professional Photography',
        'Cinematic Videography',
        'Luxury Album (120 pages)',
        'Premium Editing',
        'Digital Gallery',
        'Highlight Video',
        'Full Documentary',
        'Drone Coverage',
        'Same Day Edit',
        'Professional Makeup Touch-ups'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Moments',
      description: 'Luxury package for grand celebrations',
      budgetRange: ['1–1.5L', '1.5–2L'],
      basePrice: 100000,
      albumPrice: 20000,
      photographerPrice: 18000,
      cinematographerPrice: 18000,
      highlightVideoPrice: 20000,
      fullVideoPrice: 15000,
      reelPrice: 5000,
      extraHourlyRate: 2000,
      isActive: true,
      totalBookings: 18,
      revenue: 1800000,
      popularity: 7.4,
      features: [
        'Professional Photography',
        'Cinematic Videography',
        'Luxury Album (150 pages)',
        'Premium Editing',
        'Digital Gallery',
        'Highlight Video',
        'Full Documentary',
        'Drone Coverage',
        'Same Day Edit',
        'Professional Makeup Touch-ups',
        'Live Streaming',
        'Photo Booth'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Royal',
      description: 'Ultimate luxury with fixed premium crew',
      budgetRange: ['1.5–2L', '2L+'],
      basePrice: 150000,
      albumPrice: 25000,
      photographerPrice: 18000,
      cinematographerPrice: 18000,
      highlightVideoPrice: 25000,
      fullVideoPrice: 15000,
      reelPrice: 6000,
      extraHourlyRate: 2300,
      isActive: true,
      totalBookings: 8,
      revenue: 1200000,
      popularity: 3.3,
      features: [
        'Professional Photography',
        'Cinematic Videography',
        'Luxury Album (200 pages)',
        'Premium Editing',
        'Digital Gallery',
        'Highlight Video',
        'Full Documentary',
        'Drone Coverage',
        'Same Day Edit',
        'Professional Makeup Touch-ups',
        'Live Streaming',
        'Photo Booth',
        'Dedicated Coordinator',
        'Multi-location Shoots'
      ]
    }
  ];

  const handleEditPackage = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsEditDialogOpen(true);
  };

  const handleAddPackage = () => {
    setSelectedPackage(null);
    setIsAddDialogOpen(true);
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity > 30) return 'text-green-600';
    if (popularity > 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Package Management</h2>
          <p className="text-gray-600">Manage photography and videography packages</p>
        </div>
        <Button 
          onClick={handleAddPackage}
          className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Package
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Packages</p>
                <p className="text-2xl font-bold text-blue-900">{packages.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Active Packages</p>
                <p className="text-2xl font-bold text-green-900">{packages.filter(p => p.isActive).length}</p>
              </div>
              <Star className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Total Bookings</p>
                <p className="text-2xl font-bold text-purple-900">{packages.reduce((sum, p) => sum + p.totalBookings, 0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-orange-900">₹{(packages.reduce((sum, p) => sum + p.revenue, 0) / 1000000).toFixed(1)}M</p>
              </div>
              <IndianRupee className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="bg-white border-gray-200 shadow-elegant hover:shadow-elegant-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-black flex items-center gap-2">
                    {pkg.name}
                    {pkg.totalBookings > 50 && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                </div>
                <Badge 
                  className={pkg.isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}
                >
                  {pkg.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pricing */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Base Price</span>
                  <span className="text-lg font-bold text-black">₹{pkg.basePrice.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>Album: ₹{pkg.albumPrice.toLocaleString()}</div>
                  <div>Extra Hour: ₹{pkg.extraHourlyRate.toLocaleString()}</div>
                  <div>Photographer: ₹{pkg.photographerPrice.toLocaleString()}</div>
                  <div>Cinematographer: ₹{pkg.cinematographerPrice.toLocaleString()}</div>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Budget Range</p>
                <div className="flex flex-wrap gap-2">
                  {pkg.budgetRange.map((range, index) => (
                    <Badge key={index} variant="outline" className="border-gray-300">
                      {range}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Bookings</p>
                  <p className="text-lg font-bold text-black">{pkg.totalBookings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-lg font-bold text-black">₹{(pkg.revenue / 100000).toFixed(1)}L</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Popularity</span>
                  <span className={`text-sm font-medium ${getPopularityColor(pkg.popularity)}`}>
                    {pkg.popularity}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-black to-gray-700 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${pkg.popularity}%` }}
                  />
                </div>
              </div>

              {/* Features Preview */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Key Features</p>
                <div className="space-y-1">
                  {pkg.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                  {pkg.features.length > 3 && (
                    <p className="text-xs text-gray-500 italic">+{pkg.features.length - 3} more features</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPackage(pkg)}
                  className="flex-1 border-gray-300 hover:bg-gray-100"
                >
                  <Edit className="w-3 h-3 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-100"
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-100"
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 hover:bg-red-50 text-red-600"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Package Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">
              Edit Package - {selectedPackage?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedPackage && (
            <div className="space-y-6">
              {/* Basic Info */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="packageName">Package Name</Label>
                      <Input
                        id="packageName"
                        defaultValue={selectedPackage.name}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="packageId">Package ID</Label>
                      <Input
                        id="packageId"
                        defaultValue={selectedPackage.id}
                        className="border-gray-300 bg-white"
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="packageDescription">Description</Label>
                    <Textarea
                      id="packageDescription"
                      defaultValue={selectedPackage.description}
                      className="border-gray-300 bg-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Pricing Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="basePrice">Base Price (₹)</Label>
                      <Input
                        id="basePrice"
                        type="number"
                        defaultValue={selectedPackage.basePrice}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="albumPrice">Album Price (₹)</Label>
                      <Input
                        id="albumPrice"
                        type="number"
                        defaultValue={selectedPackage.albumPrice}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="photographerPrice">Photographer (₹)</Label>
                      <Input
                        id="photographerPrice"
                        type="number"
                        defaultValue={selectedPackage.photographerPrice}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cinematographerPrice">Cinematographer (₹)</Label>
                      <Input
                        id="cinematographerPrice"
                        type="number"
                        defaultValue={selectedPackage.cinematographerPrice}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="highlightVideoPrice">Highlight Video (₹)</Label>
                      <Input
                        id="highlightVideoPrice"
                        type="number"
                        defaultValue={selectedPackage.highlightVideoPrice}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fullVideoPrice">Full Video (₹)</Label>
                      <Input
                        id="fullVideoPrice"
                        type="number"
                        defaultValue={selectedPackage.fullVideoPrice}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reelPrice">Reel Price (₹)</Label>
                      <Input
                        id="reelPrice"
                        type="number"
                        defaultValue={selectedPackage.reelPrice}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="extraHourlyRate">Extra Hour Rate (₹)</Label>
                      <Input
                        id="extraHourlyRate"
                        type="number"
                        defaultValue={selectedPackage.extraHourlyRate}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Package Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPackage.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <Input
                          defaultValue={feature}
                          className="border-gray-300 bg-white"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Package Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-black">Add New Package</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newPackageName">Package Name</Label>
                <Input
                  id="newPackageName"
                  placeholder="Enter package name"
                  className="border-gray-300 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="newPackageId">Package ID</Label>
                <Input
                  id="newPackageId"
                  placeholder="Enter package ID"
                  className="border-gray-300 bg-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="newPackageDescription">Description</Label>
              <Textarea
                id="newPackageDescription"
                placeholder="Enter package description"
                className="border-gray-300 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newBasePrice">Base Price (₹)</Label>
                <Input
                  id="newBasePrice"
                  type="number"
                  placeholder="0"
                  className="border-gray-300 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="newExtraHourlyRate">Extra Hour Rate (₹)</Label>
                <Input
                  id="newExtraHourlyRate"
                  type="number"
                  placeholder="0"
                  className="border-gray-300 bg-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black">
                Add Package
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}