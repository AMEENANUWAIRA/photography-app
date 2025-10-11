import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  MapPin,
  IndianRupee,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Package,
  Users,
  Camera,
  Video
} from 'lucide-react';

export function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock bookings data
  const bookings = [
    {
      id: 'BK001245',
      clientName: 'Priya & Rajesh Kumar',
      email: 'priya.rajesh@email.com',
      phone: '+91 9876543210',
      eventDate: '2024-12-15',
      eventLocation: 'Grand Palace Hotel, Mumbai',
      bookingType: 'Wedding',
      package: 'Classic Memories',
      status: 'confirmed',
      amount: 75000,
      advance: 22500,
      balance: 52500,
      guestRange: '500–1,000',
      photographers: 2,
      cinematographers: 2,
      albumPages: 80,
      addOns: ['Highlight Short Movie', 'Social Media Reel'],
      createdAt: '2024-11-20',
      lastUpdated: '2024-11-25'
    },
    {
      id: 'BK001246',
      clientName: 'Sneha & Arjun Patel',
      email: 'sneha.arjun@email.com',
      phone: '+91 9876543211',
      eventDate: '2024-12-20',
      eventLocation: 'Lakeview Resort, Pune',
      bookingType: 'Engagement',
      package: 'Signature Luxury',
      status: 'pending',
      amount: 95000,
      advance: 28500,
      balance: 66500,
      guestRange: '300–500',
      photographers: 2,
      cinematographers: 2,
      albumPages: 60,
      addOns: ['Full Documentary Film'],
      createdAt: '2024-11-18',
      lastUpdated: '2024-11-23'
    },
    {
      id: 'BK001247',
      clientName: 'Meera & Karthik Reddy',
      email: 'meera.karthik@email.com',
      phone: '+91 9876543212',
      eventDate: '2024-12-25',
      eventLocation: 'Heritage Gardens, Bangalore',
      bookingType: 'Wedding + Reception',
      package: 'Gold Moments',
      status: 'confirmed',
      amount: 125000,
      advance: 37500,
      balance: 87500,
      guestRange: '1,000–1,500',
      photographers: 3,
      cinematographers: 2,
      albumPages: 100,
      addOns: ['Highlight Short Movie', 'Full Documentary Film', 'Social Media Reel'],
      createdAt: '2024-11-15',
      lastUpdated: '2024-11-28'
    },
    {
      id: 'BK001248',
      clientName: 'Anitha & Venkat Sharma',
      email: 'anitha.venkat@email.com',
      phone: '+91 9876543213',
      eventDate: '2024-12-28',
      eventLocation: 'City Club, Chennai',
      bookingType: 'Birthday',
      package: 'Basic Elegance',
      status: 'cancelled',
      amount: 45000,
      advance: 0,
      balance: 45000,
      guestRange: '300–500',
      photographers: 1,
      cinematographers: 1,
      albumPages: 50,
      addOns: [],
      createdAt: '2024-11-10',
      lastUpdated: '2024-11-30'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleEditBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsEditDialogOpen(true);
  };

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Bookings Management</h2>
          <p className="text-gray-600">Manage all event bookings and their status</p>
        </div>
        <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white border-gray-200 shadow-elegant">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search bookings by name, ID, or email..."
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
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
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

      {/* Bookings Table */}
      <Card className="bg-white border-gray-200 shadow-elegant">
        <CardHeader>
          <CardTitle className="text-black">
            All Bookings ({filteredBookings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-black">Booking ID</TableHead>
                  <TableHead className="text-black">Client</TableHead>
                  <TableHead className="text-black">Event Date</TableHead>
                  <TableHead className="text-black">Type</TableHead>
                  <TableHead className="text-black">Package</TableHead>
                  <TableHead className="text-black">Amount</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-black">{booking.clientName}</p>
                        <p className="text-sm text-gray-600">{booking.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {new Date(booking.eventDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gray-300">
                        {booking.bookingType}
                      </Badge>
                    </TableCell>
                    <TableCell>{booking.package}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">₹{booking.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">₹{booking.advance.toLocaleString()} paid</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewBooking(booking)}
                          className="border-gray-300 hover:bg-gray-100"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBooking(booking)}
                          className="border-gray-300 hover:bg-gray-100"
                        >
                          <Edit className="w-3 h-3" />
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

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Booking Details - {selectedBooking?.id}</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              {/* Client Info */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Name</Label>
                      <p className="text-black">{selectedBooking.clientName}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Phone</Label>
                      <p className="text-black flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {selectedBooking.phone}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm text-gray-600">Email</Label>
                      <p className="text-black flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {selectedBooking.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Details */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Event Date</Label>
                      <p className="text-black">{new Date(selectedBooking.eventDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Event Type</Label>
                      <p className="text-black">{selectedBooking.bookingType}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm text-gray-600">Location</Label>
                      <p className="text-black flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedBooking.eventLocation}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Guest Range</Label>
                      <p className="text-black">{selectedBooking.guestRange}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Package & Services */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Package & Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Package</Label>
                      <p className="text-black">{selectedBooking.package}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Album Pages</Label>
                      <p className="text-black">{selectedBooking.albumPages} pages</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Photographers</Label>
                      <p className="text-black flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        {selectedBooking.photographers}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Cinematographers</Label>
                      <p className="text-black flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {selectedBooking.cinematographers}
                      </p>
                    </div>
                  </div>
                  {selectedBooking.addOns.length > 0 && (
                    <div>
                      <Label className="text-sm text-gray-600">Add-ons</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedBooking.addOns.map((addon: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-gray-300">
                            {addon}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Total Amount</Label>
                      <p className="text-xl font-bold text-black">₹{selectedBooking.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Advance Paid</Label>
                      <p className="text-lg font-medium text-green-700">₹{selectedBooking.advance.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Balance Due</Label>
                      <p className="text-lg font-medium text-orange-700">₹{selectedBooking.balance.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Update */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Update Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-gray-600">Current Status:</Label>
                      {getStatusBadge(selectedBooking.status)}
                    </div>
                    <Select
                      value={selectedBooking.status}
                      onValueChange={(value) => updateBookingStatus(selectedBooking.id, value)}
                    >
                      <SelectTrigger className="w-40 border-gray-300 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}