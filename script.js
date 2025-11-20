// ============= VARIABEL DAN FUNGSI VALIDASI =============

// Objek untuk menyimpan aturan validasi
const aturanValidasi = {
    nama: {
        minLength: 3,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        pesan: 'Nama harus 3-50 karakter dan hanya huruf'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        pesan: 'Email tidak valid'
    },
    telepon: {
        minLength: 10,
        maxLength: 15,
        pattern: /^[0-9\+\-\s]+$/,
        pesan: 'Nomor telepon harus 10-15 digit angka'
    },
    pesan: {
        minLength: 5,
        maxLength: 500,
        pesan: 'Pesan harus 5-500 karakter'
    }
};

// Fungsi untuk validasi field individual
function validasiField(namaField, nilai) {
    const aturan = aturanValidasi[namaField];
    
    if (!aturan) return { valid: true };

    // Validasi panjang minimum
    if (aturan.minLength && nilai.length < aturan.minLength) {
        return { valid: false, pesan: aturan.pesan };
    }

    // Validasi panjang maksimum
    if (aturan.maxLength && nilai.length > aturan.maxLength) {
        return { valid: false, pesan: aturan.pesan };
    }

    // Validasi pattern (regex)
    if (aturan.pattern && !aturan.pattern.test(nilai)) {
        return { valid: false, pesan: aturan.pesan };
    }

    return { valid: true };
}

// Fungsi untuk menampilkan error
function tampilkanError(namaField, pesan) {
    const inputElement = document.getElementById(namaField);
    const errorElement = document.getElementById(namaField + 'Error');
    
    inputElement.style.borderColor = '#d32f2f';
    errorElement.textContent = pesan;
    errorElement.classList.add('show');
}

// Fungsi untuk menghapus error
function hapusError(namaField) {
    const inputElement = document.getElementById(namaField);
    const errorElement = document.getElementById(namaField + 'Error');
    
    inputElement.style.borderColor = '#ddd';
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Fungsi untuk validasi semua field
function validasiSemuaField() {
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const telepon = document.getElementById('telepon').value.trim();
    const pesan = document.getElementById('pesan').value.trim();

    let semuaValid = true;

    // Validasi nama
    if (nama === '') {
        tampilkanError('nama', 'Nama tidak boleh kosong');
        semuaValid = false;
    } else {
        const validasiNama = validasiField('nama', nama);
        if (!validasiNama.valid) {
            tampilkanError('nama', validasiNama.pesan);
            semuaValid = false;
        } else {
            hapusError('nama');
        }
    }

    // Validasi email
    if (email === '') {
        tampilkanError('email', 'Email tidak boleh kosong');
        semuaValid = false;
    } else {
        const validasiEmail = validasiField('email', email);
        if (!validasiEmail.valid) {
            tampilkanError('email', validasiEmail.pesan);
            semuaValid = false;
        } else {
            hapusError('email');
        }
    }

    // Validasi telepon
    if (telepon === '') {
        tampilkanError('telepon', 'Nomor telepon tidak boleh kosong');
        semuaValid = false;
    } else {
        const validasiTelepon = validasiField('telepon', telepon);
        if (!validasiTelepon.valid) {
            tampilkanError('telepon', validasiTelepon.pesan);
            semuaValid = false;
        } else {
            hapusError('telepon');
        }
    }

    // Validasi pesan
    if (pesan === '') {
        tampilkanError('pesan', 'Pesan tidak boleh kosong');
        semuaValid = false;
    } else {
        const validasiPesan = validasiField('pesan', pesan);
        if (!validasiPesan.valid) {
            tampilkanError('pesan', validasiPesan.pesan);
            semuaValid = false;
        } else {
            hapusError('pesan');
        }
    }

    return semuaValid;
}

// ============= EVENT LISTENER =============

document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('contactForm');
    
    // Event submit form
    formElement.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form reload
        
        // Validasi semua field
        if (validasiSemuaField()) {
            // Jika semua valid, tampilkan pesan sukses
            const successMsg = document.getElementById('successMsg');
            successMsg.style.display = 'block';
            
            // Reset form
            formElement.reset();
            
            // Hapus pesan sukses setelah 3 detik
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
            
            // Log data untuk debugging (bisa dikirim ke server)
            console.log('Data yang dikirim:');
            console.log({
                nama: document.getElementById('nama').value,
                email: document.getElementById('email').value,
                telepon: document.getElementById('telepon').value,
                pesan: document.getElementById('pesan').value
            });
        }
    });

    // Event real-time validation saat user mengetik
    document.getElementById('nama').addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            const hasil = validasiField('nama', this.value.trim());
            if (!hasil.valid) {
                tampilkanError('nama', hasil.pesan);
            } else {
                hapusError('nama');
            }
        }
    });

    document.getElementById('email').addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            const hasil = validasiField('email', this.value.trim());
            if (!hasil.valid) {
                tampilkanError('email', hasil.pesan);
            } else {
                hapusError('email');
            }
        }
    });

    document.getElementById('telepon').addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            const hasil = validasiField('telepon', this.value.trim());
            if (!hasil.valid) {
                tampilkanError('telepon', hasil.pesan);
            } else {
                hapusError('telepon');
            }
        }
    });

    document.getElementById('pesan').addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            const hasil = validasiField('pesan', this.value.trim());
            if (!hasil.valid) {
                tampilkanError('pesan', hasil.pesan);
            } else {
                hapusError('pesan');
            }
        }
    });
});
