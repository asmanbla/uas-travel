const hargaDestinasi = {
    Bali: 1200000,
    'Raja Ampat': 2500000,
    Lombok: 1500000
};

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(angka);
}

const form = document.getElementById('bookingForm');
const destinasi = document.getElementById('destinasi');
const tiket = document.getElementById('tiket');
const tanggal = document.getElementById('tanggal');
const destInfo = document.getElementById('destInfo');
const destDisplay = document.getElementById('destDisplay');
const pricePerTicket = document.getElementById('pricePerTicket');
const qtyDisplay = document.getElementById('qtyDisplay');
const totalPrice = document.getElementById('totalPrice');

function updatePriceSummary() {
    const dest = destinasi.value;
    const qty = parseInt(tiket.value, 10) || 0;

    if (dest && hargaDestinasi[dest]) {
        const harga = hargaDestinasi[dest];
        const total = harga * qty;

        destDisplay.textContent = dest;
        pricePerTicket.textContent = formatRupiah(harga);
        qtyDisplay.textContent = qty;
        totalPrice.textContent = formatRupiah(total);
        destInfo.innerHTML = `<strong>${dest}</strong> • ${formatRupiah(harga)} / tiket`;
    } else {
        destDisplay.textContent = '—';
        pricePerTicket.textContent = 'Rp 0';
        qtyDisplay.textContent = qty || 0;
        totalPrice.textContent = 'Rp 0';
        destInfo.textContent = 'Pilih destinasi untuk melihat harga paket.';
    }
}

function validateForm() {
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const telepon = document.getElementById('telepon').value.trim();
    const dest = destinasi.value;
    const qty = parseInt(tiket.value, 10) || 0;
    const tgl = tanggal.value;
    const payment = document.querySelector('input[name="payment"]:checked');

    if (!nama) {
        Swal.fire('Oops!', 'Nama lengkap wajib diisi.', 'warning');
        return false;
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
        Swal.fire('Oops!', 'Masukkan email yang valid.', 'warning');
        return false;
    }
    if (!telepon || telepon.length < 8) {
        Swal.fire('Oops!', 'Nomor telepon minimal 8 digit.', 'warning');
        return false;
    }
    if (!dest) {
        Swal.fire('Oops!', 'Silakan pilih destinasi.', 'warning');
        return false;
    }
    if (qty < 1) {
        Swal.fire('Oops!', 'Jumlah tiket minimal 1.', 'warning');
        return false;
    }
    if (!tgl) {
        Swal.fire('Oops!', 'Pilih tanggal keberangkatan.', 'warning');
        return false;
    }
    if (!payment) {
        Swal.fire('Oops!', 'Pilih metode pembayaran.', 'warning');
        return false;
    }

    return true;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const telepon = document.getElementById('telepon').value.trim();
    const dest = destinasi.value;
    const qty = parseInt(tiket.value, 10);
    const tgl = tanggal.value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const harga = hargaDestinasi[dest];
    const total = harga * qty;

    const booking = {
        id: Date.now(),
        nama,
        email,
        telepon,
        destinasi: dest,
        tiket: qty,
        tanggal: tgl,
        hargaPerTiket: harga,
        totalHarga: total,
        paymentMethod: payment,
        status: 'Pending',
        createdAt: new Date().toISOString()
    };

    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    if (!Array.isArray(bookings)) {
        bookings = [];
    }

    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('booking', JSON.stringify(bookings));

    Swal.fire({
        icon: 'success',
        title: 'Booking Berhasil!',
        html: `
            <div style="text-align:left; font-size:14px;">
                <p><strong>Destinasi:</strong> ${dest}</p>
                <p><strong>Jumlah Tiket:</strong> ${qty}</p>
                <p><strong>Total Harga:</strong> ${formatRupiah(total)}</p>
                <p><strong>Metode Pembayaran:</strong> ${payment}</p>
                <p><strong>Status:</strong> <span style="color:#f59e0b;">Pending</span></p>
            </div>
        `,
        confirmButtonText: 'Lihat Transaksi',
        showCancelButton: true,
        cancelButtonText: 'Booking Lagi'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'transaction.html';
        } else {
            form.reset();
            tiket.value = 1;
            updatePriceSummary();
        }
    });
});

destinasi.addEventListener('change', updatePriceSummary);
tiket.addEventListener('input', updatePriceSummary);

document.addEventListener('DOMContentLoaded', function () {
    const today = new Date().toISOString().split('T')[0];
    tanggal.setAttribute('min', today);
    tiket.value = 1;
    updatePriceSummary();

    document.querySelectorAll('.payment-option').forEach((option) => {
        const radio = option.querySelector('input[type="radio"]');
        radio.addEventListener('change', function () {
            document.querySelectorAll('.payment-option').forEach((el) => {
                el.classList.remove('selected');
            });
            if (this.checked) {
                option.classList.add('selected');
            }
        });

        if (radio.checked) {
            option.classList.add('selected');
        }
    });
});

// JS untuk Metode Pembayaran 
const paymentRadios = document.querySelectorAll('input[name="payment"]');

const bankDetail = document.getElementById("bankDetail");
const qrisDetail = document.getElementById("qrisDetail");

paymentRadios.forEach(radio => {
    radio.addEventListener("change", function(){

        if(this.value === "Transfer Bank"){
            bankDetail.style.display = "block";
            qrisDetail.style.display = "none";
        }

        else if(this.value === "QRIS"){
            bankDetail.style.display = "none";
            qrisDetail.style.display = "block";
        }

        else{
            bankDetail.style.display = "none";
            qrisDetail.style.display = "none";
        }

    });
});