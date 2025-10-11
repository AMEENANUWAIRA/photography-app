import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import axios from "axios";
import {
  Package,
  Plus,
  Star,
  TrendingUp,
  IndianRupee,
  Edit,
  Eye,
  Copy,
  Trash2,
} from "lucide-react";
import { Badge } from "../ui/badge";

export interface PackageType {
  id: string;
  name: string;
  description: string;
  budgetRange: string[];
  basePrice: number;
  albumPrice: number;
  photographerPrice: number;
  cinematographerPrice: number;
  highlightVideoPrice: number;
  fullVideoPrice: number;
  reelPrice: number;
  extraHourlyRate: number;
  isActive: boolean;
  totalBookings: number;
  revenue: number;
  popularity: number;
  features: string[];
}

interface PackageResponse {
  id: string;
  name: string;
  description: string;
  budget_range?: string[];
  base_price?: number;
  album_price?: number;
  photographer_price?: number;
  cinematographer_price?: number;
  highlight_video_price?: number;
  full_video_price?: number;
  reel_price?: number;
  extra_hour_price?: number;
  status?: string;
  bookings_count?: number;
  total_revenue?: number;
  popularity_percent?: number;
  key_features?: string[];
}

export function PackageManagement() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(
    null
  );

  const [newPackageData, setNewPackageData] = useState({
    name: "",
    description: "",
    basePrice: 0,
    extraHourlyRate: 0,
  });

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewingPackage, setViewingPackage] = useState<PackageType | null>(
    null
  );

  const handleViewClick = (pkg: PackageType) => {
    setViewingPackage(pkg);
    setIsViewDialogOpen(true);
  };

  // Fetch packages on mount
  useEffect(() => {
    axios
      .get<PackageResponse[]>("http://127.0.0.1:8000/api/admin/packages/")
      .then((res) => {
        const formatted = res.data.map((pkg: any) => ({
          id: pkg.id || pkg.pk || "",
          name: pkg.name,
          description: pkg.description,
          budgetRange: Array.isArray(pkg.budget_range) ? pkg.budget_range : [],
          basePrice: pkg.base_price || 0,
          albumPrice: pkg.album_price || 0,
          photographerPrice: pkg.photographer_price || 0,
          cinematographerPrice: pkg.cinematographer_price || 0,
          highlightVideoPrice: pkg.highlight_video_price || 0,
          fullVideoPrice: pkg.full_video_price || 0,
          reelPrice: pkg.reel_price || 0,
          extraHourlyRate: pkg.extra_hour_price || 0,
          isActive: pkg.status === "Active",
          totalBookings: pkg.bookings_count || 0,
          revenue: pkg.total_revenue || 0,
          popularity: pkg.popularity_percent || 0,
          features: Array.isArray(pkg.key_features) ? pkg.key_features : [],
        }));
        setPackages(formatted);
      })
      .catch(console.error);
  }, []);

  // Add Package
  const handleAddPackageSubmit = () => {
    const payload = {
      name: newPackageData.name,
      description: newPackageData.description,
      base_price: newPackageData.basePrice,
      extra_hour_price: newPackageData.extraHourlyRate,
      album_price: 0,
      photographer_price: 0,
      cinematographer_price: 0,
      budget_range: [],
      key_features: [],
    };

    axios
      .post<PackageResponse>(
        "http://127.0.0.1:8000/api/admin/packages/create/",
        payload
      )
      .then((res) => {
        const data = res.data;
        const newPkg: PackageType = {
          id: data.id,
          name: data.name,
          description: data.description,
          budgetRange: Array.isArray(data.budget_range)
            ? data.budget_range
            : [],
          basePrice: data.base_price || 0,
          albumPrice: data.album_price || 0,
          photographerPrice: data.photographer_price || 0,
          cinematographerPrice: data.cinematographer_price || 0,
          highlightVideoPrice: data.highlight_video_price || 0,
          fullVideoPrice: data.full_video_price || 0,
          reelPrice: data.reel_price || 0,
          extraHourlyRate: data.extra_hour_price || 0,
          isActive: data.status === "Active",
          totalBookings: data.bookings_count || 0,
          revenue: data.total_revenue || 0,
          popularity: data.popularity_percent || 0,
          features: Array.isArray(data.key_features) ? data.key_features : [],
        };
        setPackages((prev) => [...prev, newPkg]);
        setIsAddDialogOpen(false);
      })
      .catch(console.error);
  };

  const handleEditClick = (pkg: PackageType) => {
    setEditingPackage(pkg);
    setIsEditDialogOpen(true);
  };

  const handleCopyPackage = (pkg: PackageType) => {
    const text = `
  Package: ${pkg.name}
  Description: ${pkg.description}
  Base Price: ₹${pkg.basePrice}
  Extra Hour Rate: ₹${pkg.extraHourlyRate}
  Album Price: ₹${pkg.albumPrice}
  Photographer Price: ₹${pkg.photographerPrice}
  Cinematographer Price: ₹${pkg.cinematographerPrice}
  Budget Range: ${pkg.budgetRange.join(", ")}
  Key Features: ${pkg.features.join(", ")}
    `;
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Package details copied to clipboard!"))
      .catch(() => alert("Failed to copy!"));
  };

  const handleSaveEdit = () => {
    if (!editingPackage) return;

    const payload = {
      name: editingPackage.name,
      description: editingPackage.description,
      base_price: editingPackage.basePrice,
      album_price: editingPackage.albumPrice,
      photographer_price: editingPackage.photographerPrice,
      cinematographer_price: editingPackage.cinematographerPrice,
      extra_hour_price: editingPackage.extraHourlyRate,
      budget_range: editingPackage.budgetRange,
      key_features: editingPackage.features,
      status: editingPackage.isActive ? "Active" : "Inactive",
    };

    axios
      .put(
        `http://127.0.0.1:8000/api/admin/packages/${editingPackage.id}/update/`,
        payload
      )
      .then(() => {
        setPackages((prev) =>
          prev.map((p) => (p.id === editingPackage.id ? editingPackage : p))
        );
        setIsEditDialogOpen(false);
      })
      .catch(console.error);
  };

  const handleDeletePackage = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    axios
      .delete(`http://127.0.0.1:8000/api/admin/packages/${id}/delete/`)
      .then(() => setPackages((prev) => prev.filter((p) => p.id !== id)))
      .catch(console.error);
  };

  const handleAddPackage = () => setIsAddDialogOpen(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black">Package Management</h2>
          <p className="text-gray-600">
            Manage photography and videography packages
          </p>
        </div>
        <Button
          onClick={handleAddPackage}
          className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Package
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-blue-600 font-medium">
                Total Packages
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {packages.length}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-green-600 font-medium">
                Active Packages
              </p>
              <p className="text-2xl font-bold text-green-900">
                {packages.filter((p) => p.isActive).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-purple-600 font-medium">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-purple-900">
                {packages.reduce((sum, p) => sum + (p.totalBookings || 0), 0)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-orange-600 font-medium">
                Total Revenue
              </p>
              <p className="text-2xl font-bold text-orange-900">
                ₹
                {(
                  packages.reduce((sum, p) => sum + (p.revenue || 0), 0) /
                  1000000
                ).toFixed(1)}
                M
              </p>
            </div>
            <IndianRupee className="w-8 h-8 text-orange-600" />
          </CardContent>
        </Card>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="p-5 space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {pkg.name}
                    </h3>
                    {pkg.totalBookings > 50 && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs flex items-center gap-1">
                        <Star className="w-3 h-3" /> Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {pkg.description}
                  </p>
                </div>
                <Badge
                  className={
                    pkg.isActive
                      ? "bg-green-100 text-green-800 border-green-200 text-xs"
                      : "bg-red-100 text-red-800 border-red-200 text-xs"
                  }
                >
                  {pkg.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Base Price</span>
                  <span className="text-lg font-bold text-black">
                    ₹{pkg.basePrice.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>Album: ₹{pkg.albumPrice.toLocaleString()}</div>
                  <div>Extra Hour: ₹{pkg.extraHourlyRate.toLocaleString()}</div>
                  <div>
                    Photographer: ₹{pkg.photographerPrice.toLocaleString()}
                  </div>
                  <div>
                    Cinematographer: ₹
                    {pkg.cinematographerPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Budget Range */}
              {Array.isArray(pkg.budgetRange) && pkg.budgetRange.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {pkg.budgetRange.map((range, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="border-gray-300 text-xs"
                    >
                      {range}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Bookings</p>
                  <p className="text-lg font-bold text-black">
                    {pkg.totalBookings}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-lg font-bold text-black">
                    ₹{(pkg.revenue / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>

              {/* Popularity */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Popularity</span>
                  <span
                    className={`text-sm font-medium ${
                      pkg.popularity > 30
                        ? "text-green-600"
                        : pkg.popularity > 15
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
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

              {/* Key Features */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Key Features</p>
                <div className="space-y-1">
                  {Array.isArray(pkg.features) &&
                    pkg.features.slice(0, 3).map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-gray-600"
                      >
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        {f}
                      </div>
                    ))}
                  {pkg.features.length > 3 && (
                    <p className="text-xs text-gray-500 italic">
                      +{pkg.features.length - 3} more features
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(pkg)}
                  className="flex-1 border-gray-300 hover:bg-gray-100"
                >
                  <Edit className="w-3 h-3 mr-2" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-100"
                  onClick={() => handleViewClick(pkg)}
                >
                  <Eye className="w-3 h-3" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-100"
                  onClick={() => handleCopyPackage(pkg)}
                >
                  <Copy className="w-3 h-3" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 hover:bg-red-50 text-red-600"
                  onClick={() => handleDeletePackage(pkg.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Package Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-black">Add New Package</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="newPackageName">Package Name</Label>
              <Input
                id="newPackageName"
                placeholder="Enter package name"
                value={newPackageData.name}
                onChange={(e) =>
                  setNewPackageData({ ...newPackageData, name: e.target.value })
                }
                className="border-gray-300 bg-white"
              />
            </div>
            <div>
              <Label htmlFor="newPackageDescription">Description</Label>
              <Textarea
                id="newPackageDescription"
                placeholder="Enter package description"
                value={newPackageData.description}
                onChange={(e) =>
                  setNewPackageData({
                    ...newPackageData,
                    description: e.target.value,
                  })
                }
                className="border-gray-300 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newBasePrice">Base Price (₹)</Label>
                <Input
                  id="newBasePrice"
                  type="number"
                  value={newPackageData.basePrice}
                  onChange={(e) =>
                    setNewPackageData({
                      ...newPackageData,
                      basePrice: Number(e.target.value),
                    })
                  }
                  className="border-gray-300 bg-white"
                />
              </div>
              <div>
                <Label htmlFor="newExtraHourlyRate">Extra Hour Rate (₹)</Label>
                <Input
                  id="newExtraHourlyRate"
                  type="number"
                  value={newPackageData.extraHourlyRate}
                  onChange={(e) =>
                    setNewPackageData({
                      ...newPackageData,
                      extraHourlyRate: Number(e.target.value),
                    })
                  }
                  className="border-gray-300 bg-white"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black"
                onClick={handleAddPackageSubmit}
              >
                Add Package
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Package Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">
              Edit Package - {editingPackage?.name}
            </DialogTitle>
          </DialogHeader>

          {editingPackage && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="editPackageName">Package Name</Label>
                      <Input
                        id="editPackageName"
                        value={editingPackage.name}
                        onChange={(e) =>
                          setEditingPackage({
                            ...editingPackage,
                            name: e.target.value,
                          })
                        }
                        className="border-gray-300 bg-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editPackageId">Package ID</Label>
                      <Input
                        id="editPackageId"
                        value={editingPackage.id}
                        disabled
                        className="border-gray-300 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="editPackageDescription">Description</Label>
                    <Textarea
                      id="editPackageDescription"
                      value={editingPackage.description}
                      onChange={(e) =>
                        setEditingPackage({
                          ...editingPackage,
                          description: e.target.value,
                        })
                      }
                      className="border-gray-300 bg-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editBasePrice">Base Price (₹)</Label>
                    <Input
                      id="editBasePrice"
                      type="number"
                      value={editingPackage.basePrice}
                      onChange={(e) =>
                        setEditingPackage({
                          ...editingPackage,
                          basePrice: Number(e.target.value),
                        })
                      }
                      className="border-gray-300 bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editAlbumPrice">Album Price (₹)</Label>
                    <Input
                      id="editAlbumPrice"
                      type="number"
                      value={editingPackage.albumPrice}
                      onChange={(e) =>
                        setEditingPackage({
                          ...editingPackage,
                          albumPrice: Number(e.target.value),
                        })
                      }
                      className="border-gray-300 bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPhotographerPrice">
                      Photographer Price (₹)
                    </Label>
                    <Input
                      id="editPhotographerPrice"
                      type="number"
                      value={editingPackage.photographerPrice}
                      onChange={(e) =>
                        setEditingPackage({
                          ...editingPackage,
                          photographerPrice: Number(e.target.value),
                        })
                      }
                      className="border-gray-300 bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editCinematographerPrice">
                      Cinematographer Price (₹)
                    </Label>
                    <Input
                      id="editCinematographerPrice"
                      type="number"
                      value={editingPackage.cinematographerPrice}
                      onChange={(e) =>
                        setEditingPackage({
                          ...editingPackage,
                          cinematographerPrice: Number(e.target.value),
                        })
                      }
                      className="border-gray-300 bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="editExtraHourlyRate">
                      Extra Hour Rate (₹)
                    </Label>
                    <Input
                      id="editExtraHourlyRate"
                      type="number"
                      value={editingPackage.extraHourlyRate}
                      onChange={(e) =>
                        setEditingPackage({
                          ...editingPackage,
                          extraHourlyRate: Number(e.target.value),
                        })
                      }
                      className="border-gray-300 bg-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Budget Range */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">
                    Budget Range
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={editingPackage.budgetRange.join(", ")}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        budgetRange: e.target.value
                          .split(",")
                          .map((v) => v.trim()),
                      })
                    }
                    placeholder="Enter comma-separated budget ranges"
                    className="border-gray-300 bg-white"
                  />
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-black">
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={editingPackage.features.join("\n")}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        features: e.target.value.split("\n"), // don't trim
                      })
                    }
                    placeholder="Enter one feature per line"
                    className="border-gray-300 bg-white"
                  />
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-700 hover:to-black"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Package Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Package Details - {viewingPackage?.name}</DialogTitle>
          </DialogHeader>
          {viewingPackage && (
            <div className="space-y-4">
              <p>
                <strong>Description:</strong> {viewingPackage.description}
              </p>
              <p>
                <strong>Base Price:</strong> ₹{viewingPackage.basePrice}
              </p>
              <p>
                <strong>Album Price:</strong> ₹{viewingPackage.albumPrice}
              </p>
              <p>
                <strong>Extra Hour Rate:</strong> ₹
                {viewingPackage.extraHourlyRate}
              </p>
              <p>
                <strong>Key Features:</strong>{" "}
                {viewingPackage.features.join(", ")}
              </p>
              <p>
                <strong>Budget Range:</strong>{" "}
                {viewingPackage.budgetRange.join(", ")}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
