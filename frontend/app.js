const postForm = document.getElementById('postForm');
const ceritaList = document.getElementById('ceritaList');

// Fungsi untuk mendapatkan semua cerita
async function getCerita() {
  const response = await fetch('http://localhost:3000/api/cerita');
  const data = await response.json();
  ceritaList.innerHTML = '';
  data.forEach(cerita => {
    const div = document.createElement('div');
    div.classList.add('ceritaItem');
    div.innerHTML = `
      <h3>${cerita.judul}</h3>
      <p>${cerita.isi}</p>
      <p><strong>${cerita.pengarang}</strong></p>
      <div class="komentar">Komentar: <em>Belum ada komentar</em></div>
    `;
    ceritaList.appendChild(div);
  });
}

// Fungsi untuk menambahkan cerita baru
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const judul = document.getElementById('judul').value;
  const isi = document.getElementById('isi').value;
  const pengarang = document.getElementById('pengarang').value;

  const response = await fetch('http://localhost:3000/api/cerita', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ judul, isi, pengarang })
  });

  const result = await response.json();
  if (result.message) {
    alert('Cerita berhasil diposting');
    getCerita();
  }
});

// Panggil fungsi untuk menampilkan cerita
getCerita();
