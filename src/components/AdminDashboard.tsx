import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  IndianRupee, 
  Package, 
  Settings,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  TrendingUp,
  Camera,
  Video,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { BookingsManagement } from './admin/BookingsManagement';
import { ClientManagement } from './admin/ClientManagement';
import  {PackageManagement}  from './admin/PackageManagement';
import { CouponManagement } from './admin/CouponManagement';
import { CalendarView } from './admin/CalendarView';
import { ReportsAnalytics } from './admin/ReportsAnalytics';
import { AdminSettings } from './admin/AdminSettings';

interface AdminDashboardProps {
  onBackToBooking: () => void;
}

export function AdminDashboard({ onBackToBooking }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for dashboard metrics
  const dashboardStats = {
    totalBookings: 247,
    activeBookings: 18,
    totalRevenue: 2850000,
    monthlyRevenue: 485000,
    pendingPayments: 125000,
    upcomingEvents: 12,
    totalClients: 198,
    packagesSold: {
      neon: 45,
      basic: 67,
      classic: 89,
      signature: 32,
      gold: 18,
      premium: 8
    }
  };

  const recentBookings = [
    {
      id: 'BK001245',
      clientName: 'Priya & Rajesh',
      eventDate: '2024-12-15',
      package: 'Classic Memories',
      status: 'confirmed',
      amount: 75000,
      eventType: 'Wedding',
      location: 'Mumbai'
    },
    {
      id: 'BK001246',
      clientName: 'Sneha & Arjun',
      eventDate: '2024-12-20',
      package: 'Signature Luxury',
      status: 'pending',
      amount: 95000,
      eventType: 'Engagement',
      location: 'Pune'
    },
    {
      id: 'BK001247',
      clientName: 'Meera & Karthik',
      eventDate: '2024-12-25',
      package: 'Gold Moments',
      status: 'confirmed',
      amount: 125000,
      eventType: 'Wedding + Reception',
      location: 'Bangalore'
    },
    {
      id: 'BK001248',
      clientName: 'Anitha & Venkat',
      eventDate: '2024-12-28',
      package: 'Basic Elegance',
      status: 'cancelled',
      amount: 45000,
      eventType: 'Birthday',
      location: 'Chennai'
    }
  ];

  const getStatusBadge = (status:string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToBooking}
                className="flex items-center gap-2 border-gray-300 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Booking
              </Button>
              <div>
                <h1 className="bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Event Booking Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gray-100 text-gray-800 border-gray-300">
                <Clock className="w-3 h-3 mr-1" />
                {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-none lg:flex lg:gap-2 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-white">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Clients</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Packages</span>
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center gap-2 data-[state=active]:bg-white">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Coupons</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-white">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Bookings</p>
                      <p className="text-2xl font-bold text-blue-900">{dashboardStats.totalBookings}</p>
                      <p className="text-xs text-blue-700 mt-1">+12% from last month</p>
                    </div>
                    <div className="bg-blue-200 p-3 rounded-full">
                      <Calendar className="w-6 h-6 text-blue-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold text-green-900">₹{(dashboardStats.totalRevenue / 1000000).toFixed(1)}M</p>
                      <p className="text-xs text-green-700 mt-1">+8% from last month</p>
                    </div>
                    <div className="bg-green-200 p-3 rounded-full">
                      <IndianRupee className="w-6 h-6 text-green-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Active Bookings</p>
                      <p className="text-2xl font-bold text-orange-900">{dashboardStats.activeBookings}</p>
                      <p className="text-xs text-orange-700 mt-1">Next 30 days</p>
                    </div>
                    <div className="bg-orange-200 p-3 rounded-full">
                      <AlertCircle className="w-6 h-6 text-orange-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Total Clients</p>
                      <p className="text-2xl font-bold text-purple-900">{dashboardStats.totalClients}</p>
                      <p className="text-xs text-purple-700 mt-1">+15 new this month</p>
                    </div>
                    <div className="bg-purple-200 p-3 rounded-full">
                      <Users className="w-6 h-6 text-purple-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card className="bg-white border-gray-200 shadow-elegant">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-black-elegant">Recent Bookings</span>
                    <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100">
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-black">{booking.clientName}</p>
                            <p className="text-sm text-gray-600">{booking.id} • {booking.eventType}</p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(booking.eventDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {booking.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {booking.package}
                          </div>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            ��{booking.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Package Performance */}
              <Card className="bg-white border-gray-200 shadow-elegant">
                <CardHeader className="pb-4">
                  <CardTitle className="text-black-elegant">Package Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(dashboardStats.packagesSold).map(([packageName, count]) => {
                      const percentage = (count / Object.values(dashboardStats.packagesSold).reduce((a, b) => a + b, 0)) * 100;
                      return (
                        <div key={packageName} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize text-black">{packageName.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-gray-600">{count} bookings</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-black to-gray-700 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-black-elegant">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setActiveTab('bookings')}
                    className="h-20 flex flex-col items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    <Plus className="w-6 h-6" />
                    <span className="text-sm">New Booking</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab('clients')}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-100"
                  >
                    <Users className="w-6 h-6" />
                    <span className="text-sm text-black">Manage Clients</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab('calendar')}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-100"
                  >
                    <Calendar className="w-6 h-6" />
                    <span className="text-sm text-black">View Calendar</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab('reports')}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-100"
                  >
                    <BarChart3 className="w-6 h-6" />
                    <span className="text-sm text-black">Generate Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other Tabs Content */}
          <TabsContent value="bookings">
            <BookingsManagement />
          </TabsContent>

          <TabsContent value="clients">
            <ClientManagement />
          </TabsContent>

          <TabsContent value="packages">
            <PackageManagement />
          </TabsContent>

          <TabsContent value="coupons">
            <CouponManagement />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}