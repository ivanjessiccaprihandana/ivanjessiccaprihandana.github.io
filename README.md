# Portofolio Ivan Dhany Jessicca Prihandana

Website portofolio statis Ivan Dhany Jessicca Prihandana sebagai fresh graduate Informatika dengan fokus **Web Development end-to-end** dan **Cloud Computing**. Dibuat hanya dengan HTML, CSS, dan JavaScript sehingga dapat langsung dipublikasikan gratis melalui GitHub Pages tanpa proses build, backend, database, atau API key.

## Menjalankan di komputer

Cara paling sederhana: buka `index.html` langsung di browser.

Untuk hasil yang sama dengan server web, jalankan salah satu perintah berikut dari folder proyek:

```bash
# Jika Python tersedia
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Struktur file

```text
.
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── favicon.svg
│   ├── profile-placeholder.svg
│   ├── project-cell.png
│   ├── project-organisync.png
│   └── project-attendance.png
├── README.md
└── .nojekyll
```

Semua aset menggunakan relative path sehingga tetap bekerja ketika diterbitkan melalui GitHub Pages.

## Data yang masih perlu dilengkapi

1. **Foto profil asli** — website masih memakai `assets/profile-placeholder.svg`.
2. **Repository OrganiSync** — repository backend/tim yang benar belum dapat diverifikasi dari repository publik akun GitHub, sehingga belum ditautkan.
3. **URL demo** — belum dicantumkan karena tidak ada URL demo yang terverifikasi.

Deskripsi proyek dibuat konservatif dari informasi yang diberikan dan sumber publik. Repository berikut sudah diverifikasi tersedia:

- TraceBack: <https://github.com/ivanjessiccaprihandana/TraceBack>
- CELL English Course & Bimbel: <https://github.com/ivanjessiccaprihandana/cell-smart-registration>
- Presensi SDN 19 Kepahiang: <https://github.com/ivanjessiccaprihandana/absensi-sdn-19-kepahiang>

## Mengganti placeholder

### Mengganti resume

Ganti file `assets/Ivan-Dhany-Resume.pdf` dengan versi PDF terbaru menggunakan nama file yang sama. Tautan unduhan dan pratinjau di website akan tetap berfungsi tanpa perlu mengubah `index.html`.

### Mengganti foto profil

1. Siapkan foto berbentuk persegi, disarankan minimal 600 × 600 piksel.
2. Simpan sebagai `assets/profile.webp`.
3. Di `index.html`, ubah `src="assets/profile-placeholder.svg"` menjadi `src="assets/profile.webp"`.
4. Ubah teks `alt` agar sesuai, misalnya `Foto Ivan Dhany Jessicca Prihandana`.

### Screenshot proyek

Website sudah memakai screenshot yang diambil langsung dari aplikasi yang dijalankan dari repository publik. Jika ingin menggantinya dengan screenshot terbaru, simpan gambar baru lalu ubah `src` pada masing-masing gambar di `index.html`:

- `assets/traceback-login.png`
- `assets/traceback-dashboard.png`
- `assets/project-cell.png`
- `assets/project-organisync.png`
- `assets/project-attendance.png`

Ukuran yang disarankan adalah rasio 4:3, misalnya 1200 × 900 piksel. Perbarui juga teks `alt` agar menjelaskan tampilan screenshot.

### Menambahkan repository atau demo

Salin pola tautan Repository yang sudah ada di `index.html`. Gunakan `target="_blank"` dan `rel="noopener noreferrer"` untuk tautan eksternal. Hanya tambahkan URL yang benar-benar aktif.

## Publikasi ke GitHub Pages melalui browser

Panduan ini ditujukan untuk repository `ivanjessiccaprihandana.github.io`.

1. Masuk ke <https://github.com> dengan akun `ivanjessiccaprihandana`.
2. Klik foto profil di kanan atas, lalu pilih **Your repositories**.
3. Buka repository **ivanjessiccaprihandana.github.io**. Jika belum ada, klik **New**, isi nama repository tepat `ivanjessiccaprihandana.github.io`, pilih **Public**, lalu klik **Create repository**.
4. Pada halaman repository, klik **Add file → Upload files**.
5. Seret semua isi folder proyek ke area upload. Pastikan `index.html`, `style.css`, `script.js`, `README.md`, dan `.nojekyll` berada di root repository, sedangkan gambar tetap berada di folder `assets/`.
6. Catatan: file `.nojekyll` bisa tersembunyi di File Explorer. Aktifkan **View → Show → Hidden items** agar file terlihat sebelum diunggah.
7. Isi pesan commit, misalnya `Publikasikan website portofolio`, lalu klik **Commit changes**.
8. Buka tab **Settings** pada repository.
9. Di sidebar, pilih **Pages**.
10. Pada bagian **Build and deployment**, pilih **Source: Deploy from a branch**.
11. Pada **Branch**, pilih **main** dan folder **/ (root)**, lalu klik **Save**.
12. Tunggu beberapa menit. GitHub akan menampilkan tautan website di halaman Pages. Untuk repository ini, alamatnya akan berbentuk `https://ivanjessiccaprihandana.github.io/`.

Jika perubahan belum terlihat, tunggu proses deployment selesai, lalu lakukan hard refresh pada browser (`Ctrl + F5`).

## Pemeriksaan sebelum publikasi

- Buka halaman pada lebar desktop dan mobile.
- Uji tombol menu mobile dan tekan `Escape` untuk menutupnya.
- Uji navigasi keyboard menggunakan `Tab` dan `Enter`.
- Klik semua tautan GitHub, LinkedIn, email, dan navigasi internal.
- Pastikan tidak ada scrollbar horizontal.
- Setelah CV atau screenshot diganti, periksa kembali penamaan dan kapitalisasi file karena GitHub Pages membedakan huruf besar dan kecil.

## Teknologi

- Semantic HTML5
- CSS responsif tanpa framework
- JavaScript tanpa library
- SVG lokal untuk favicon dan placeholder
- GitHub Pages

