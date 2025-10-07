import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Settings, 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Eye,
  Lock,
  Unlock
} from 'lucide-react';

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      businessName: 'Professional Event Photography',
      email: 'admin@eventphoto.com',
      phone: '+91 9876543210',
      address: '123 Business Street, Mumbai - 400001',
      website: 'www.eventphoto.com',
      logo: '',
      timezone: 'Asia/Kolkata',
      currency: 'INR'
    },
    notifications: {
      emailBookings: true,
      emailPayments: true,
      emailCancellations: true,
      smsBookings: false,
      smsPayments: true,
      smsReminders: true,
      pushNotifications: true,
      dailyReports: true,
      weeklyReports: false
    },
    booking: {
      advancePercentage: 30,
      cancellationPolicy: '50% refund if cancelled 30+ days before event',
      autoConfirmation: false,
      paymentMethods: ['bank_transfer', 'upi', 'card'],
      bookingPrefix: 'BK',
      defaultPackage: 'basic',
      requireApproval: true
    },
    pricing: {
      extraPageCost: 500,
      extraPageIncrement: 10,
      taxRate: 18,
      discountLimit: 50,
      currencySymbol: '₹'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 60,
      passwordPolicy: 'strong',
      loginAttempts: 5,
      apiAccess: true,
      dataBackup: true
    }
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@eventphoto.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-12-01 10:30 AM',
      permissions: ['all']
    },
    {
      id: 2,
      name: 'Manager',
      email: 'manager@eventphoto.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-11-30 4:15 PM',
      permissions: ['bookings', 'clients', 'reports']
    },
    {
      id: 3,
      name: 'Staff User',
      email: 'staff@eventphoto.com',
      role: 'staff',
      status: 'inactive',
      lastLogin: '2024-11-28 2:20 PM',
      permissions: ['bookings', 'clients']
    }
  ]);

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Admin</Badge>;
      case 'manager':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Manager</Badge>;
      case 'staff':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Staff</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Admin Settings</h2>
          <p className="text-gray-600">Configure system settings and preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex lg:gap-2 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="general" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="booking" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">Booking</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-white">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-black">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={settings.general.businessName}
                    onChange={(e) => handleSettingChange('general', 'businessName', e.target.value)}
                    className="border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.general.email}
                    onChange={(e) => handleSettingChange('general', 'email', e.target.value)}
                    className="border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.general.phone}
                    onChange={(e) => handleSettingChange('general', 'phone', e.target.value)}
                    className="border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={settings.general.website}
                    onChange={(e) => handleSettingChange('general', 'website', e.target.value)}
                    className="border-gray-300 bg-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={settings.general.address}
                  onChange={(e) => handleSettingChange('general', 'address', e.target.value)}
                  className="border-gray-300 bg-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.general.timezone} onValueChange={(value) => handleSettingChange('general', 'timezone', value)}>
                    <SelectTrigger className="border-gray-300 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.general.currency} onValueChange={(value) => handleSettingChange('general', 'currency', value)}>
                    <SelectTrigger className="border-gray-300 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-black">Business Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <Palette className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-sm text-gray-600 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-black">Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Bookings</Label>
                  <p className="text-sm text-gray-600">Get notified when new bookings are made</p>
                </div>
                <Switch
                  checked={settings.notifications.emailBookings}
                  onCheckedChange={(checked: boolean) => handleSettingChange('notifications', 'emailBookings', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Payment Received</Label>
                  <p className="text-sm text-gray-600">Get notified when payments are received</p>
                </div>
                <Switch
                  checked={settings.notifications.emailPayments}
                  onCheckedChange={(checked: boolean) => handleSettingChange('notifications', 'emailPayments', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Booking Cancellations</Label>
                  <p className="text-sm text-gray-600">Get notified when bookings are cancelled</p>
                </div>
                <Switch
                  checked={settings.notifications.emailCancellations}
                  onCheckedChange={(checked: boolean) => handleSettingChange('notifications', 'emailCancellations', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-black">SMS Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Booking Updates</Label>
                  <p className="text-sm text-gray-600">Send SMS for booking confirmations</p>
                </div>
                <Switch
                  checked={settings.notifications.smsBookings}
                  onCheckedChange={(checked: boolean) => handleSettingChange('notifications', 'smsBookings', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Payment Reminders</Label>
                  <p className="text-sm text-gray-600">Send SMS payment reminders</p>
                </div>
                <Switch
                  checked={settings.notifications.smsPayments}
                  onCheckedChange={(checked: boolean) => handleSettingChange('notifications', 'smsPayments', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-black">Report Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Reports</Label>
                  <p className="text-sm text-gray-600">Receive daily business summary reports</p>
                </div>
                <Switch
                  checked={settings.notifications.dailyReports}
                  onCheckedChange={(checked: boolean) => handleSettingChange('notifications', 'dailyReports', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-gray-600">Receive weekly performance reports</p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked: boolean) => handleSettingChange('notifications', 'weeklyReports', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Settings */}
        <TabsContent value="booking" className="space-y-6">
          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-black">Booking Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="advancePercentage">Advance Payment (%)</Label>
                  <Input
                    id="advancePercentage"
                    type="number"
                    value={settings.booking.advancePercentage}
                    onChange={(e) => handleSettingChange('booking', 'advancePercentage', parseInt(e.target.value))}
                    className="border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="bookingPrefix">Booking ID Prefix</Label>
                  <Input
                    id="bookingPrefix"
                    value={settings.booking.bookingPrefix}
                    onChange={(e) => handleSettingChange('booking', 'bookingPrefix', e.target.value)}
                    className="border-gray-300 bg-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
                <Textarea
                  id="cancellationPolicy"
                  value={settings.booking.cancellationPolicy}
                  onChange={(e) => handleSettingChange('booking', 'cancellationPolicy', e.target.value)}
                  className="border-gray-300 bg-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Confirmation</Label>
                  <p className="text-sm text-gray-600">Automatically confirm bookings upon payment</p>
                </div>
                <Switch
                  checked={settings.booking.autoConfirmation}
                  onCheckedChange={(checked: boolean) => handleSettingChange('booking', 'autoConfirmation', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Approval</Label>
                  <p className="text-sm text-gray-600">Require admin approval for new bookings</p>
                </div>
                <Switch
                  checked={settings.booking.requireApproval}
                  onCheckedChange={(checked: boolean) => handleSettingChange('booking', 'requireApproval', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-black">Pricing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="extraPageCost">Extra Page Cost (₹)</Label>
                  <Input
                    id="extraPageCost"
                    type="number"
                    value={settings.pricing.extraPageCost}
                    onChange={(e) => handleSettingChange('pricing', 'extraPageCost', parseInt(e.target.value))}
                    className="border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="extraPageIncrement">Page Increment</Label>
                  <Input
                    id="extraPageIncrement"
                    type="number"
                    value={settings.pricing.extraPageIncrement}
                    onChange={(e) => handleSettingChange('pricing', 'extraPageIncrement', parseInt(e.target.value))}
                    className="border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.pricing.taxRate}
                    onChange={(e) => handleSettingChange('pricing', 'taxRate', parseInt(e.target.value))}
                    className="border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="discountLimit">Max Discount (%)</Label>
                  <Input
                    id="discountLimit"
                    type="number"
                    value={settings.pricing.discountLimit}
                    onChange={(e) => handleSettingChange('pricing', 'discountLimit', parseInt(e.target.value))}
                    className="border-gray-300 bg-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-black">User Management</CardTitle>
                <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-black">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Last login: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-100">
                          {user.status === 'active' ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-300 hover:bg-red-50 text-red-600">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-black">Security Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Enable 2FA for additional security</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked: boolean) => handleSettingChange('security', 'twoFactorAuth', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>API Access</Label>
                  <p className="text-sm text-gray-600">Allow external API access</p>
                </div>
                <Switch
                  checked={settings.security.apiAccess}
                  onCheckedChange={(checked: boolean) => handleSettingChange('security', 'apiAccess', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Automatic Data Backup</Label>
                  <p className="text-sm text-gray-600">Enable daily data backups</p>
                </div>
                <Switch
                  checked={settings.security.dataBackup}
                  onCheckedChange={(checked: boolean) => handleSettingChange('security', 'dataBackup', checked)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={settings.security.loginAttempts}
                    onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                    className="border-gray-300 bg-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-black">Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-100">
                  <Download className="w-6 h-6" />
                  <span className="text-sm">Export Data</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-100">
                  <Upload className="w-6 h-6" />
                  <span className="text-sm">Import Data</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-100">
                  <Database className="w-6 h-6" />
                  <span className="text-sm">Backup Now</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}