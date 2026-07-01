function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(angka || 0);
}

function getBookings() {
    const stored = JSON.parse(localStorage.getItem('bookings')) || [];
    if (Array.isArray(stored) && stored.length > 0) {
        return stored;
    }

    const legacy = JSON.parse(localStorage.getItem('booking')) || [];
    return Array.isArray(legacy) ? legacy : [];
}

function renderTransactions() {
    const tbody = document.getElementById('tbody');
    const bookings = getBookings();

    if (!bookings.length) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Belum ada transaksi.</td></tr>';
        return;
    }

    tbody.innerHTML = bookings.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.nama || '-'}</td>
            <td>${item.email || '-'}</td>
            <td>${item.telepon || '-'}</td>
            <td>${item.destinasi || '-'}</td>
            <td>${item.tiket || 0}</td>
            <td>${formatRupiah(item.totalHarga || item.hargaPerTiket || 0)}</td>
            <td>${item.tanggal || '-'}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderTransactions);