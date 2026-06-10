import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, CheckCircle, Clock, XCircle, Send, X } from "lucide-react";

const API_URL = "http://localhost:8000/api";

const IzinHost = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const employeeId = user?.id;

  const [leaves, setLeaves] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  
  const [refreshKey, setRefreshKey] = useState(0);

  const [formData, setFormData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: ""
  });


  useEffect(() => {
    let isMounted = true;

    const loadLeaves = async () => {
      try {
        const response = await axios.get(`${API_URL}/leaves`);
        if (isMounted) {
          const myLeaves = response.data.filter(
            (item) => item.employee_id === employeeId
          );
          setLeaves(myLeaves);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (employeeId) {
      loadLeaves();
    }

    return () => {
      isMounted = false;
    };
  }, [employeeId, refreshKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/leaves`, {
        employee_id: employeeId,
        leave_type: formData.leave_type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        reason: formData.reason
      });

      setModalOpen(false);
      setSuccessOpen(true);

      setFormData({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: ""
      });

      setRefreshKey(old => old + 1);

    } catch (error) {
      console.error(error);
      alert("Gagal mengirim pengajuan");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Approved") {
      return (
        <span className="flex items-center gap-1 text-green-600 font-bold">
          <CheckCircle size={18} />
          Approved
        </span>
      );
    }

    if (status === "Rejected") {
      return (
        <span className="flex items-center gap-1 text-red-600 font-bold">
          <XCircle size={18} />
          Rejected
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1 text-yellow-600 font-bold">
        <Clock size={18} />
        Pending
      </span>
    );
  };
  return (
    <div className="space-y-8 animate-fade-in">

      {/* CARD */}
      <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">

        <h2 className="text-xl font-bold mb-4">
          Pengajuan Izin / Cuti
        </h2>

        <button
          onClick={() => setModalOpen(true)}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all flex justify-center items-center gap-2"
        >
          <Plus size={20} />
          Ajukan Izin
        </button>
      </div>

      {/* RIWAYAT */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold border-b-2 border-gray-800 inline-block pb-1">
          Riwayat Pengajuan
        </h3>

        <div className="flex flex-col gap-3">
          {leaves.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-500">
              Belum ada pengajuan izin
            </div>
          ) : (
            leaves.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-5 rounded-2xl bg-gradient-to-r from-[#fcf2ea] to-[#f6c8a5] shadow-sm"
              >
                <div>
                  <h4 className="font-bold">
                    {item.leave_type}
                  </h4>

                  <p className="text-sm text-gray-600">
                    {item.start_date} s/d {item.end_date}
                  </p>

                  <p className="text-xs text-gray-500">
                    {item.reason}
                  </p>
                </div>

                {getStatusBadge(item.status)}
              </div>
            ))
          )}
        </div>
      </section>

      {/* MODAL INPUT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="bg-white/80 backdrop-blur-2xl border border-white p-8 rounded-[30px] w-full max-w-md shadow-2xl">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">
                Pengajuan Izin / Cuti
              </h3>

              <X
                className="cursor-pointer"
                onClick={() => setModalOpen(false)}
              />
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <select
                required
                value={formData.leave_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leave_type: e.target.value
                  })
                }
                className="w-full p-3 rounded-xl border"
              >
                <option value="">
                  Pilih Jenis
                </option>

                <option value="Cuti">
                  Cuti
                </option>

                <option value="Izin">
                  Izin
                </option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Tanggal Mulai</label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        start_date: e.target.value
                      })
                    }
                    className="w-full p-3 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Tanggal Selesai</label>
                  <input
                    type="date"
                    required
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        end_date: e.target.value
                      })
                    }
                    className="w-full p-3 rounded-xl border"
                  />
                </div>
              </div>

              <textarea
                rows="4"
                required
                value={formData.reason}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reason: e.target.value
                  })
                }
                className="w-full p-3 rounded-xl border"
                placeholder="Masukkan alasan..."
              />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Kirim Pengajuan
              </button>

            </form>

          </div>
        </div>
      )}

      {/* SUCCESS */}
      {successOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="bg-white p-8 rounded-[30px] w-full max-w-sm text-center shadow-2xl">

            <CheckCircle
              size={80}
              className="mx-auto text-green-500 mb-4"
            />

            <h3 className="text-2xl font-bold mb-2">
              Pengajuan Berhasil!
            </h3>

            <p className="text-gray-500 mb-6">
              Pengajuan telah dikirim ke HR dan sedang menunggu persetujuan.
            </p>

            <button
              onClick={() => setSuccessOpen(false)}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold"
            >
              Tutup
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default IzinHost;