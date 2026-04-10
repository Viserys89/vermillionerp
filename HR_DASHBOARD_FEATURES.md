# HR Dashboard - Fitur & Panduan

## Login Credentials
- **Email**: `hr`
- **Password**: `123`

## Fitur Utama

### 1. Dashboard HR (Main)
- **Statistik Ringkas**: Total karyawan, aktif, tidak aktif, cuti
- **Tabel Data Karyawan**: Daftar lengkap semua karyawan dengan status real-time
- **Search & Filter**: 
  - Cari berdasarkan nama atau email
  - Filter status (Aktif, Tidak Aktif, Cuti)
  - Filter posisi (Host, Manager, Editor, Admin)

### 2. Manajemen Data Karyawan
**Fitur CRUD:**
- **Tambah Karyawan**: Tambahkan karyawan baru dengan form lengkap
- **Edit Karyawan**: Ubah data karyawan yang sudah ada
- **Hapus Karyawan**: Hapus data dengan konfirmasi

**Data yang Disimpan:**
- Nama lengkap
- Email
- Posisi
- Status (Aktif/Tidak Aktif/Cuti)
- Durasi Kontrak (1-24 bulan)
- Nomor Telepon

### 3. Import/Export Data
- **Import Excel**: Upload file CSV untuk batch add karyawan
  - Format CSV: `ID,Nama,Email,Posisi,Status,Kontrak,Telepon`
- **Export CSV**: Download semua data karyawan dalam format CSV

### 4. Pembuatan Akun Karyawan
- **Buat Akun Login**: Setiap karyawan mendapat akun terpisah
- **Email Login**: Email unik untuk akses sistem
- **Password**: Password yang aman (dibuat oleh HR)
- **Pembagian Akun**: Bagikan akun ke karyawan untuk login

### 5. Pengaduan Karyawan
- **Kelola Pengaduan**: Lihat semua pengaduan dari karyawan
- **Status Tracking**: Pending/Resolved
- **Filter**: Lihat pengaduan berdasarkan status

### 6. Izin & Cuti
- **Approve/Reject**: Setujui atau tolak permintaan izin/cuti
- **Tracking**: Monitor semua request izin dan cuti
- **Detail**: Alasan, tanggal, status karyawan

### 7. Laporan & Analitik
- **Generate Reports**: Buat laporan kehadiran, pengaduan, cuti
- **Export Data**: Ekspor dalam berbagai format
- **Dashboard Analytics**: Analisis data pengaduan dan performa

## Alur Kerja Standar

### A. Onboarding Karyawan Baru
1. Klik "Tambah Karyawan" atau import dari Excel
2. Isi data lengkap karyawan
3. Set status kontrak "Aktif" dan durasi
4. Klik tombol "Buat Akun"
5. Catat email dan password, bagikan ke karyawan
6. Karyawan bisa login dengan akun tersebut

### B. Mengelola Pengaduan
1. Buka menu "Pengaduan"
2. Lihat daftar pengaduan masuk
3. Filter berdasarkan status (Pending/Resolved)
4. Klik untuk detail dan tindak lanjut

### C. Persetujuan Izin/Cuti
1. Buka menu "Izin & Cuti"
2. Lihat semua request dari karyawan
3. Untuk status Pending:
   - Klik ✓ untuk approve
   - Klik ✗ untuk reject

### D. Membuat Laporan
1. Buka menu "Laporan"
2. Pilih tipe laporan yang diinginkan
3. Klik tombol untuk generate
4. Download file hasil laporan

## Desain & UX
- **Glassmorphism**: Efek kaca dengan backdrop blur untuk estetika modern
- **Responsive**: Fully responsive untuk mobile, tablet, desktop
- **Color Palette**: Orange (#FF8000) sebagai primary, white dengan transparency
- **Icons**: Menggunakan Boxicons untuk konsistensi visual
- **Loading**: Smooth animations dan transitions

## Catatan Teknis
- **Framework**: React 18 + React Router v7
- **Styling**: Tailwind CSS v4
- **Icons**: @boxicons/react v1.0.3
- **State Management**: React Hooks (useState)
- **Export Format**: CSV (dapat dibuka di Excel)
- **Import Format**: CSV dengan header

## Fitur Bonus
- Auto-ID untuk karyawan baru
- Real-time filtering
- Validasi form input
- Konfirmasi sebelum delete
- Success notifications
- Error handling

## Rencana Pengembangan Lanjutan
- Database integration (currently using React state)
- Email sending untuk akun credentials
- Advanced analytics dashboard
- Attendance tracking
- Performance rating system
- Document management
