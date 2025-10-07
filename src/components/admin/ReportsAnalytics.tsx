import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  IndianRupee,
  Users,
  Calendar,
  Package,
  Download,
  Filter,
  RefreshCw,
  Eye,
  PieChart,
  LineChart
} from 'lucide-react';

export function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('overview');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 2850000,
      revenueGrowth: 12.5,
      totalBookings: 247,
      bookingsGrowth: 8.3,
      avgBookingValue: 115400,
      avgBookingGrowth: 4.2,
      conversionRate: 68.5,
      conversionGrowth: -2.1
    },
    monthlyRevenue: [
      { month: 'Jan', revenue: 180000, bookings: 15 },
      { month: 'Feb', revenue: 220000, bookings: 18 },
      { month: 'Mar', revenue: 250000, bookings: 21 },
      { month: 'Apr', revenue: 195000, bookings: 16 },
      { month: 'May', revenue: 285000, bookings: 24 },
      { month: 'Jun', revenue: 310000, bookings: 26 },
      { month: 'Jul', revenue: 275000, bookings: 22 },
      { month: 'Aug', revenue: 295000, bookings: 25 },
      { month: 'Sep', revenue: 325000, bookings: 28 },
      { month: 'Oct', revenue: 340000, bookings: 29 },
      { month: 'Nov', revenue: 385000, bookings: 32 },
      { month: 'Dec', revenue: 385000, bookings: 31 }
    ],
    packagePerformance: [
      { name: 'Classic Memories', bookings: 89, revenue: 4450000, growth: 15.2 },
      { name: 'Basic Elegance', bookings: 67, revenue: 2345000, growth: 8.7 },
      { name: 'Neon', bookings: 45, revenue: 1125000, growth: 22.3 },
      { name: 'Signature Luxury', bookings: 32, revenue: 2400000, growth: 5.1 },
      { name: 'Gold Moments', bookings: 18, revenue: 1800000, growth: -3.2 },
      { name: 'Premium Royal', bookings: 8, revenue: 1200000, growth: 12.8 }
    ],
    topClients: [
      { name: 'Meera & Karthik Reddy', bookings: 3, revenue: 275000, lastBooking: '2024-12-25' },
      { name: 'Priya & Rajesh Kumar', bookings: 2, revenue: 150000, lastBooking: '2024-12-15' },
      { name: 'Ravi & Sita Sharma', bookings: 2, revenue: 140000, lastBooking: '2024-11-28' },
      { name: 'Arun & Deepika Patel', bookings: 2, revenue: 125000, lastBooking: '2024-11-20' },
      { name: 'Vikram & Pooja Singh', bookings: 1, revenue: 95000, lastBooking: '2024-12-20' }
    ],
    recentActivities: [
      { action: 'New booking confirmed', client: 'Sneha & Arjun', amount: 95000, time: '2 hours ago' },
      { action: 'Payment received', client: 'Priya & Rajesh', amount: 75000, time: '4 hours ago' },
      { action: 'Package upgraded', client: 'Meera & Karthik', amount: 125000, time: '1 day ago' },
      { action: 'Booking cancelled', client: 'Anitha & Venkat', amount: 45000, time: '2 days ago' },
      { action: 'New client registered', client: 'Ravi & Priyanka', amount: 0, time: '3 days ago' }
    ]
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const getGrowthBadge = (growth: number) => {
    const isPositive = growth > 0;
    const icon = isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
    const colorClass = isPositive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200';
    
    return (
      <Badge className={`${colorClass} flex items-center gap-1`}>
        {icon}
        {Math.abs(growth)}%
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Reports & Analytics</h2>
          <p className="text-gray-600">Business insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 border-gray-300 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-3-months">Last 3 months</SelectItem>
              <SelectItem value="last-6-months">Last 6 months</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-200 p-3 rounded-full">
                <IndianRupee className="w-6 h-6 text-blue-700" />
              </div>
              {getGrowthBadge(analyticsData.overview.revenueGrowth)}
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(analyticsData.overview.totalRevenue)}</p>
              <p className="text-xs text-blue-700 mt-1">vs last period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-200 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-green-700" />
              </div>
              {getGrowthBadge(analyticsData.overview.bookingsGrowth)}
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Total Bookings</p>
              <p className="text-2xl font-bold text-green-900">{analyticsData.overview.totalBookings}</p>
              <p className="text-xs text-green-700 mt-1">vs last period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-200 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-700" />
              </div>
              {getGrowthBadge(analyticsData.overview.avgBookingGrowth)}
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg Booking Value</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(analyticsData.overview.avgBookingValue)}</p>
              <p className="text-xs text-purple-700 mt-1">vs last period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-orange-200 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-700" />
              </div>
              {getGrowthBadge(analyticsData.overview.conversionGrowth)}
            </div>
            <div>
              <p className="text-sm text-orange-600 font-medium">Conversion Rate</p>
              <p className="text-2xl font-bold text-orange-900">{analyticsData.overview.conversionRate}%</p>
              <p className="text-xs text-orange-700 mt-1">vs last period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="bg-white border-gray-200 shadow-elegant">
          <CardHeader className="pb-4">
            <CardTitle className="text-black flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.monthlyRevenue.slice(-6).map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-black to-gray-700 rounded-full"></div>
                    <span className="text-sm text-black">{data.month}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-black">{formatCurrency(data.revenue)}</p>
                    <p className="text-xs text-gray-600">{data.bookings} bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Package Performance */}
        <Card className="bg-white border-gray-200 shadow-elegant">
          <CardHeader className="pb-4">
            <CardTitle className="text-black flex items-center gap-2">
              <Package className="w-5 h-5" />
              Package Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.packagePerformance.slice(0, 5).map((pkg, index) => (
                <div key={pkg.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">{pkg.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-black">{pkg.bookings}</span>
                      {getGrowthBadge(pkg.growth)}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-black to-gray-700 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(pkg.bookings / analyticsData.packagePerformance[0].bookings) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card className="bg-white border-gray-200 shadow-elegant">
          <CardHeader className="pb-4">
            <CardTitle className="text-black flex items-center gap-2">
              <Users className="w-5 h-5" />
              Top Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topClients.map((client, index) => (
                <div key={client.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">{client.name}</p>
                    <p className="text-xs text-gray-600">
                      {client.bookings} booking{client.bookings > 1 ? 's' : ''} • Last: {new Date(client.lastBooking).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-black">{formatCurrency(client.revenue)}</p>
                    <p className="text-xs text-gray-600">Total value</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-white border-gray-200 shadow-elegant">
          <CardHeader className="pb-4">
            <CardTitle className="text-black flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-black to-gray-700 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-black">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.client}</p>
                    {activity.amount > 0 && (
                      <p className="text-xs font-medium text-black">{formatCurrency(activity.amount)}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Card className="bg-white border-gray-200 shadow-elegant">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-black">Detailed Reports</CardTitle>
            <div className="flex items-center gap-3">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-40 border-gray-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="revenue">Revenue Analysis</SelectItem>
                  <SelectItem value="clients">Client Analysis</SelectItem>
                  <SelectItem value="packages">Package Analysis</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <PieChart className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <h4 className="text-black mb-2">Revenue Breakdown</h4>
              <p className="text-sm text-gray-600">Package-wise revenue distribution and trends</p>
              <Button variant="outline" size="sm" className="mt-3 border-gray-300 hover:bg-gray-100">
                View Report
              </Button>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <h4 className="text-black mb-2">Client Insights</h4>
              <p className="text-sm text-gray-600">Client behavior and booking patterns analysis</p>
              <Button variant="outline" size="sm" className="mt-3 border-gray-300 hover:bg-gray-100">
                View Report
              </Button>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <h4 className="text-black mb-2">Performance Metrics</h4>
              <p className="text-sm text-gray-600">Conversion rates and business KPIs</p>
              <Button variant="outline" size="sm" className="mt-3 border-gray-300 hover:bg-gray-100">
                View Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}