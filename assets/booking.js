document.getElementById('bookingForm')
.addEventListener('submit', function(e){

    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const telepon = document.getElementById('telepon').value;
    const destinasi = document.getElementById('destinasi').value;
    const tiket = document.getElementById('tiket').value;
    const tanggal = document.getElementById('tanggal').value;

    if(
        nama === '' ||
        email === '' ||
        telepon === '' ||
        destinasi === '' ||
        tiket === '' ||
        tanggal === ''
    ){

        Swal.fire({
            icon:'error',
            title:'Data Belum Lengkap',
            text:'Mohon isi semua data'
        });

        return;
    }

    let data =
    JSON.parse(localStorage.getItem('booking')) || [];

    data.push({
        nama,
        email,
        telepon,
        destinasi,
        tiket,
        tanggal
    });

    localStorage.setItem(
        'booking',
        JSON.stringify(data)
    );

    Swal.fire({
        icon:'success',
        title:'Booking Berhasil'
    }).then(()=>{
        window.location.href = 'transaction.html';
    });

});