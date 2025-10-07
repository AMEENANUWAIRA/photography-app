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
  Users,
  User,
  Heart,
  History,
  Star
} from 'lucide-react';

export function ClientManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock clients data
  const clients = [
    {
      id: 'CL001',
      name: 'Priya & Rajesh Kumar',
      email: 'priya.rajesh@email.com',
      phone: '+91 9876543210',
      whatsapp: '+91 9876543210',
      city: 'Mumbai',
      homeAddress: '12, Marine Drive, Mumbai - 400001',
      currentLocation: 'Bandra, Mumbai',
      totalBookings: 2,
      totalSpent: 150000,
      favoritePackage: 'Classic Memories',
      joinedDate: '2024-01-15',
      lastBooking: '2024-12-15',
      status: 'active',
      notes: 'VIP client, prefers morning shoots',
      bookingHistory: [
        {
          id: 'BK001245',
          eventDate: '2024-12-15',
          eventType: 'Wedding',
          package: 'Classic Memories',
          amount: 75000,
          status: 'confirmed'
        },
        {
          id: 'BK001123',
          eventDate: '2024-06-20',
          eventType: 'Engagement',
          package: 'Basic Elegance',
          amount: 75000,
          status: 'completed'
        }
      ]
    },
    {
      id: 'CL002',
      name: 'Sneha & Arjun Patel',
      email: 'sneha.arjun@email.com',
      phone: '+91 9876543211',
      whatsapp: '+91 9876543211',
      city: 'Pune',
      homeAddress: '45, Koregaon Park, Pune - 411001',
      currentLocation: 'Viman Nagar, Pune',
      totalBookings: 1,
      totalSpent: 95000,
      favoritePackage: 'Signature Luxury',
      joinedDate: '2024-11-18',
      lastBooking: '2024-12-20',
      status: 'active',
      notes: 'First time client, very detail-oriented',
      bookingHistory: [
        {
          id: 'BK001246',
          eventDate: '2024-12-20',
          eventType: 'Engagement',
          package: 'Signature Luxury',
          amount: 95000,
          status: 'pending'
        }
      ]
    },
    {
      id: 'CL003',
      name: 'Meera & Karthik Reddy',
      email: 'meera.karthik@email.com',
      phone: '+91 9876543212',
      whatsapp: '+91 9876543212',
      city: 'Bangalore',
      homeAddress: '78, Indiranagar, Bangalore - 560038',
      currentLocation: 'Whitefield, Bangalore',
      totalBookings: 3,
      totalSpent: 275000,
      favoritePackage: 'Gold Moments',
      joinedDate: '2023-08-10',
      lastBooking: '2024-12-25',
      status: 'vip',
      notes: 'Loyal client, refers many customers',
      bookingHistory: [
        {
          id: 'BK001247',
          eventDate: '2024-12-25',
          eventType: 'Wedding + Reception',
          package: 'Gold Moments',
          amount: 125000,
          status: 'confirmed'
        },
        {
          id: 'BK000987',
          eventDate: '2024-03-15',
          eventType: 'Pre-Wedding',
          package: 'Classic Memories',
          amount: 75000,
          status: 'completed'
        },
        {
          id: 'BK000654',
          eventDate: '2023-10-22',
          eventType: 'Engagement',
          package: 'Signature Luxury',
          amount: 75000,
          status: 'completed'
        }
      ]
    },
    {
      id: 'CL004',
      name: 'Anitha & Venkat Sharma',
      email: 'anitha.venkat@email.com',
      phone: '+91 9876543213',
      whatsapp: '+91 9876543213',
      city: 'Chennai',
      homeAddress: '23, T. Nagar, Chennai - 600017',
      currentLocation: 'Anna Nagar, Chennai',
      totalBookings: 1,
      totalSpent: 0,
      favoritePackage: 'Basic Elegance',
      joinedDate: '2024-11-10',
      lastBooking: '2024-12-28',
      status: 'inactive',
      notes: 'Cancelled last booking due to date change',
      bookingHistory: [
        {
          id: 'BK001248',
          eventDate: '2024-12-28',
          eventType: 'Birthday',
          package: 'Basic Elegance',
          amount: 45000,
          status: 'cancelled'
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'vip':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200"><Star className="w-3 h-3 mr-1" />VIP</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    const matchesCity = cityFilter === 'all' || client.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Client Management</h2>
          <p className="text-gray-600">Manage client information and booking history</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Clients</p>
                <p className="text-2xl font-bold text-blue-900">{clients.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Active Clients</p>
                <p className="text-2xl font-bold text-green-900">{clients.filter(c => c.status === 'active' || c.status === 'vip').length}</p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">VIP Clients</p>
                <p className="text-2xl font-bold text-purple-900">{clients.filter(c => c.status === 'vip').length}</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Avg. Spent</p>
                <p className="text-2xl font-bold text-orange-900">₹{Math.round(clients.reduce((sum, c) => sum + c.totalSpent, 0) / clients.length / 1000)}K</p>
              </div>
              <IndianRupee className="w-8 h-8 text-orange-600" />
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
                  placeholder="Search clients by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 bg-white"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-40 border-gray-300 bg-white">
                  <SelectValue placeholder="Filter by city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
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

      {/* Clients Table */}
      <Card className="bg-white border-gray-200 shadow-elegant">
        <CardHeader>
          <CardTitle className="text-black">
            All Clients ({filteredClients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-black">Client</TableHead>
                  <TableHead className="text-black">Contact</TableHead>
                  <TableHead className="text-black">Location</TableHead>
                  <TableHead className="text-black">Bookings</TableHead>
                  <TableHead className="text-black">Total Spent</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-black">{client.name}</p>
                        <p className="text-sm text-gray-600">ID: {client.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {client.email}
                        </p>
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {client.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {client.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{client.totalBookings}</p>
                        <p className="text-xs text-gray-500">
                          Last: {new Date(client.lastBooking).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">₹{client.totalSpent.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewClient(client)}
                          className="border-gray-300 hover:bg-gray-100"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
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

      {/* View Client Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Client Details - {selectedClient?.name}</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              {/* Client Info */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Name</Label>
                      <p className="text-black">{selectedClient.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Status</Label>
                      {getStatusBadge(selectedClient.status)}
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Phone</Label>
                      <p className="text-black">{selectedClient.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">WhatsApp</Label>
                      <p className="text-black">{selectedClient.whatsapp}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-sm text-gray-600">Email</Label>
                      <p className="text-black">{selectedClient.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Home Address</Label>
                      <p className="text-black">{selectedClient.homeAddress}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Current Location</Label>
                      <p className="text-black">{selectedClient.currentLocation}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Member Since</Label>
                      <p className="text-black">{new Date(selectedClient.joinedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Favorite Package</Label>
                      <p className="text-black">{selectedClient.favoritePackage}</p>
                    </div>
                  </div>
                  {selectedClient.notes && (
                    <div>
                      <Label className="text-sm text-gray-600">Notes</Label>
                      <p className="text-black bg-white p-3 rounded border border-gray-200">{selectedClient.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-900">{selectedClient.totalBookings}</p>
                    <p className="text-sm text-blue-600">Total Bookings</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-900">₹{selectedClient.totalSpent.toLocaleString()}</p>
                    <p className="text-sm text-green-600">Total Spent</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-900">₹{Math.round(selectedClient.totalSpent / Math.max(selectedClient.totalBookings, 1)).toLocaleString()}</p>
                    <p className="text-sm text-purple-600">Avg per Booking</p>
                  </CardContent>
                </Card>
              </div>

              {/* Booking History */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Booking History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedClient.bookingHistory.map((booking: any, index: number) => (
                      <div key={booking.id} className="p-4 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-black">{booking.id} - {booking.eventType}</p>
                            <p className="text-sm text-gray-600">{booking.package}</p>
                          </div>
                          <Badge 
                            className={
                              booking.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                              booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                              'bg-red-100 text-red-800 border-red-200'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(booking.eventDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            ₹{booking.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-black">Add New Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  placeholder="Enter client name"
                  className="border-gray-300 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="clientEmail">Email *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="Enter email address"
                  className="border-gray-300 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="clientPhone">Phone *</Label>
                <Input
                  id="clientPhone"
                  placeholder="Enter phone number"
                  className="border-gray-300 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="clientWhatsapp">WhatsApp</Label>
                <Input
                  id="clientWhatsapp"
                  placeholder="Enter WhatsApp number"
                  className="border-gray-300 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="clientCity">City</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 bg-white">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="clientStatus">Status</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 bg-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="clientAddress">Home Address</Label>
              <Textarea
                id="clientAddress"
                placeholder="Enter home address"
                className="border-gray-300 bg-white"
              />
            </div>
            <div>
              <Label htmlFor="clientNotes">Notes</Label>
              <Textarea
                id="clientNotes"
                placeholder="Add any notes about the client"
                className="border-gray-300 bg-white"
              />
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
                Add Client
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}