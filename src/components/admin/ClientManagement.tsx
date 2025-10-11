import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Textarea } from "../ui/textarea";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  MapPin,
  IndianRupee,
  Phone,
  Mail,
  Users,
  User,
  Heart,
  History,
  Star,
} from "lucide-react";

// Set base URL for all Axios requests
axios.defaults.baseURL = "http://127.0.0.1:8000";

interface ClientType {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  location: string;
  status: string;
  homeAddress?: string;
  notes?: string;
  totalBookings?: number;
  totalSpent?: number;
  lastBooking?: string;
  favoritePackage?: string;
  bookingHistory?: any[];
  currentLocation?: string;
  joinedDate?: string;
}

export function ClientManagement() {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Form state for Add/Edit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    homeAddress: "",
    location: "",
    status: "Active",
    notes: "",
  });

  // Fetch clients
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get<ClientType[]>("/api/clients/");
      setClients(res.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Add client
  const handleAddClient = async () => {
    try {
      await axios.post("/api/clients/", formData);
      setIsAddDialogOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        location: "",
        status: "Active",
        homeAddress: "",
        notes: "",
      });
      fetchClients();
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  // Edit client
  const handleEditClient = (client: ClientType) => {
    setSelectedClient(client);
    setFormData({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      whatsapp: client.whatsapp || "",
      location: client.location || "",
      status: client.status || "Active",
      homeAddress: client.homeAddress || "",
      notes: client.notes || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateClient = async () => {
    if (!selectedClient) return;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      location: formData.location, // must match backend field
      status: formData.status,
      homeAddress: formData.homeAddress,
      notes: formData.notes,
    };

    try {
      await axios.put(`/api/clients/${selectedClient.id}/`, payload);
      setIsEditDialogOpen(false);
      setSelectedClient(null);
      fetchClients();
    } catch (error: any) {
      if (error.response)
        console.error("Error updating client:", error.response.data);
      else console.error(error);
    }
  };

  // Delete client
  const handleDeleteClient = async (clientId: string) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await axios.delete(`/api/clients/${clientId}/`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  // View client
  const handleViewClient = async (client: ClientType) => {
    try {
      const res = await axios.get<ClientType>(`/api/clients/${client.id}/`);
      setSelectedClient(res.data);
      setIsViewDialogOpen(true);
    } catch (error) {
      console.error("Error fetching client details:", error);
    }
  };

  // Filters
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    const matchesCity = cityFilter === "all" || client.location === cityFilter;
    return matchesSearch && matchesCity;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Active
          </Badge>
        );
      case "VIP":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            <Star className="w-3 h-3 mr-1" /> VIP
          </Badge>
        );
      case "Inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // JSX rendering remains mostly same
  return (
    <div className="space-y-6">
      {/* Header and stats cards */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Client Management</h2>
          <p className="text-gray-600">
            Manage client information and booking history
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Total Clients
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {clients.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Active Clients
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {
                    clients.filter(
                      (c) => c.status === "Active" || c.status === "VIP"
                    ).length
                  }
                </p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  VIP Clients
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {clients.filter((c) => c.status === "VIP").length}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">
                  Avg. Spent
                </p>
                <p className="text-2xl font-bold text-orange-900">
                  ₹
                  {Math.round(
                    clients.reduce(
                      (sum, c) => sum + Number(c.totalSpent ?? 0),
                      0
                    ) /
                      (clients.length || 1) /
                      1000
                  )}
                  K
                </p>
              </div>
              <IndianRupee className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white border-gray-200 shadow-elegant">
        <CardContent className="p-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 bg-white"
            />
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
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    <TableCell>{client.name}</TableCell>
                    <TableCell>
                      <p className="text-sm flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />{" "}
                        {client.email}
                      </p>
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />{" "}
                        {client.phone}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />{" "}
                        {client.location}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewClient(client)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClient(client)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteClient(client.id)}
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
            <DialogTitle className="text-black">
              Client Details - {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              {/* Client Info */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <User className="w-4 h-4" /> Personal Information
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
                      <Label className="text-sm text-gray-600">
                        Home Address
                      </Label>
                      <p className="text-black">{selectedClient.homeAddress}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">
                        Current Location
                      </Label>
                      <p className="text-black">
                        {selectedClient.currentLocation}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">
                        Member Since
                      </Label>
                      <p className="text-black">
                        {selectedClient.joinedDate
                          ? new Date(
                              selectedClient.joinedDate
                            ).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">
                        Favorite Package
                      </Label>
                      <p className="text-black">
                        {selectedClient.favoritePackage || "-"}
                      </p>
                    </div>
                  </div>
                  {selectedClient.notes && (
                    <div>
                      <Label className="text-sm text-gray-600">Notes</Label>
                      <p className="text-black bg-white p-3 rounded border border-gray-200">
                        {selectedClient.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-900">
                      {selectedClient.totalBookings}
                    </p>
                    <p className="text-sm text-blue-600">Total Bookings</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-900">
                      ₹{selectedClient.totalSpent?.toLocaleString() || 0}
                    </p>
                    <p className="text-sm text-green-600">Total Spent</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-900">
                      ₹
                      {Math.round(
                        (selectedClient.totalSpent || 0) /
                          Math.max(selectedClient.totalBookings || 0, 1)
                      ).toLocaleString()}
                    </p>
                    <p className="text-sm text-purple-600">Avg per Booking</p>
                  </CardContent>
                </Card>
              </div>

              {/* Booking History */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black flex items-center gap-2">
                    <History className="w-4 h-4" /> Booking History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedClient.bookingHistory &&
                  selectedClient.bookingHistory.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Package</TableHead>
                          <TableHead>Total Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedClient.bookingHistory.map((booking: any) => (
                          <TableRow key={booking.id}>
                            <TableCell>{booking.eventName}</TableCell>
                            <TableCell>
                              {new Date(booking.eventDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{booking.packageName}</TableCell>
                            <TableCell>
                              ₹{booking.totalAmount?.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-gray-500">No booking history found.</p>
                  )}
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
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Input
              name="whatsapp"
              placeholder="WhatsApp"
              value={formData.whatsapp}
              onChange={handleInputChange}
            />
            <Input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <Textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddClient}>Add Client</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-black">
              Edit Client - {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Input
              name="whatsapp"
              placeholder="WhatsApp"
              value={formData.whatsapp}
              onChange={handleInputChange}
            />
            <Input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <Select
              value={formData.status}
              onValueChange={(val) => handleSelectChange("status", val)}
            >
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateClient}>Update Client</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
