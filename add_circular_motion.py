#!/usr/bin/env python
import os
import django



# Django konfiguratsiyasini yuklash
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'simulation_website.settings')
django.setup()

from simulations.models import Simulation

# Sizning Aylanma Harakat simulyatsiyangiz
html_content = """<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aylanma Harakat Simulyatsiyasi</title>
    <style>
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
            border-radius: 20px;
            padding: 30px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        
        h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }
        
        .simulation-panel {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            backdrop-filter: blur(5px);
        }
        
        .controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .control-group {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            backdrop-filter: blur(5px);
        }
        
        .control-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            font-size: 0.95em;
        }
        
        .control-group input {
            width: 100%;
            padding: 8px 12px;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 0.9em;
        }
        
        .control-group input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
        
        .buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        button {
            padding: 12px 24px;
            border: none;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1em;
        }
        
        .start-btn {
            background: linear-gradient(45deg, #00c851, #00a84f);
            color: white;
        }
        
        .stop-btn {
            background: linear-gradient(45deg, #ff4757, #e73c7e);
            color: white;
        }
        
        .reset-btn {
            background: linear-gradient(45deg, #ffa726, #ff7043);
            color: white;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        .canvas-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
        }
        
        canvas {
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 15px;
            background: rgba(0, 0, 0, 0.2);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .info-panel {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            backdrop-filter: blur(5px);
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .info-item {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            backdrop-filter: blur(3px);
        }
        
        .info-item h3 {
            margin: 0 0 10px 0;
            font-size: 1.1em;
            color: #ffd700;
        }
        
        .info-item .value {
            font-size: 1.3em;
            font-weight: bold;
            color: #87ceeb;
        }
        
        .info-item .unit {
            font-size: 0.9em;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .formulas {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            backdrop-filter: blur(3px);
        }
        
        .formulas h3 {
            margin: 0 0 10px 0;
            color: #ffd700;
        }
        
        .formula {
            margin: 5px 0;
            font-family: 'Courier New', monospace;
            font-size: 1.1em;
            padding: 5px 10px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            color: #87ceeb;
        }
        
        .graphs-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .graph-panel {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            backdrop-filter: blur(5px);
        }
        
        .graph-panel h3 {
            text-align: center;
            margin-bottom: 15px;
            color: #ffd700;
        }
        
        @media (max-width: 1200px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .graphs-container {
                grid-template-columns: 1fr;
            }
        }
        
        @media (max-width: 768px) {
            .controls {
                grid-template-columns: 1fr;
            }
            
            .buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌀 Aylanma Harakat Simulyatsiyasi</h1>
        
        <div class="main-content">
            <div class="simulation-panel">
                <div class="controls">
                    <div class="control-group">
                        <label for="omega">Burchak tezligi (ω, rad/s):</label>
                        <input type="number" id="omega" value="2" step="0.1" min="0" max="10">
                    </div>
                    
                    <div class="control-group">
                        <label for="alpha">Burchak tezlanishi (α, rad/s²):</label>
                        <input type="number" id="alpha" value="0" step="0.1" min="-5" max="5">
                    </div>
                    
                    <div class="control-group">
                        <label for="radius">Radius (m):</label>
                        <input type="number" id="radius" value="100" step="5" min="50" max="150">
                    </div>
                    
                    <div class="control-group">
                        <label for="duration">Harakat vaqti (s):</label>
                        <input type="number" id="duration" value="10" step="1" min="1" max="60">
                    </div>
                    
                    <div class="control-group">
                        <label for="showVectors">Vektorlarni ko'rsatish:</label>
                        <input type="checkbox" id="showVectors" checked>
                    </div>
                </div>
                
                <div class="buttons">
                    <button class="start-btn" onclick="startSimulation()">▶️ Boshlash</button>
                    <button class="stop-btn" onclick="stopSimulation()">⏸️ To'xtatish</button>
                    <button class="reset-btn" onclick="resetSimulation()">🔄 Qayta boshlash</button>
                </div>
                
                <div class="canvas-container">
                    <canvas id="simulationCanvas" width="400" height="400"></canvas>
                </div>
            </div>
            
            <div class="info-panel">
                <div class="info-grid">
                    <div class="info-item">
                        <h3>Burchak φ (rad)</h3>
                        <div class="value" id="angleValueRad">0.00</div>
                        <div class="unit">radian</div>
                    </div>
                    
                    <div class="info-item">
                        <h3>Burchak φ (°)</h3>
                        <div class="value" id="angleValueDeg">0.00</div>
                        <div class="unit">gradus</div>
                    </div>
                    
                    <div class="info-item">
                        <h3>Vaqt t</h3>
                        <div class="value" id="timeValue">0.00</div>
                        <div class="unit">sekund</div>
                    </div>
                    
                    <div class="info-item">
                        <h3>Qolgan vaqt</h3>
                        <div class="value" id="remainingTime">0.00</div>
                        <div class="unit">sekund</div>
                    </div>
                    
                    <div class="info-item">
                        <h3>Burchak tezligi ω</h3>
                        <div class="value" id="angularVelocity">0.00</div>
                        <div class="unit">rad/s</div>
                    </div>
                    
                    <div class="info-item">
                        <h3>Chiziqli tezlik v</h3>
                        <div class="value" id="linearVelocity">0.00</div>
                        <div class="unit">m/s</div>
                    </div>
                    
                    <div class="info-item">
                        <h3>Markazga intiluvchi tezlanish</h3>
                        <div class="value" id="centripetalAccel">0.00</div>
                        <div class="unit">m/s²</div>
                    </div>
                </div>
                
                <div class="formulas">
                    <h3>📐 Asosiy tenglamalar:</h3>
                    <div class="formula">φ = φ₀ + ω₀t + ½αt² (burchak o'zgarishi)</div>
                    <div class="formula">ω = ω₀ + αt (burchak tezligi)</div>
                    <div class="formula">α = Δω/Δt (burchak tezlanishi)</div>
                    <div class="formula">v = ωr (chiziqli tezlik)</div>
                    <div class="formula">aₙ = v²/r = ω²r (markazga intiluvchi tezlanish)</div>
                    <div class="formula">φ(°) = φ(rad) × 180/π (gradusga o'tkazish)</div>
                </div>
            </div>
        </div>
        
        <div class="graphs-container">
            <div class="graph-panel">
                <h3>📊 Burchak-Vaqt Grafigi (φ-t)</h3>
                <canvas id="angleGraph" width="400" height="200"></canvas>
            </div>
            
            <div class="graph-panel">
                <h3>📈 Burchak tezlik-Vaqt Grafigi (ω-t)</h3>
                <canvas id="velocityGraph" width="400" height="200"></canvas>
            </div>
        </div>
    </div>

    <script>
        let canvas, ctx, angleGraphCanvas, angleGraphCtx, velocityGraphCanvas, velocityGraphCtx;
        let animationId;
        let startTime = 0;
        let currentTime = 0;
        let isRunning = false;
        let angle = 0;
        let currentOmega = 2;
        let angleData = [];
        let velocityData = [];
        let maxDataPoints = 100;
        
        // Canvas və context'ləri initialize qilish
        function initCanvas() {
            canvas = document.getElementById('simulationCanvas');
            ctx = canvas.getContext('2d');
            
            angleGraphCanvas = document.getElementById('angleGraph');
            angleGraphCtx = angleGraphCanvas.getContext('2d');
            
            velocityGraphCanvas = document.getElementById('velocityGraph');
            velocityGraphCtx = velocityGraphCanvas.getContext('2d');
        }
        
        // Simulyatsiyani boshlash
        function startSimulation() {
            if (!isRunning) {
                isRunning = true;
                startTime = Date.now() - currentTime * 1000;
                animate();
            }
        }
        
        // Simulyatsiyani to'xtatish
        function stopSimulation() {
            isRunning = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        }
        
        // Simulyatsiyani qayta boshlash
        function resetSimulation() {
            stopSimulation();
            currentTime = 0;
            angle = 0;
            currentOmega = parseFloat(document.getElementById('omega').value);
            angleData = [];
            velocityData = [];
            updateDisplay();
            drawSimulation();
            drawGraphs();
        }
        
        // Asosiy animatsiya tsikli
        function animate() {
            if (!isRunning) return;
            
            currentTime = (Date.now() - startTime) / 1000;
            const duration = parseFloat(document.getElementById('duration').value);
            
            // Vaqt tugaganda to'xtatish
            if (currentTime >= duration) {
                currentTime = duration;
                stopSimulation();
            }
            
            // Parametrlarni olish
            const omega0 = parseFloat(document.getElementById('omega').value);
            const alpha = parseFloat(document.getElementById('alpha').value);
            const radius = parseFloat(document.getElementById('radius').value);
            
            // Burchak tezligi va holatni hisoblash
            currentOmega = omega0 + alpha * currentTime;
            angle = omega0 * currentTime + 0.5 * alpha * currentTime * currentTime;
            
            // Ma'lumotlarni saqlash
            if (angleData.length >= maxDataPoints) {
                angleData.shift();
                velocityData.shift();
            }
            
            angleData.push({time: currentTime, value: angle});
            velocityData.push({time: currentTime, value: currentOmega});
            
            updateDisplay();
            drawSimulation();
            drawGraphs();
            
            if (currentTime < duration) {
                animationId = requestAnimationFrame(animate);
            }
        }
        
        // Ekran ma'lumotlarini yangilash
        function updateDisplay() {
            const radius = parseFloat(document.getElementById('radius').value);
            const duration = parseFloat(document.getElementById('duration').value);
            const linearVel = Math.abs(currentOmega * radius / 100); // metrga o'tkazish
            const centripetalAccel = Math.abs(currentOmega * currentOmega * radius / 100);
            
            // Burchakni radianda ko'rsatish
            document.getElementById('angleValueRad').textContent = angle.toFixed(2);
            
            // Burchakni gradusda ko'rsatish
            const angleDegrees = (angle * 180 / Math.PI) % 360;
            document.getElementById('angleValueDeg').textContent = angleDegrees.toFixed(1);
            
            document.getElementById('timeValue').textContent = currentTime.toFixed(2);
            
            // Qolgan vaqtni hisoblash
            const remainingTime = Math.max(0, duration - currentTime);
            document.getElementById('remainingTime').textContent = remainingTime.toFixed(2);
            
            document.getElementById('angularVelocity').textContent = currentOmega.toFixed(2);
            document.getElementById('linearVelocity').textContent = linearVel.toFixed(2);
            document.getElementById('centripetalAccel').textContent = centripetalAccel.toFixed(2);
        }
        
        // Simulyatsiya chizish
        function drawSimulation() {
            const radius = parseFloat(document.getElementById('radius').value);
            const showVectors = document.getElementById('showVectors').checked;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            // Aylana chizish
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Markaz nuqtasi
            ctx.beginPath();
            ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffd700';
            ctx.fill();
            
            // Harakat qilayotgan nuqta
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = '#ff4757';
            ctx.fill();
            
            // Radius chiziq
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            if (showVectors) {
                // Tezlik vektori (tangensial)
                const velScale = 30;
                const velX = -Math.sin(angle) * velScale;
                const velY = Math.cos(angle) * velScale;
                
                drawVector(x, y, velX, velY, '#00c851', 'v');
                
                // Markazga intiluvchi tezlanish vektori
                const accelScale = 20;
                const accelX = -Math.cos(angle) * accelScale;
                const accelY = -Math.sin(angle) * accelScale;
                
                drawVector(x, y, accelX, accelY, '#87ceeb', 'a');
            }
        }
        
        // Vektor chizish
        function drawVector(startX, startY, dx, dy, color, label) {
            const endX = startX + dx;
            const endY = startY + dy;
            
            // Vektor chiziq
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // O'q uchi
            const arrowSize = 8;
            const angle = Math.atan2(dy, dx);
            
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI/6), 
                       endY - arrowSize * Math.sin(angle - Math.PI/6));
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI/6), 
                       endY - arrowSize * Math.sin(angle + Math.PI/6));
            ctx.stroke();
            
            // Label
            ctx.fillStyle = color;
            ctx.font = 'bold 14px Arial';
            ctx.fillText(label, endX + 10, endY - 10);
        }
        
        // Grafiklar chizish
        function drawGraphs() {
            drawAngleGraph();
            drawVelocityGraph();
        }
        
        function drawAngleGraph() {
            const ctx = angleGraphCtx;
            ctx.clearRect(0, 0, angleGraphCanvas.width, angleGraphCanvas.height);
            
            if (angleData.length < 2) return;
            
            const duration = parseFloat(document.getElementById('duration').value);
            const maxAngle = Math.max(...angleData.map(d => Math.abs(d.value)));
            const minAngle = Math.min(...angleData.map(d => d.value));
            const angleRange = maxAngle - minAngle || 1;
            
            // O'qlar va tarmoqlar chizish
            drawAxesWithLabels(ctx, angleGraphCanvas.width, angleGraphCanvas.height, 
                              duration, minAngle, maxAngle, 't(s)', 'φ(rad)');
            
            // Ma'lumotlar chizish
            ctx.beginPath();
            ctx.strokeStyle = '#00c851';
            ctx.lineWidth = 3;
            
            for (let i = 0; i < angleData.length; i++) {
                const x = (angleData[i].time / duration) * (angleGraphCanvas.width - 80) + 50;
                const y = angleGraphCanvas.height - 40 - ((angleData[i].value - minAngle) / angleRange) * (angleGraphCanvas.height - 80);
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        }
        
        function drawVelocityGraph() {
            const ctx = velocityGraphCtx;
            ctx.clearRect(0, 0, velocityGraphCanvas.width, velocityGraphCanvas.height);
            
            if (velocityData.length < 2) return;
            
            const duration = parseFloat(document.getElementById('duration').value);
            const maxVel = Math.max(...velocityData.map(d => Math.abs(d.value)));
            const minVel = Math.min(...velocityData.map(d => d.value));
            const velRange = maxVel - minVel || 1;
            
            // O'qlar va tarmoqlar chizish
            drawAxesWithLabels(ctx, velocityGraphCanvas.width, velocityGraphCanvas.height, 
                              duration, minVel, maxVel, 't(s)', 'ω(rad/s)');
            
            // Ma'lumotlar chizish
            ctx.beginPath();
            ctx.strokeStyle = '#87ceeb';
            ctx.lineWidth = 3;
            
            for (let i = 0; i < velocityData.length; i++) {
                const x = (velocityData[i].time / duration) * (velocityGraphCanvas.width - 80) + 50;
                const y = velocityGraphCanvas.height - 40 - ((velocityData[i].value - minVel) / velRange) * (velocityGraphCanvas.height - 80);
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.stroke();
        }
        
        function drawAxesWithLabels(ctx, width, height, maxX, minY, maxY, xLabel, yLabel) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = '12px Arial';
            
            // Asosiy o'qlar
            ctx.beginPath();
            // X o'qi
            ctx.moveTo(50, height - 40);
            ctx.lineTo(width - 30, height - 40);
            // Y o'qi
            ctx.moveTo(50, 20);
            ctx.lineTo(50, height - 40);
            ctx.stroke();
            
            // O'q ko'rsatkichlari
            ctx.beginPath();
            // X o'qi o'ng tomoni
            ctx.moveTo(width - 30, height - 40);
            ctx.lineTo(width - 40, height - 35);
            ctx.moveTo(width - 30, height - 40);
            ctx.lineTo(width - 40, height - 45);
            // Y o'qi yuqori tomoni
            ctx.moveTo(50, 20);
            ctx.lineTo(45, 30);
            ctx.moveTo(50, 20);
            ctx.lineTo(55, 30);
            ctx.stroke();
            
            // Tarmoq chiziqlar va raqamlar
            const xSteps = 5;
            const ySteps = 5;
            
            // X o'qi bo'yicha
            for (let i = 0; i <= xSteps; i++) {
                const x = 50 + (i / xSteps) * (width - 80);
                const value = (i / xSteps) * maxX;
                
                // Vertikal tarmoq chizig'i
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.moveTo(x, height - 40);
                ctx.lineTo(x, 20);
                ctx.stroke();
                
                // Raqam
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.textAlign = 'center';
                ctx.fillText(value.toFixed(1), x, height - 20);
            }
            
            // Y o'qi bo'yicha
            const yRange = maxY - minY || 1;
            for (let i = 0; i <= ySteps; i++) {
                const y = height - 40 - (i / ySteps) * (height - 60);
                const value = minY + (i / ySteps) * yRange;
                
                // Gorizontal tarmoq chizig'i
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.moveTo(50, y);
                ctx.lineTo(width - 30, y);
                ctx.stroke();
                
                // Raqam
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.textAlign = 'right';
                ctx.fillText(value.toFixed(1), 45, y + 4);
            }
            
            // O'q nomlarini yozish
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(xLabel, width - 15, height - 5);
            
            ctx.save();
            ctx.translate(25, height / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(yLabel, 0, 0);
            ctx.restore();
        }
        
        // Sahifa yuklanganda
        window.onload = function() {
            initCanvas();
            updateDisplay();
            drawSimulation();
            drawGraphs();
        };
    </script>
</body>
</html>"""

def add_circular_motion_simulation():
    """Aylanma harakat simulyatsiyasini qo'shish"""
    
    # Avval shu nomdagi simulyatsiya bor yoki yo'qligini tekshiramiz
    existing = Simulation.objects.filter(title="Aylanma Harakat Simulyatsiyasi").first()
    if existing:
        print("⚠️  Bu simulyatsiya allaqachon mavjud. Yangilaymizmi? (y/n)")
        choice = input().lower()
        if choice == 'y' or choice == 'yes':
            existing.delete()
            print("✅ Eski simulyatsiya o'chirildi.")
        else:
            print("❌ Bekor qilindi.")
            return

    # Yangi simulyatsiya yaratish
    simulation = Simulation.objects.create(
        title="Aylanma Harakat Simulyatsiyasi",
        description="Aylanma harakat qonunlarini o'rganish uchun interaktiv simulyatsiya. Burchak tezligi, tezlanishi va radiusni o'zgartirib, jismning aylanma harakatini kuzatishingiz mumkin. Real vaqt grafiklar va vektorlar bilan jihozlangan.",
        html_code=html_content,
        simulation_type="mexanika",
        subcategory="dinamika"
    )
    
    print(f"🎉 Aylanma harakat simulyatsiyasi muvaffaqiyatli qo'shildi!")
    print(f"📝 ID: {simulation.id}")
    print(f"📋 Sarlavha: {simulation.title}")
    print(f"🔗 URL: http://127.0.0.1:8000/simulation/{simulation.id}/")

if __name__ == "__main__":
    add_circular_motion_simulation()
