import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  IndianRupee,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
} from "lucide-react";
import axios from "axios";

// TypeScript interfaces
interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  homeAddress?: string;
  notes?: string;
  location?: string;
  status?: string;
}

interface Package {
  id: number;
  name: string;
  price?: number;
  description?: string;
}

interface Booking {
  id: number;
  booking_id: string;
  client: Client; // remove | null
  package: Package; // remove | null
  event_date: string;
  event_location: string;
  guest_range?: string;
  budget_range?: string;
  event_type: string;
  total_amount: number;
  paid_amount: number;
  status: string;
}

export function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<Booking[]>(
          "http://127.0.0.1:8000/api/admin/bookings/"
        );

        const bookingsWithBalance = response.data.map((booking) => ({
          ...booking,
          total_amount: Number(booking.total_amount),
          paid_amount: Number(booking.paid_amount),
          balance: Number(booking.total_amount) - Number(booking.paid_amount),
        }));

        setBookings(bookingsWithBalance);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" /> Cancelled
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <CheckCircle className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const name = booking.client?.name ?? "";
    const email = booking.client?.email ?? "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.booking_id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      booking.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditDialogOpen(true);
  };

  const handleDeleteBooking = async (bookingId: number) => {
    if (!bookingId) return alert("Invalid booking ID");
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
  
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/bookings/${bookingId}/`);
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      alert("Booking deleted successfully!");
    } catch (error: any) {
      console.error(error.response?.data || error);
      alert("Failed to delete booking.");
    }
  };  

  const handleSaveChanges = async () => {
    if (!selectedBooking) return;

    try {
      const payload = {
        client_id: selectedBooking.client.id,
        package_id: selectedBooking.package.id,
        event_date: selectedBooking.event_date,
        event_location: selectedBooking.event_location,
        guest_range: selectedBooking.guest_range || "",
        budget_range: selectedBooking.budget_range || "",
        event_type: selectedBooking.event_type,
        total_amount: Number(selectedBooking.total_amount) || 0,
        paid_amount: Number(selectedBooking.paid_amount) || 0,
        status: selectedBooking.status,
      };

      const response = await axios.put<Booking>(
        `http://127.0.0.1:8000/api/admin/bookings/${selectedBooking.id}/`,
        payload
      );

      setBookings((prev) =>
        prev.map((b) => (b.id === selectedBooking.id ? response.data : b))
      );

      alert("Booking updated successfully!");
      setSelectedBooking(null);
      setIsEditDialogOpen(false);
    } catch (error: any) {
      console.error("Error updating booking:", error.response?.data || error);
      alert("Failed to update booking.");
    }
  };

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Bookings Management</h2>
          <p className="text-gray-600">
            Manage all event bookings and their status
          </p>
        </div>
        <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black">
          <Plus className="w-4 h-4 mr-2" /> New Booking
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white border-gray-200 shadow-elegant">
        <CardContent className="p-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search bookings by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 bg-white"
            />
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 border-gray-300 bg-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100"
            >
              <Filter className="w-4 h-4 mr-2" /> More Filters
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100"
            >
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
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
                  <TableRow
                    key={booking.id}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    <TableCell className="font-mono text-sm">
                      {booking.booking_id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-black">
                          {booking.client?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.client?.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {new Date(booking.event_date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gray-300">
                        {booking.event_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {booking.package ? booking.package.name : "-"}
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-medium">
                          ₹{booking.total_amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₹{booking.paid_amount.toLocaleString()} paid
                        </p>
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
                          onClick={() => handleDeleteBooking(booking.id)}
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
            <DialogTitle className="text-black">
              Booking Details - {selectedBooking?.booking_id}
            </DialogTitle>
          </DialogHeader>

          {selectedBooking &&
            (() => {
              const balance =
                selectedBooking.total_amount - selectedBooking.paid_amount;
              return (
                <div className="space-y-6">
                  {/* Client Info */}
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-black flex items-center gap-2">
                        <Users className="w-4 h-4" /> Client Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-black">
                        {selectedBooking.client?.name}
                      </p>
                      <p className="text-black flex items-center gap-1">
                        <Mail className="w-3 h-3" />{" "}
                        {selectedBooking.client?.email}
                      </p>
                      <p className="text-black flex items-center gap-1">
                        Phone: {selectedBooking.client?.phone ?? "N/A"}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Event Info */}
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-black flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Event Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Date:{" "}
                        {new Date(
                          selectedBooking.event_date
                        ).toLocaleDateString()}
                      </p>
                      <p>Type: {selectedBooking.event_type}</p>
                      <p>Location: {selectedBooking.event_location}</p>
                      {selectedBooking.guest_range && (
                        <p>Guest Range: {selectedBooking.guest_range}</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Payment Info */}
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-black flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" /> Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Total Amount: ₹
                        {selectedBooking.total_amount.toLocaleString()}
                      </p>
                      <p>
                        Paid: ₹{selectedBooking.paid_amount.toLocaleString()}
                      </p>
                      <p>Balance: ₹{balance.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">
              Edit Booking - {selectedBooking?.booking_id}
            </DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-6">
              {/* Client Info (Read-only) */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <Users className="w-4 h-4" /> Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={selectedBooking.client?.name || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={selectedBooking.client?.email || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={selectedBooking.client?.phone || ""}
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Event Info */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Event Date</Label>
                    <Input
                      type="date"
                      value={selectedBooking.event_date}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          event_date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Event Type</Label>
                    <Input
                      value={selectedBooking.event_type}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          event_type: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={selectedBooking.event_location || ""}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          event_location: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Guest Range</Label>
                    <Input
                      value={selectedBooking.guest_range || ""}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          guest_range: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Budget Range</Label>
                    <Input
                      value={selectedBooking.budget_range || ""}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          budget_range: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Package</Label>
                    <Input
                      value={selectedBooking.package?.name || ""}
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" /> Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Total Amount</Label>
                    <Input
                      type="number"
                      value={selectedBooking.total_amount}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          total_amount: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Paid Amount</Label>
                    <Input
                      type="number"
                      value={selectedBooking.paid_amount}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          paid_amount: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Status Update */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={selectedBooking.status}
                    onValueChange={(value) =>
                      setSelectedBooking({ ...selectedBooking, status: value })
                    }
                  >
                    <SelectTrigger className="w-40 border-gray-300 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  className="bg-black text-white hover:bg-gray-800"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
