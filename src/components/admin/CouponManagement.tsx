import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { 
  Tag, 
  Plus, 
  Edit, 
  Trash2, 
  Copy,
  Search,
  Filter,
  Download,
  Eye,
  Percent,
  Calendar as CalendarIcon,
  Users,
  TrendingUp,
  DollarSign,
  Gift,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '../ui/utils';
import { format } from 'date-fns';

export function CouponManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  // Mock coupons data
  const coupons = [
    {
      id: 'CP001',
      code: 'WEDDING10',
      description: 'Special discount for wedding bookings',
      discountType: 'percentage',
      discountValue: 10,
      minOrderValue: 50000,
      maxDiscountAmount: 10000,
      totalUses: 45,
      usageLimit: 100,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true,
      createdBy: 'Admin',
      createdAt: '2024-01-01',
      applicablePackages: ['classic', 'signature', 'gold', 'premium'],
      userRestrictions: 'all',
      revenue: 375000,
      status: 'active'
    },
    {
      id: 'CP002',
      code: 'SAVE15',
      description: 'Save 15% on all packages',
      discountType: 'percentage',
      discountValue: 15,
      minOrderValue: 75000,
      maxDiscountAmount: 15000,
      totalUses: 23,
      usageLimit: 50,
      startDate: '2024-06-01',
      endDate: '2024-12-31',
      isActive: true,
      createdBy: 'Admin',
      createdAt: '2024-05-25',
      applicablePackages: ['all'],
      userRestrictions: 'new',
      revenue: 287500,
      status: 'active'
    },
    {
      id: 'CP003',
      code: 'NEWCLIENT',
      description: 'Welcome bonus for new clients',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 30000,
      maxDiscountAmount: 8000,
      totalUses: 67,
      usageLimit: 200,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true,
      createdBy: 'Admin',
      createdAt: '2024-01-01',
      applicablePackages: ['neon', 'basic', 'classic'],
      userRestrictions: 'first-time',
      revenue: 456000,
      status: 'active'
    },
    {
      id: 'CP004',
      code: 'FESTIVE25',
      description: 'Festival season special offer',
      discountType: 'percentage',
      discountValue: 25,
      minOrderValue: 100000,
      maxDiscountAmount: 25000,
      totalUses: 12,
      usageLimit: 30,
      startDate: '2024-10-01',
      endDate: '2024-11-30',
      isActive: false,
      createdBy: 'Admin',
      createdAt: '2024-09-15',
      applicablePackages: ['gold', 'premium'],
      userRestrictions: 'all',
      revenue: 180000,
      status: 'expired'
    },
    {
      id: 'CP005',
      code: 'EARLYBIRD',
      description: 'Early booking discount',
      discountType: 'percentage',
      discountValue: 12,
      minOrderValue: 40000,
      maxDiscountAmount: 6000,
      totalUses: 34,
      usageLimit: 75,
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      isActive: true,
      createdBy: 'Manager',
      createdAt: '2024-02-25',
      applicablePackages: ['basic', 'classic', 'signature'],
      userRestrictions: 'advance-booking',
      revenue: 198000,
      status: 'active'
    },
    {
      id: 'CP006',
      code: 'FLASH50',
      description: 'Flash sale - Limited time',
      discountType: 'fixed',
      discountValue: 5000,
      minOrderValue: 50000,
      maxDiscountAmount: 5000,
      totalUses: 8,
      usageLimit: 20,
      startDate: '2024-11-01',
      endDate: '2024-11-07',
      isActive: false,
      createdBy: 'Admin',
      createdAt: '2024-10-28',
      applicablePackages: ['all'],
      userRestrictions: 'all',
      revenue: 40000,
      status: 'expired'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Expired</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><AlertCircle className="w-3 h-3 mr-1" />Paused</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || coupon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditCoupon = (coupon: any) => {
    setSelectedCoupon(coupon);
    setIsEditDialogOpen(true);
  };

  const handleAddCoupon = () => {
    setSelectedCoupon(null);
    setIsAddDialogOpen(true);
  };

  const handleCopyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const calculateUsagePercentage = (used: number, limit: number) => {
    return (used / limit) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Coupon Management</h2>
          <p className="text-gray-600">Create and manage discount coupons</p>
        </div>
        <Button 
          onClick={handleAddCoupon}
          className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Coupons</p>
                <p className="text-2xl font-bold text-blue-900">{coupons.length}</p>
              </div>
              <Tag className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Active Coupons</p>
                <p className="text-2xl font-bold text-green-900">{coupons.filter(c => c.status === 'active').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Total Uses</p>
                <p className="text-2xl font-bold text-purple-900">{coupons.reduce((sum, c) => sum + c.totalUses, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Revenue Impact</p>
                <p className="text-2xl font-bold text-orange-900">₹{(coupons.reduce((sum, c) => sum + c.revenue, 0) / 100000).toFixed(1)}L</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white border-gray-200 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search coupons by code or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 bg-white"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 border-gray-300 bg-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coupons Table */}
      <Card className="bg-white border-gray-200 shadow-elegant">
        <CardHeader>
          <CardTitle className="text-black">
            All Coupons ({filteredCoupons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-black">Coupon Code</TableHead>
                  <TableHead className="text-black">Discount</TableHead>
                  <TableHead className="text-black">Usage</TableHead>
                  <TableHead className="text-black">Valid Period</TableHead>
                  <TableHead className="text-black">Revenue</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-mono font-bold text-black">{coupon.code}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyCouponCode(coupon.code)}
                            className="h-6 w-6 p-0 border-gray-300 hover:bg-gray-100"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">{coupon.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-black">
                          {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          Min: ₹{coupon.minOrderValue.toLocaleString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-black">{coupon.totalUses}/{coupon.usageLimit}</p>
                        <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-gradient-to-r from-black to-gray-700 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${calculateUsagePercentage(coupon.totalUses, coupon.usageLimit)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{new Date(coupon.startDate).toLocaleDateString()}</p>
                        <p className="text-gray-500">to {new Date(coupon.endDate).toLocaleDateString()}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-black">₹{coupon.revenue.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCoupon(coupon)}
                          className="border-gray-300 hover:bg-gray-100"
                        >
                          <Edit className="w-3 h-3" />
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
                          className="border-red-300 hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Coupon Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Edit Coupon - {selectedCoupon?.code}</DialogTitle>
          </DialogHeader>
          {selectedCoupon && (
            <div className="space-y-6">
              {/* Basic Info */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="couponCode">Coupon Code</Label>
                      <Input
                        id="couponCode"
                        defaultValue={selectedCoupon.code}
                        className="border-gray-300 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="couponStatus">Status</Label>
                      <Select defaultValue={selectedCoupon.status}>
                        <SelectTrigger className="border-gray-300 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="couponDescription">Description</Label>
                    <Input
                      id="couponDescription"
                      defaultValue={selectedCoupon.description}
                      className="border-gray-300 bg-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Discount Settings */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Discount Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="discountType">Discount Type</Label>
                      <Select defaultValue={selectedCoupon.discountType}>
                        <SelectTrigger className="border-gray-300 bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="discountValue">
                        Discount Value {selectedCoupon.discountType === 'percentage' ? '(%)' : '(₹)'}
                      </Label>
                      <Input
                        id="discountValue"
                        type="number"
                        defaultValue={selectedCoupon.discountValue}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="minOrderValue">Minimum Order Value (₹)</Label>
                      <Input
                        id="minOrderValue"
                        type="number"
                        defaultValue={selectedCoupon.minOrderValue}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxDiscountAmount">Maximum Discount (₹)</Label>
                      <Input
                        id="maxDiscountAmount"
                        type="number"
                        defaultValue={selectedCoupon.maxDiscountAmount}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage & Validity */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Usage & Validity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="usageLimit">Usage Limit</Label>
                      <Input
                        id="usageLimit"
                        type="number"
                        defaultValue={selectedCoupon.usageLimit}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label>Current Usage</Label>
                      <div className="text-black bg-white border border-gray-300 rounded px-3 py-2">
                        {selectedCoupon.totalUses} uses
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        defaultValue={selectedCoupon.startDate}
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        defaultValue={selectedCoupon.endDate}
                        className="border-gray-300 bg-white"
                      />
                    </div>
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

      {/* Add Coupon Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-black">Create New Coupon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newCouponCode">Coupon Code</Label>
                <Input
                  id="newCouponCode"
                  placeholder="e.g., SAVE20"
                  className="border-gray-300 bg-white font-mono"
                />
              </div>
              <div>
                <Label htmlFor="newDiscountType">Discount Type</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 bg-white">
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="newCouponDescription">Description</Label>
              <Input
                id="newCouponDescription"
                placeholder="Brief description of the coupon"
                className="border-gray-300 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newDiscountValue">Discount Value</Label>
                <Input
                  id="newDiscountValue"
                  type="number"
                  placeholder="0"
                  className="border-gray-300 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="newUsageLimit">Usage Limit</Label>
                <Input
                  id="newUsageLimit"
                  type="number"
                  placeholder="100"
                  className="border-gray-300 bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newStartDate">Start Date</Label>
                <Input
                  id="newStartDate"
                  type="date"
                  className="border-gray-300 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="newEndDate">End Date</Label>
                <Input
                  id="newEndDate"
                  type="date"
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
                Create Coupon
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}