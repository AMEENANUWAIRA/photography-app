import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Eye,
  MapPin,
  Clock,
  Users,
  Camera,
  Video,
  Package,
  Phone,
  Mail
} from 'lucide-react';

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState('month');

  // Mock events data
  const events = [
    {
      id: 'BK001245',
      title: 'Priya & Rajesh - Wedding',
      date: '2024-12-15',
      time: '07:30 - 15:30',
      location: 'Grand Palace Hotel, Mumbai',
      client: 'Priya & Rajesh Kumar',
      phone: '+91 9876543210',
      email: 'priya.rajesh@email.com',
      package: 'Classic Memories',
      status: 'confirmed',
      eventType: 'wedding',
      photographers: 2,
      cinematographers: 2,
      amount: 75000,
      crew: ['John Doe', 'Jane Smith', 'Mike Wilson', 'Sarah Johnson'],
      notes: 'VIP client, morning ceremony'
    },
    {
      id: 'BK001246',
      title: 'Sneha & Arjun - Engagement',
      date: '2024-12-20',
      time: '17:30 - 21:30',
      location: 'Lakeview Resort, Pune',
      client: 'Sneha & Arjun Patel',
      phone: '+91 9876543211',
      email: 'sneha.arjun@email.com',
      package: 'Signature Luxury',
      status: 'confirmed',
      eventType: 'engagement',
      photographers: 2,
      cinematographers: 2,
      amount: 95000,
      crew: ['Alex Brown', 'Lisa Green', 'Tom White', 'Emma Davis'],
      notes: 'Evening ceremony, drone requested'
    },
    {
      id: 'BK001247',
      title: 'Meera & Karthik - Wedding + Reception',
      date: '2024-12-25',
      time: '07:30 - 22:00',
      location: 'Heritage Gardens, Bangalore',
      client: 'Meera & Karthik Reddy',
      phone: '+91 9876543212',
      email: 'meera.karthik@email.com',
      package: 'Gold Moments',
      status: 'confirmed',
      eventType: 'wedding',
      photographers: 3,
      cinematographers: 2,
      amount: 125000,
      crew: ['David Lee', 'Amy Chen', 'Mark Taylor', 'Sophie Wilson', 'Chris Moore'],
      notes: 'Full day coverage, multiple locations'
    },
    {
      id: 'BK001250',
      title: 'Ravi & Priyanka - Pre-Wedding',
      date: '2024-12-28',
      time: '06:00 - 18:00',
      location: 'Goa Beach Resort',
      client: 'Ravi & Priyanka Singh',
      phone: '+91 9876543214',
      email: 'ravi.priyanka@email.com',
      package: 'Premium Royal',
      status: 'confirmed',
      eventType: 'pre-wedding',
      photographers: 2,
      cinematographers: 1,
      amount: 85000,
      crew: ['Kevin Black', 'Nina Rodriguez', 'Jake Williams'],
      notes: 'Beach shoot, early morning start'
    },
    {
      id: 'BK001251',
      title: 'Anil & Sunita - Birthday',
      date: '2024-12-30',
      time: '18:00 - 22:00',
      location: 'Home - Bandra, Mumbai',
      client: 'Anil Kumar',
      phone: '+91 9876543215',
      email: 'anil.kumar@email.com',
      package: 'Basic Elegance',
      status: 'pending',
      eventType: 'birthday',
      photographers: 1,
      cinematographers: 1,
      amount: 35000,
      crew: ['Sam Parker', 'Maya Patel'],
      notes: 'Home celebration, kid-friendly setup'
    }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'wedding':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'engagement':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'pre-wedding':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'birthday':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'anniversary':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 border border-gray-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      
      days.push(
        <div key={day} className={`h-32 border border-gray-200 p-2 overflow-y-auto ${isToday ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50`}>
          <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-black'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setIsEventDialogOpen(true);
                }}
                className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${getEventTypeColor(event.eventType)}`}
              >
                <div className="font-medium truncate">{event.title}</div>
                <div className="text-xs opacity-75">{event.time}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Calendar View</h2>
          <p className="text-gray-600">View and manage scheduled events</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-32 border-gray-300 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-black flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                    className="border-gray-300 hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                    className="border-gray-300 hover:bg-gray-100"
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                    className="border-gray-300 hover:bg-gray-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Week Headers */}
              <div className="grid grid-cols-7 gap-0 mb-0">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-sm font-medium text-gray-600 text-center border border-gray-200 bg-gray-50">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0">
                {renderCalendarGrid()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader className="pb-4">
              <CardTitle className="text-black">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsEventDialogOpen(true);
                    }}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-black text-sm">{event.title}</p>
                        <p className="text-xs text-gray-600">{event.client}</p>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Event Type Legend */}
          <Card className="bg-white border-gray-200 shadow-elegant">
            <CardHeader className="pb-4">
              <CardTitle className="text-black">Event Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { type: 'wedding', label: 'Wedding' },
                  { type: 'engagement', label: 'Engagement' },
                  { type: 'pre-wedding', label: 'Pre-Wedding' },
                  { type: 'birthday', label: 'Birthday' },
                  { type: 'anniversary', label: 'Anniversary' }
                ].map((item) => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${getEventTypeColor(item.type).replace('text-', 'bg-').split(' ')[0]}`}></div>
                    <span className="text-sm text-black">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Details Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Event Details - {selectedEvent?.id}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-6">
              {/* Event Header */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-black">{selectedEvent.title}</h3>
                      <p className="text-gray-600">{selectedEvent.client}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getEventTypeColor(selectedEvent.eventType)}>
                        {selectedEvent.eventType}
                      </Badge>
                      <Badge className={getStatusColor(selectedEvent.status)}>
                        {selectedEvent.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-black">{new Date(selectedEvent.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-black">{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-black">{selectedEvent.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Client Contact */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Client Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span className="text-black">{selectedEvent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span className="text-black">{selectedEvent.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Details */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Service Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Package</span>
                      </div>
                      <p className="text-black">{selectedEvent.package}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Camera className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Photographers</span>
                      </div>
                      <p className="text-black">{selectedEvent.photographers}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Video className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Cinematographers</span>
                      </div>
                      <p className="text-black">{selectedEvent.cinematographers}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Assigned Crew</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.crew.map((member: string, index: number) => (
                        <Badge key={index} variant="outline" className="border-gray-300">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedEvent.notes && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Notes</p>
                      <p className="text-black bg-white p-3 rounded border border-gray-200">{selectedEvent.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Booking
                </Button>
                <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black">
                  Edit Event
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}