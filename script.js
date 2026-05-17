const MOCK_DONATORS = [
    { id: 1, name: "Andra Tzy", amount: "Rp 20.000", time: "2 Menit yang lalu", msg: "Semangat ngodingnya ngab.", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Sultan" },
    { id: 2, name: "Rizky Santuy", amount: "Rp 10.000", time: "1 Jam yang lalu", msg: "sgini aja dah gosah banyak¹ 😹.", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Rizky" },
    { id: 3, name: "Bagas Drip", amount: "Rp 7.000", time: "3 Jam yang lalu", msg: "Sedikit aja ya bang, belum gajian mwhehe.", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Bagas" },
    { id: 4, name: "Arif galau", amount: "Rp 2.000", time: "Hari ini, 14:20", msg: "nih buat kopi dapat 2 wkwk.", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Senja" },
    { id: 5, name: "Dimas Tampan", amount: "Rp 100", time: "Kemarin, 20:00", msg: "Test doang bang nyobain fitur 🗿.", avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=Dimas" },
];

setTimeout(() => {
    const p = document.getElementById('preloader');
    if (p) { 
        p.style.opacity = '0'; 
        setTimeout(() => {
            p.style.display = 'none';
        }, 500); 
    }
}, 2500);

document.addEventListener('contextmenu', event => {
    const t = event.target;
    if (t.tagName === 'IMG' || t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') {
        return;
    }
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
    try { 
        initWebsite(); 
        initLeaderboard();
    } 
    catch (e) { 
        document.getElementById('preloader').style.display = 'none'; 
    }
});

function initWebsite() {
    const bg = document.getElementById('body-bg');
    if (CONFIG.backgroundGambar && CONFIG.backgroundGambar.trim() !== "") {
        bg.style.backgroundImage = `url('${CONFIG.backgroundGambar}')`;
        bg.style.backgroundSize = 'cover';
    }
    
    document.getElementById('nav-logo').innerText = CONFIG.namaWebsite;
    document.getElementById('hero-title').innerHTML = CONFIG.namaPemilik;
    document.getElementById('profile-img').src = CONFIG.profilGambar;
    document.getElementById('qris-img').src = CONFIG.qrisImage;
    document.getElementById('payment-label').innerText = CONFIG.namaPayment;
    document.getElementById('payment-num').innerText = CONFIG.nomorPayment;
    
    document.getElementById('link-wa').href = CONFIG.whatsapp;
    document.getElementById('link-tele').href = CONFIG.telegram;
    
    const h = new Date().getHours();
    const greet = h < 11 ? 'Selamat Pagi' : h < 15 ? 'Selamat Siang' : h < 18 ? 'Selamat Sore' : 'Selamat Malam';
    document.getElementById('greeting').innerText = `${greet}, Sobat!`;

    typeWriterEffect(CONFIG.deskripsi, 'hero-desc');
    renderChips();
    
    setTimeout(() => {
        const l = document.getElementById('preloader');
        l.style.opacity = '0'; 
        setTimeout(() => {
            l.style.display = 'none';
        }, 500);
    }, 800);

    document.getElementById('file-input').addEventListener('change', function() {
        const f = this.files[0];
        const label = document.getElementById('file-text');
        const icon = document.getElementById('file-icon');
        if (f) {
            label.innerText = f.name.length > 20 ? f.name.substring(0, 17) + "..." : f.name;
            icon.className = "fas fa-check-circle text-[var(--green)] text-xl";
        } else {
            label.innerText = "Pilih File Gambar";
            icon.className = "fas fa-cloud-upload-alt text-[var(--dark)] text-xl";
        }
    });

    const inputNominal = document.getElementById('input-nominal');
    inputNominal.addEventListener('keyup', function(e) {
        this.value = formatRupiah(this.value.replace(/[^0-9]/g, ''));
    });
}

function initLeaderboard() {
    const podiumBox = document.getElementById('podium-box');
    const listContainer = document.getElementById('donator-list');
    
    const p1 = MOCK_DONATORS[0];
    const p2 = MOCK_DONATORS[1];
    const p3 = MOCK_DONATORS[2];

    podiumBox.innerHTML = `
        <div class="podium-item">
            <div class="podium-avatar-box">
                <img src="${p2.avatar}" alt="${p2.name}">
                <div class="rank-badge bg-[var(--blue)]">2</div>
            </div>
            <div class="podium-block podium-2 curved-top">
                <span>${p2.name.split(' ')[0]}</span>
            </div>
        </div>
        <div class="podium-item podium-center">
            <i class="fas fa-crown crown-icon"></i>
            <div class="podium-avatar-box avatar-lg">
                <img src="${p1.avatar}" alt="${p1.name}">
                <div class="rank-badge bg-[var(--yellow)] text-[var(--dark)]">1</div>
            </div>
            <div class="podium-block podium-1 curved-top-lg">
                <span>${p1.name.split(' ')[0]}</span>
            </div>
        </div>
        <div class="podium-item">
            <div class="podium-avatar-box">
                <img src="${p3.avatar}" alt="${p3.name}">
                <div class="rank-badge bg-[var(--green)]">3</div>
            </div>
            <div class="podium-block podium-3 curved-top">
                <span>${p3.name.split(' ')[0]}</span>
            </div>
        </div>
    `;

    MOCK_DONATORS.forEach((d, index) => {
        const li = document.createElement('li');
        li.className = 'donator-item';
        li.onclick = () => openReceipt(d.id);
        
        let rankHtml = '';
        if(index === 0) rankHtml = '<i class="fas fa-medal text-[var(--yellow)] text-xl drop-shadow-md"></i>';
        else if(index === 1) rankHtml = '<span class="font-black text-[var(--dark)] opacity-50">#2</span>';
        else if(index === 2) rankHtml = '<span class="font-black text-[var(--dark)] opacity-50">#3</span>';
        else rankHtml = `<span class="font-black text-[var(--dark)] opacity-30">#${index + 1}</span>`;

        li.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg border-2 border-[var(--dark)] bg-[var(--bg-cream)] overflow-hidden shadow-[2px_2px_0px_var(--dark)] shrink-0">
                    <img src="${d.avatar}" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col">
                    <span class="font-black text-sm uppercase text-[var(--dark)]">${d.name}</span>
                    <span class="text-[10px] font-bold text-gray-500"><i class="far fa-clock"></i> ${d.time}</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="text-right flex flex-col items-end">
                    <span class="font-black text-sm text-[var(--green)]">${d.amount}</span>
                    <span class="text-[10px] font-bold text-[var(--blue)] uppercase cursor-pointer hover:underline">Lihat Pesan <i class="fas fa-chevron-right text-[8px]"></i></span>
                </div>
                <div class="w-6 text-center">${rankHtml}</div>
            </div>
        `;
        listContainer.appendChild(li);
    });
}

function switchView(view) {
    const vDonate = document.getElementById('view-donate');
    const vLeaderboard = document.getElementById('view-leaderboard');
    const btnDonate = document.getElementById('nav-donate');
    const btnLeaderboard = document.getElementById('nav-leaderboard');

    vDonate.classList.add('hidden');
    vLeaderboard.classList.add('hidden');
    btnDonate.classList.remove('active');
    btnLeaderboard.classList.remove('active');

    if(view === 'donate') {
        vDonate.classList.remove('hidden');
        btnDonate.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        vLeaderboard.classList.remove('hidden');
        btnLeaderboard.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function switchPayment(method) {
    const pQris = document.getElementById('payment-qris');
    const pManual = document.getElementById('payment-manual');
    const tabQris = document.getElementById('tab-qris');
    const tabManual = document.getElementById('tab-manual');

    if(method === 'qris') {
        pQris.classList.remove('hidden');
        pManual.classList.add('hidden');
        tabQris.classList.add('active');
        tabManual.classList.remove('active');
    } else {
        pQris.classList.add('hidden');
        pManual.classList.remove('hidden');
        tabQris.classList.remove('active');
        tabManual.classList.add('active');
    }
}

function openReceipt(id) {
    const data = MOCK_DONATORS.find(x => x.id === id);
    if(!data) return;

    document.getElementById('rcpt-avatar').src = data.avatar;
    document.getElementById('rcpt-name').innerText = data.name;
    document.getElementById('rcpt-time').innerText = data.time;
    document.getElementById('rcpt-amount').innerText = data.amount;
    document.getElementById('rcpt-msg').innerText = `"${data.msg}"`;
    
    document.getElementById('rcpt-merchant-avatar').src = CONFIG.profilGambar;
    document.getElementById('rcpt-merchant-name').innerText = CONFIG.namaPemilik;
    
    const refId = "TRX" + new Date().getTime().toString().slice(-5) + id + Math.floor(Math.random() * 999);
    document.getElementById('rcpt-ref').innerText = refId;

    document.getElementById('receipt-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReceipt(event, force = false) {
    if (force || event.target.id === 'receipt-modal') {
        document.getElementById('receipt-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

async function submitForm() {
    const btn = document.getElementById('btn-send');
    const originalContent = btn.innerHTML;
    const nama = document.getElementById('input-nama').value;
    const nominal = document.getElementById('input-nominal').value;
    const pesan = document.getElementById('input-pesan').value;
    const file = document.getElementById('file-input').files[0];

    if (!nama || !nominal) { 
        showToast("Error", "Nama & Nominal wajib diisi!", "error");
        return; 
    }

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> MEMPROSES...`;

    const formData = new FormData();
    formData.append("name", nama);
    formData.append("nominal", `Rp ${nominal}`);
    formData.append("message", pesan || "-");
    
    if (file) {
        formData.append("attachment", file);
    }
    
    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append("_subject", `Donasi Baru: ${nama}`);

    try {
        const res = await fetch(`https://formsubmit.co/ajax/${CONFIG.emailTujuan}`, {
            method: 'POST',
            body: formData
        });
        await res.json().catch(() => ({})); 

        if (res.ok) {
            showToast("Success", "Data berhasil terkirim!", "success");
            document.getElementById('input-nama').value = '';
            document.getElementById('input-nominal').value = '';
            document.getElementById('input-pesan').value = '';
            document.getElementById('file-input').value = '';
            document.getElementById('file-text').innerText = "Pilih File Gambar";
            document.getElementById('file-icon').className = "fas fa-cloud-upload-alt text-[var(--dark)] text-xl";
            
            document.querySelectorAll('.retro-chip').forEach(x => { 
                x.classList.remove('active-chip');
            });
        } else {
            showToast("Failed", "Pengiriman gagal. Coba lagi.", "error");
        }
    } catch (e) {
        console.error(e);
        showToast("Info", "Cek status pengiriman...", "success");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalContent;
    }
}

function typeWriterEffect(text, elId) {
    const el = document.getElementById(elId); 
    el.innerHTML = ''; 
    el.classList.add('typing-cursor');
    let i = 0;
    
    function type() { 
        if (i < text.length) { 
            el.innerHTML += text.charAt(i);
            i++; 
            setTimeout(type, 20);
        } else { 
            el.classList.remove('typing-cursor');
        } 
    }
    type();
}

function renderChips() {
    const c = document.getElementById('nominal-chips');
    c.innerHTML = '';
    CONFIG.nominalPilihan.forEach(amt => {
        const b = document.createElement('button');
        b.className = 'retro-chip flex-grow md:flex-grow-0';
        b.innerText = `Rp ${amt}`;
        b.onclick = () => {
            document.getElementById('input-nominal').value = amt;
            document.querySelectorAll('.retro-chip').forEach(x => { 
                x.classList.remove('active-chip'); 
            });
            b.classList.add('active-chip'); 
        };
        c.appendChild(b);
    });
}

function formatRupiah(n) {
    let s = n.toString();
    let split = s.split(',');
    let sisa = split[0].length % 3;
    let r = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    
    if (ribuan) { 
        let sep = sisa ? '.' : ''; 
        r += sep + ribuan.join('.'); 
    }
    return r;
}

function toggleMenu() { 
    document.getElementById('menuPanel').classList.toggle('hidden'); 
}

function copyText() { 
    navigator.clipboard.writeText(CONFIG.nomorPayment);
    showToast("System", "Nomor berhasil disalin!", "success");
}

function showToast(title, msg, type) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div'); 
    
    const headerColor = type === 'error' ? 'header-pink' : 'header-blue';
    const icon = type === 'error' ? 'fa-times-circle text-[var(--pink)]' : 'fa-check-circle text-[var(--blue)]';
    
    toast.className = 'retro-toast retro-window w-72';
    toast.innerHTML = `
        <div class="window-header ${headerColor}">
            <span class="font-bold text-xs uppercase">${title}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="window-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="window-body bg-[var(--bg-light)] p-4 flex flex-col items-center text-center gap-3">
            <i class="fas ${icon} text-3xl"></i>
            <p class="text-sm font-bold">${msg}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="retro-btn w-full mt-2 py-1 text-sm">OK</button>
        </div>
    `;
    
    container.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.add('show'));
    
    setTimeout(() => { 
        if(document.body.contains(toast)){
            toast.classList.remove('show'); 
            setTimeout(() => {
                if(document.body.contains(toast)) toast.remove();
            }, 400); 
        }
    }, 4000);
}

window.onclick = function(e) { 
    if (!e.target.closest('.relative')) {
        document.getElementById('menuPanel').classList.add('hidden');
    }
}
