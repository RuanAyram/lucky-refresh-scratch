const prizes = [
  "R$ 50,00",
  "R$ 100,00",
  "R$ 200,00",
  "R$ 500,00",
  "R$ 1000,00",
  "Tente Novamente"
];

class ScratchCard {
  constructor() {
    this.canvas = document.getElementById('scratch-card');
    this.ctx = this.canvas.getContext('2d');
    this.prize = prizes[Math.floor(Math.random() * prizes.length)];
    this.isScratched = false;
    this.isDragging = false;

    this.init();
    this.setupEventListeners();
  }

  init() {
    // Set prize text
    document.getElementById('prize-text').textContent = '???';

    // Fill canvas with gray scratch-off layer
    this.ctx.fillStyle = '#808080';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener('mousedown', () => this.isDragging = true);
    this.canvas.addEventListener('mouseup', () => this.isDragging = false);
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isDragging) this.handleScratch(e);
    });

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => {
      this.isDragging = true;
      e.preventDefault();
    });
    this.canvas.addEventListener('touchend', () => this.isDragging = false);
    this.canvas.addEventListener('touchmove', (e) => {
      if (this.isDragging) this.handleScratch(e);
      e.preventDefault();
    });
  }

  handleScratch(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.type.includes('mouse') 
      ? e.clientX - rect.left 
      : e.touches[0].clientX - rect.left;
    const y = e.type.includes('mouse') 
      ? e.clientY - rect.top 
      : e.touches[0].clientY - rect.top;

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 20, 0, Math.PI * 2);
    this.ctx.fill();

    this.checkProgress();
  }

  checkProgress() {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    if (transparentPixels > (pixels.length / 4) * 0.5 && !this.isScratched) {
      this.isScratched = true;
      document.getElementById('prize-text').textContent = this.prize;
      this.canvas.style.opacity = '0';
    }
  }
}

// Initialize scratch card when page loads
document.addEventListener('DOMContentLoaded', () => {
  new ScratchCard();
});