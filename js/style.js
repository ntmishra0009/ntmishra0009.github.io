// --- Loader Management ---
window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('loader-content');
    const txt = container.querySelector('.loader-text');
    const mainContainer = document.getElementById('loader-container');

    setTimeout(() => {
        container.classList.add('ready');
        txt.innerText = 'TAP TO ENTER';

        container.addEventListener('click', () => {
            mainContainer.classList.add('loaded');
            setTimeout(() => {
                mainContainer.classList.add('loader-removed');
            }, 1200);
        });
    }, 1500);
});

// --- Countdown Timer Logic ---
const targetDate = new Date("Feb 22, 2027 00:00:00").getTime();
const interval = setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
        clearInterval(interval);
        document.getElementById("countdown-timer").innerHTML = "<p style='color:#d4af37;'>The Auspicious Day is Here!</p>";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("mins").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("secs").innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);

// --- Scratch Card Setup ---
const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

function initScratch() {
    // Textured classic card gold paint fill
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#580000';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE ✨', canvas.width / 2, canvas.height / 2 + 5);

    ctx.strokeStyle = '#580000';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
}

function scratch(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); });
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchmove', scratch);

initScratch();