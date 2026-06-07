import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestHost = () => {
  const [facilities, setFacilities] = useState([]);
  const [facilityRequests, setFacilityRequests] = useState([]);

  const [loadingFacilities, setLoadingFacilities] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/facilities'
      );

      setFacilities(response.data);
    } catch (error) {
      console.error('Gagal mengambil data fasilitas:', error);
    } finally {
      setLoadingFacilities(false);
    }
  };

  const fetchFacilityRequests = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/facility-requests'
      );

      setFacilityRequests(response.data);
    } catch (error) {
      console.error('Gagal mengambil data request fasilitas:', error);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
    fetchFacilityRequests();
  }, []);

  return (
    <div className="animate-fade-in">

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Fasilitas
      </h1>

      {/* Tabel fasilitas */}

      <h2 className="text-xl font-medium mb-4">
        Fasilitas Stream
      </h2>

      <div className="w-full border bg-white shadow-sm">

        <div className="grid grid-cols-5 bg-[#fffef0] text-black font-semibold px-6 py-4 border-b">
          <div>Nama Fasilitas</div>
          <div>Tipe</div>
          <div>Kuantitas</div>
          <div>Jumlah Tersedia</div>
          <div>Status</div>
        </div>

        <div
          className={
            facilities.length > 5
              ? 'max-h-[300px] overflow-y-auto'
              : ''
          }
        >
          {loadingFacilities ? (
            <div className="p-6 text-center">
              Loading...
            </div>
          ) : facilities.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Tidak ada fasilitas
            </div>
          ) : (
            facilities.map((facility) => (
              <div
                key={facility.id}
                className="grid grid-cols-5 items-center px-6 py-4 border-b hover:bg-gray-50"
              >
                <div>{facility.facility_name}</div>

                <div>{facility.facility_type}</div>

                <div>{facility.quantity}</div>

                <div>{facility.available_quantity}</div>

                <div>
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      facility.status === 'Tersedia'
                        ? 'bg-green-100 text-green-700'
                        : facility.status === 'Maintenance'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {facility.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Tabel peminjaman */}
      <h2 className="text-xl font-medium mb-4 mt-8">
        Fasilitas yang Dipinjam
      </h2>

      <div className="w-full border bg-white shadow-sm">

        <div className="grid grid-cols-5 bg-[#fffef0] text-black font-semibold px-6 py-4 border-b">
          <div>Fasilitas</div>
          <div>Jumlah</div>
          <div>Tanggal Pinjam</div>
          <div>Tanggal Kembali</div>
          <div>Status</div>
        </div>

        <div
          className={
            facilityRequests.length > 5
              ? 'max-h-[300px] overflow-y-auto'
              : ''
          }
        >
          {loadingRequests ? (
            <div className="p-6 text-center">
              Loading...
            </div>
          ) : facilityRequests.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Tidak ada fasilitas yang dipinjam
            </div>
          ) : (
            facilityRequests.map((request) => (
              <div
                key={request.id}
                className="grid grid-cols-5 items-center px-6 py-4 border-b hover:bg-gray-50"
              >
                <div>
                  {request.facility_name ||
                    request.facility?.facility_name}
                </div>

                <div>{request.quantity}</div>

                <div>{request.borrow_date}</div>

                <div>{request.return_date}</div>

                <div>
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      request.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : request.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};

export default RequestHost;