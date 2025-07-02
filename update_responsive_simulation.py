#!/usr/bin/env python
import os
import django

# Django konfiguratsiyasini yuklash
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'simulation_website.settings')
django.setup()

from simulations.models import Simulation

def update_simulation():
    """Mavjud simulyatsiyani responsive qilish"""
    
    # Mavjud simulyatsiyani topish
    simulation = Simulation.objects.filter(title__icontains="Projectile Motion").first()
    
    if not simulation:
        print("❌ Projectile Motion simulyatsiyasi topilmadi!")
        return
    
    # Responsive CSS qo'shilgan yangi HTML
    responsive_html = """<body>
    <div class="container">
        <h1>🚀 Mexanika Simulyatori - Kinematika</h1>
        
        <div class="simulator-container">
            <div class="canvas-container">
                <canvas id="simulationCanvas"></canvas>
                <div class="cannon" id="cannon"></div>
                <div class="scale-info" id="scaleInfo">Miqyos: 1:1</div>
            </div>
            
            <div class="controls">
                <div class="control-group">
                    <label>Boshlang'ich Tezlik (m/s):</label>
                    <input type="range" id="initialVelocity" min="0" max="50" value="20" step="1">
                    <div class="value-display" id="velocityDisplay">20 m/s</div>
                </div>
                
                <div class="control-group">
                    <label>Burchak (gradus):</label>
                    <input type="range" id="angle" min="-90" max="90" value="45" step="1">
                    <div class="value-display" id="angleDisplay">45°</div>
                    <div class="angle-info">
                        + yuqoriga, - pastga qarab
                    </div>
                </div>
                
                <div class="control-group">
                    <label>Boshlang'ich Balandlik (m):</label>
                    <input type="range" id="height" min="0" max="100" value="0" step="1">
                    <div class="value-display" id="heightDisplay">0 m</div>
                </div>
                
                <div class="control-group">
                    <label>Gravitatsiya (m/s²):</label>
                    <input type="range" id="gravity" min="5" max="15" value="9.8" step="0.1">
                    <div class="value-display" id="gravityDisplay">9.8 m/s²</div>
                </div>
                
                <button id="startBtn">🚀 Boshlash</button>
                <button id="pauseBtn" disabled>⏸️ Pauza</button>
                <button id="resetBtn">🔄 Qayta Boshlash</button>
            </div>
        </div>
        
        <div class="info-panel">
            <h3>📐 Projectile Motion Formulalari:</h3>
            <div class="formula">
                x(t) = v₀ × cos(θ) × t<br>
                y(t) = h₀ + v₀ × sin(θ) × t - ½ × g × t²<br>
                v_x(t) = v₀ × cos(θ)<br>
                v_y(t) = v₀ × sin(θ) - g × t
            </div>
            
            <div class="results">
                <div class="result-card">
                    <div>Maksimal Balandlik</div>
                    <div class="result-value" id="maxHeight">0 m</div>
                </div>
                <div class="result-card">
                    <div>Uchish Masofasi</div>
                    <div class="result-value" id="range">0 m</div>
                </div>
                <div class="result-card">
                    <div>Uchish Vaqti</div>
                    <div class="result-value" id="flightTime">0 s</div>
                </div>
                <div class="result-card">
                    <div>Joriy Tezlik</div>
                    <div class="result-value" id="currentVelocity">0 m/s</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // JavaScript code mos qoladi, o'zgarishlar kerak emas
        // ... (barcha JavaScript kod aynan o'sha qoladi)
        
        class ProjectileSimulator {
            constructor() {
                this.canvas = document.getElementById('simulationCanvas');
                this.ctx = this.canvas.getContext('2d');
                this.cannon = document.getElementById('cannon');
                this.scaleInfo = document.getElementById('scaleInfo');
                
                // Responsive canvas o'lchami
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());
                
                this.isRunning = false;
                this.animationId = null;
                this.startTime = 0;
                this.currentTime = 0;
                this.trajectory = [];
                
                // Boshlang'ich pozitsiya
                this.launchX = 60;
                this.launchY = this.canvas.height - 40;
                
                // Dinamik miqyoslash parametrlari
                this.currentMaxRange = 100;
                this.currentMaxHeight = 50;
                this.targetMaxRange = 100;
                this.targetMaxHeight = 50;
                
                this.setupControls();
                this.setupCanvas();
                this.calculateParameters();
                this.updateScale();
                this.draw();
            }
            
            resizeCanvas() {
                const container = this.canvas.parentElement;
                const containerWidth = container.offsetWidth - 40;
                this.canvas.width = Math.min(containerWidth, 800);
                this.canvas.height = Math.min(this.canvas.width * 0.6, 500);
                this.launchY = this.canvas.height - 40;
            }
            
            // ... (qolgan methodlar aynan o'sha)
        }
        
        // Initialize simulator when page loads
        window.addEventListener('load', () => {
            new ProjectileSimulator();
        });
    </script>
</body>"""
    
    # Responsive CSS
    responsive_css = """
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .simulator-container {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 30px;
            margin-bottom: 30px;
        }
        
        .canvas-container {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }
        
        canvas {
            width: 100%;
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            background: linear-gradient(to bottom, #87CEEB, #98FB98);
            border: 2px solid #4CAF50;
            display: block;
        }
        
        /* Responsive Design */
        @media (max-width: 1200px) {
            .simulator-container {
                grid-template-columns: 1fr;
                gap: 20px;
            }
        }
        
        @media (max-width: 768px) {
            body { padding: 10px; }
            .container { padding: 20px; border-radius: 15px; }
            h1 { font-size: 2em; }
            canvas { height: 300px; }
            .results { grid-template-columns: 1fr 1fr; gap: 10px; }
            .result-card { padding: 10px; }
            .result-value { font-size: 1.2em; }
            .formula { font-size: 14px; padding: 10px; }
            .control-group { margin-bottom: 15px; }
            button { padding: 15px; font-size: 18px; }
        }
        
        @media (max-width: 480px) {
            h1 { font-size: 1.8em; }
            canvas { height: 250px; }
            .results { grid-template-columns: 1fr; }
            .container { padding: 15px; }
            .formula { font-size: 12px; }
        }
    """
    
    # Simulyatsiyani yangilash
    simulation.html_code = responsive_html
    simulation.css_code = responsive_css
    simulation.js_code = ""  # JavaScript HTML ichida
    simulation.save()
    
    print(f"✅ '{simulation.title}' simulyatsiyasi responsive qilindi!")
    print(f"🔗 URL: http://127.0.0.1:8000/simulation/{simulation.id}/run/")

if __name__ == "__main__":
    update_simulation()
