from django.core.management.base import BaseCommand
from simulations.models import Simulation


class Command(BaseCommand):
    help = 'Barcha fizika bo\'limlari va qismlari uchun to\'liq simulyatsiyalar namunalarini yaratish'

    def handle(self, *args, **options):
        # Eski simulyatsiyalarni o'chirish
        Simulation.objects.all().delete()
        
        # =============== MEXANIKA ===============
        
        # KINEMATIKA
        Simulation.objects.create(
            title="Gorizontal otilgan jism",
            description="Kinematika qismiga oid gorizontal otilgan jismning harakatini simulyatsiya qilish.",
            simulation_type="mexanika",
            subcategory="kinematika",
            html_code="""
<div class="simulation-container">
    <h1><i class="fas fa-cogs"></i> Gorizontal otilgan jism (Kinematika)</h1>
    <div class="controls">
        <div class="control-group">
            <label for="initialVelocity">Boshlang'ich tezlik (m/s):</label>
            <input type="range" id="initialVelocity" min="10" max="50" value="20">
            <span id="velocityValue">20</span>
        </div>
        <div class="control-group">
            <label for="angle">Otish burchagi (°):</label>
            <input type="range" id="angle" min="15" max="75" value="45">
            <span id="angleValue">45</span>
        </div>
        <button id="startBtn">Boshlash</button>
        <button id="stopBtn">To'xtatish</button>
        <button id="resetBtn">Qayta</button>
    </div>
    <canvas id="simulationCanvas" width="800" height="400"></canvas>
    <div class="results">
        <div class="result-item">
            <span>Maksimal balandlik:</span>
            <span id="maxHeight">0 m</span>
        </div>
        <div class="result-item">
            <span>Uchish vaqti:</span>
            <span id="flightTime">0 s</span>
        </div>
        <div class="result-item">
            <span>Maksimal masofa:</span>
            <span id="maxRange">0 m</span>
        </div>
    </div>
</div>
            """,
            css_code="""
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #e34c26, #ff6b35);
    min-height: 100vh;
}

.simulation-container {
    max-width: 1000px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 { color: #e34c26; text-align: center; margin-bottom: 30px; }

.controls {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
}

.control-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

button {
    background: linear-gradient(45deg, #e34c26, #ff6b35);
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s;
}

button:hover { transform: scale(1.05); }
button:disabled { opacity: 0.6; cursor: not-allowed; }

#simulationCanvas {
    display: block;
    margin: 20px auto;
    border: 2px solid #ddd;
    border-radius: 10px;
    background: linear-gradient(to bottom, #87CEEB, #98FB98);
}

.results {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
}

.result-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    min-width: 150px;
}
            """,
            js_code="""
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    
    let isRunning = false;
    let animationId;
    let t = 0;
    let trajectory = [];
    
    function getParams() {
        return {
            v0: parseFloat(document.getElementById('initialVelocity').value),
            angle: parseFloat(document.getElementById('angle').value) * Math.PI / 180
        };
    }
    
    function calculateTrajectory() {
        const params = getParams();
        const g = 9.81;
        const v0x = params.v0 * Math.cos(params.angle);
        const v0y = params.v0 * Math.sin(params.angle);
        
        const maxHeight = (v0y * v0y) / (2 * g);
        const flightTime = (2 * v0y) / g;
        const maxRange = v0x * flightTime;
        
        document.getElementById('maxHeight').textContent = maxHeight.toFixed(1) + ' m';
        document.getElementById('flightTime').textContent = flightTime.toFixed(1) + ' s';
        document.getElementById('maxRange').textContent = maxRange.toFixed(1) + ' m';
        
        return { maxHeight, flightTime, maxRange, v0x, v0y, g };
    }
    
    function drawSimulation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Ground
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 20);
        ctx.lineTo(canvas.width, canvas.height - 20);
        ctx.stroke();
        
        if (isRunning) {
            const calc = calculateTrajectory();
            const scale = Math.min((canvas.width - 100) / calc.maxRange, (canvas.height - 100) / calc.maxHeight);
            
            // Current position
            const x = calc.v0x * t;
            const y = calc.v0y * t - 0.5 * calc.g * t * t;
            
            if (y >= 0) {
                const canvasX = 50 + x * scale;
                const canvasY = canvas.height - 20 - y * scale;
                
                // Draw projectile
                ctx.fillStyle = '#E74C3C';
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, 8, 0, 2 * Math.PI);
                ctx.fill();
                
                // Add to trajectory
                trajectory.push({x: canvasX, y: canvasY});
                
                // Draw trajectory
                if (trajectory.length > 1) {
                    ctx.strokeStyle = '#FF6B6B';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(trajectory[0].x, trajectory[0].y);
                    for (let i = 1; i < trajectory.length; i++) {
                        ctx.lineTo(trajectory[i].x, trajectory[i].y);
                    }
                    ctx.stroke();
                }
                
                t += 0.05;
            } else {
                isRunning = false;
                document.getElementById('startBtn').disabled = false;
                document.getElementById('stopBtn').disabled = true;
            }
        }
    }
    
    document.getElementById('startBtn').addEventListener('click', () => {
        isRunning = true;
        t = 0;
        trajectory = [];
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        
        function animate() {
            if (isRunning) {
                drawSimulation();
                animationId = requestAnimationFrame(animate);
            }
        }
        animate();
    });
    
    document.getElementById('stopBtn').addEventListener('click', () => {
        isRunning = false;
        cancelAnimationFrame(animationId);
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    });
    
    document.getElementById('resetBtn').addEventListener('click', () => {
        isRunning = false;
        cancelAnimationFrame(animationId);
        t = 0;
        trajectory = [];
        drawSimulation();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    });
    
    // Update display values
    document.getElementById('initialVelocity').addEventListener('input', (e) => {
        document.getElementById('velocityValue').textContent = e.target.value;
        calculateTrajectory();
    });
    
    document.getElementById('angle').addEventListener('input', (e) => {
        document.getElementById('angleValue').textContent = e.target.value;
        calculateTrajectory();
    });
    
    calculateTrajectory();
    drawSimulation();
});
            """
        )

        # DINAMIKA
        Simulation.objects.create(
            title="Nyutonning ikkinchi qonuni",
            description="Dinamika qismiga oid kuch va tezlanish orasidagi bog'lanishni simulyatsiya qilish.",
            simulation_type="mexanika",
            subcategory="dinamika",
            html_code="""
<div class="simulation-container">
    <h1><i class="fas fa-cogs"></i> Nyutonning ikkinchi qonuni (Dinamika)</h1>
    <div class="controls">
        <div class="control-group">
            <label for="force">Kuch (N):</label>
            <input type="range" id="force" min="1" max="20" value="10">
            <span id="forceValue">10</span>
        </div>
        <div class="control-group">
            <label for="mass">Massa (kg):</label>
            <input type="range" id="mass" min="1" max="10" value="5">
            <span id="massValue">5</span>
        </div>
        <button id="startBtn">Boshlash</button>
        <button id="stopBtn">To'xtatish</button>
        <button id="resetBtn">Qayta</button>
    </div>
    <canvas id="forceCanvas" width="800" height="400"></canvas>
    <div class="results">
        <div class="result-item">
            <span>Tezlanish:</span>
            <span id="acceleration">0 m/s²</span>
        </div>
        <div class="result-item">
            <span>Tezlik:</span>
            <span id="velocity">0 m/s</span>
        </div>
        <div class="result-item">
            <span>Masofa:</span>
            <span id="distance">0 m</span>
        </div>
    </div>
</div>
            """,
            css_code="""
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #e34c26, #ff6b35);
    min-height: 100vh;
}

.simulation-container {
    max-width: 1000px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 { color: #e34c26; text-align: center; margin-bottom: 30px; }

.controls {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
    align-items: center;
    justify-content: center;
}

button {
    background: linear-gradient(45deg, #e34c26, #ff6b35);
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

#forceCanvas {
    display: block;
    margin: 20px auto;
    border: 2px solid #ddd;
    border-radius: 10px;
    background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
}
            """,
            js_code="""
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('forceCanvas');
    const ctx = canvas.getContext('2d');
    
    let isRunning = false;
    let t = 0;
    let x = 50;
    let v = 0;
    
    function calculateValues() {
        const F = parseFloat(document.getElementById('force').value);
        const m = parseFloat(document.getElementById('mass').value);
        const a = F / m;
        
        document.getElementById('acceleration').textContent = a.toFixed(2) + ' m/s²';
        return { F, m, a };
    }
    
    function drawSimulation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#f0f0f0');
        gradient.addColorStop(1, '#e0e0e0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Ground
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 50);
        ctx.lineTo(canvas.width, canvas.height - 50);
        ctx.stroke();
        
        if (isRunning) {
            const calc = calculateValues();
            
            // Update physics
            v += calc.a * 0.1;
            x += v * 0.1;
            
            document.getElementById('velocity').textContent = v.toFixed(2) + ' m/s';
            document.getElementById('distance').textContent = ((x - 50) / 10).toFixed(2) + ' m';
            
            if (x > canvas.width - 50) {
                isRunning = false;
                document.getElementById('startBtn').disabled = false;
                document.getElementById('stopBtn').disabled = true;
            }
        }
        
        // Draw object
        ctx.fillStyle = '#3498db';
        ctx.fillRect(x - 25, canvas.height - 100, 50, 50);
        
        // Draw force arrow
        const F = parseFloat(document.getElementById('force').value);
        const arrowLength = F * 10;
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + 25, canvas.height - 75);
        ctx.lineTo(x + 25 + arrowLength, canvas.height - 75);
        ctx.stroke();
        
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(x + 25 + arrowLength, canvas.height - 75);
        ctx.lineTo(x + 25 + arrowLength - 10, canvas.height - 85);
        ctx.lineTo(x + 25 + arrowLength - 10, canvas.height - 65);
        ctx.closePath();
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        
        // Label
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText('F = ' + F + ' N', x + 25 + arrowLength/2 - 20, canvas.height - 90);
    }
    
    function animate() {
        if (!isRunning) return;
        drawSimulation();
        requestAnimationFrame(animate);
    }
    
    document.getElementById('startBtn').addEventListener('click', () => {
        isRunning = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        animate();
    });
    
    document.getElementById('stopBtn').addEventListener('click', () => {
        isRunning = false;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    });
    
    document.getElementById('resetBtn').addEventListener('click', () => {
        isRunning = false;
        t = 0;
        x = 50;
        v = 0;
        document.getElementById('velocity').textContent = '0 m/s';
        document.getElementById('distance').textContent = '0 m';
        drawSimulation();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    });
    
    document.getElementById('force').addEventListener('input', (e) => {
        document.getElementById('forceValue').textContent = e.target.value;
        calculateValues();
        drawSimulation();
    });
    
    document.getElementById('mass').addEventListener('input', (e) => {
        document.getElementById('massValue').textContent = e.target.value;
        calculateValues();
        drawSimulation();
    });
    
    calculateValues();
    drawSimulation();
});
            """
        )

        # STATIKA
        Simulation.objects.create(
            title="Richag muvozanati",
            description="Statika qismiga oid richag muvozanatini simulyatsiya qilish.",
            simulation_type="mexanika",
            subcategory="statika",
            html_code="""
<div class="simulation-container">
    <h1><i class="fas fa-cogs"></i> Richag Muvozanati (Statika)</h1>
    <div class="controls">
        <div class="control-group">
            <label for="weight1">1-og'irlik (N):</label>
            <input type="range" id="weight1" min="1" max="20" value="10">
            <span id="weight1Value">10</span>
        </div>
        <div class="control-group">
            <label for="distance1">1-masofa (m):</label>
            <input type="range" id="distance1" min="1" max="5" value="2">
            <span id="distance1Value">2</span>
        </div>
        <div class="control-group">
            <label for="weight2">2-og'irlik (N):</label>
            <input type="range" id="weight2" min="1" max="20" value="5">
            <span id="weight2Value">5</span>
        </div>
        <div class="control-group">
            <label for="distance2">2-masofa (m):</label>
            <input type="range" id="distance2" min="1" max="5" value="4">
            <span id="distance2Value">4</span>
        </div>
    </div>
    <canvas id="leverCanvas" width="800" height="400"></canvas>
    <div class="results">
        <div class="result-item">
            <span>1-moment:</span>
            <span id="moment1">0 N·m</span>
        </div>
        <div class="result-item">
            <span>2-moment:</span>
            <span id="moment2">0 N·m</span>
        </div>
        <div class="result-item">
            <span>Holat:</span>
            <span id="balance">Muvozanat</span>
        </div>
    </div>
</div>
            """,
            css_code="""
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #e34c26, #ff6b35);
    min-height: 100vh;
}

.simulation-container {
    max-width: 1000px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 { color: #e34c26; text-align: center; margin-bottom: 30px; }

#leverCanvas {
    display: block;
    margin: 20px auto;
    border: 2px solid #ddd;
    border-radius: 10px;
    background: linear-gradient(to bottom, #e3f2fd, #bbdefb);
}
            """,
            js_code="""
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('leverCanvas');
    const ctx = canvas.getContext('2d');
    
    function drawLever() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#e3f2fd');
        gradient.addColorStop(1, '#bbdefb');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        const w1 = parseFloat(document.getElementById('weight1').value);
        const d1 = parseFloat(document.getElementById('distance1').value);
        const w2 = parseFloat(document.getElementById('weight2').value);
        const d2 = parseFloat(document.getElementById('distance2').value);
        
        const moment1 = w1 * d1;
        const moment2 = w2 * d2;
        
        document.getElementById('moment1').textContent = moment1.toFixed(1) + ' N·m';
        document.getElementById('moment2').textContent = moment2.toFixed(1) + ' N·m';
        
        let balance = 'Muvozanat';
        let angle = 0;
        if (moment1 > moment2) {
            balance = 'Chap tomonga og\'ir';
            angle = -0.2;
        } else if (moment2 > moment1) {
            balance = 'O\'ng tomonga og\'ir';
            angle = 0.2;
        }
        document.getElementById('balance').textContent = balance;
        
        // Draw fulcrum
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.moveTo(centerX - 20, centerY + 20);
        ctx.lineTo(centerX + 20, centerY + 20);
        ctx.lineTo(centerX, centerY - 20);
        ctx.closePath();
        ctx.fill();
        
        // Draw lever arm
        ctx.save();
        ctx.translate(centerX, centerY - 20);
        ctx.rotate(angle);
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(-300, 0);
        ctx.lineTo(300, 0);
        ctx.stroke();
        ctx.restore();
        
        // Draw weights
        const scale = 50;
        const pos1X = centerX - d1 * scale;
        const pos1Y = centerY - 20 + Math.tan(angle) * (-d1 * scale);
        const pos2X = centerX + d2 * scale;
        const pos2Y = centerY - 20 + Math.tan(angle) * (d2 * scale);
        
        // Weight 1
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(pos1X - 15, pos1Y - w1 * 3, 30, w1 * 3);
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(w1 + 'N', pos1X, pos1Y - w1 * 1.5);
        
        // Weight 2
        ctx.fillStyle = '#3498db';
        ctx.fillRect(pos2X - 15, pos2Y - w2 * 3, 30, w2 * 3);
        ctx.fillStyle = '#fff';
        ctx.fillText(w2 + 'N', pos2X, pos2Y - w2 * 1.5);
        
        // Distance markers
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 50);
        ctx.lineTo(pos1X, centerY + 50);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 50);
        ctx.lineTo(pos2X, centerY + 50);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText(d1 + 'm', (centerX + pos1X) / 2, centerY + 70);
        ctx.fillText(d2 + 'm', (centerX + pos2X) / 2, centerY + 70);
    }
    
    document.getElementById('weight1').addEventListener('input', (e) => {
        document.getElementById('weight1Value').textContent = e.target.value;
        drawLever();
    });
    
    document.getElementById('distance1').addEventListener('input', (e) => {
        document.getElementById('distance1Value').textContent = e.target.value;
        drawLever();
    });
    
    document.getElementById('weight2').addEventListener('input', (e) => {
        document.getElementById('weight2Value').textContent = e.target.value;
        drawLever();
    });
    
    document.getElementById('distance2').addEventListener('input', (e) => {
        document.getElementById('distance2Value').textContent = e.target.value;
        drawLever();
    });
    
    drawLever();
});
            """
        )

        # =============== MOLEKULYAR FIZIKA VA TERMODINAMIKA ===============
        
        # MODDANING TUZILISHI
        Simulation.objects.create(
            title="Molekulalar harakati",
            description="Moddaning tuzilishi qismiga oid molekulalarning issiqlik harakatini simulyatsiya qilish.",
            simulation_type="molekulyar_fizika",
            subcategory="moddaning_tuzilishi",
            html_code="""
<div class="simulation-container">
    <h1><i class="fas fa-thermometer-half"></i> Molekulalar Harakati</h1>
    <div class="controls">
        <div class="control-group">
            <label for="temperature">Harorat (K):</label>
            <input type="range" id="temperature" min="100" max="500" value="300">
            <span id="temperatureValue">300</span>
        </div>
        <div class="control-group">
            <label for="moleculeCount">Molekulalar soni:</label>
            <input type="range" id="moleculeCount" min="20" max="100" value="50">
            <span id="moleculeCountValue">50</span>
        </div>
        <button id="startBtn">Boshlash</button>
        <button id="stopBtn">To'xtatish</button>
    </div>
    <canvas id="moleculeCanvas" width="600" height="400"></canvas>
    <div class="results">
        <div class="result-item">
            <span>O'rtacha tezlik:</span>
            <span id="avgSpeed">0 m/s</span>
        </div>
        <div class="result-item">
            <span>Kinetik energiya:</span>
            <span id="kineticEnergy">0 J</span>
        </div>
    </div>
</div>
            """,
            css_code="""
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #f7df1e, #ffd32a);
    min-height: 100vh;
}

.simulation-container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 { color: #f39c12; text-align: center; margin-bottom: 30px; }

button {
    background: linear-gradient(45deg, #f39c12, #f7df1e);
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

#moleculeCanvas {
    display: block;
    margin: 20px auto;
    border: 2px solid #333;
    border-radius: 10px;
    background: #000;
}
            """,
            js_code="""
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('moleculeCanvas');
    const ctx = canvas.getContext('2d');
    
    let isRunning = false;
    let molecules = [];
    
    function createMolecules() {
        const count = parseInt(document.getElementById('moleculeCount').value);
        const temp = parseInt(document.getElementById('temperature').value);
        const speedFactor = Math.sqrt(temp / 100);
        
        molecules = [];
        for (let i = 0; i < count; i++) {
            molecules.push({
                x: Math.random() * (canvas.width - 20) + 10,
                y: Math.random() * (canvas.height - 20) + 10,
                vx: (Math.random() - 0.5) * speedFactor,
                vy: (Math.random() - 0.5) * speedFactor,
                color: `hsl(${Math.random() * 60 + 30}, 70%, 60%)`,
                mass: 1
            });
        }
        
        // Calculate average speed and kinetic energy
        let totalSpeed = 0;
        let totalKE = 0;
        molecules.forEach(mol => {
            const speed = Math.sqrt(mol.vx * mol.vx + mol.vy * mol.vy);
            totalSpeed += speed;
            totalKE += 0.5 * mol.mass * speed * speed;
        });
        
        document.getElementById('avgSpeed').textContent = (totalSpeed / molecules.length * 100).toFixed(1) + ' m/s';
        document.getElementById('kineticEnergy').textContent = (totalKE * 1000).toFixed(1) + ' J';
    }
    
    function drawMolecules() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        molecules.forEach(mol => {
            ctx.fillStyle = mol.color;
            ctx.beginPath();
            ctx.arc(mol.x, mol.y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
    
    function updateMolecules() {
        molecules.forEach(mol => {
            mol.x += mol.vx;
            mol.y += mol.vy;
            
            // Elastic collision with walls
            if (mol.x <= 4 || mol.x >= canvas.width - 4) {
                mol.vx = -mol.vx;
                mol.x = Math.max(4, Math.min(canvas.width - 4, mol.x));
            }
            if (mol.y <= 4 || mol.y >= canvas.height - 4) {
                mol.vy = -mol.vy;
                mol.y = Math.max(4, Math.min(canvas.height - 4, mol.y));
            }
        });
        
        // Simple collision detection between molecules
        for (let i = 0; i < molecules.length; i++) {
            for (let j = i + 1; j < molecules.length; j++) {
                const mol1 = molecules[i];
                const mol2 = molecules[j];
                const dx = mol2.x - mol1.x;
                const dy = mol2.y - mol1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 8) {
                    // Simple elastic collision
                    const tempVx = mol1.vx;
                    const tempVy = mol1.vy;
                    mol1.vx = mol2.vx;
                    mol1.vy = mol2.vy;
                    mol2.vx = tempVx;
                    mol2.vy = tempVy;
                    
                    // Separate molecules
                    const overlap = 8 - distance;
                    const separationX = (dx / distance) * overlap * 0.5;
                    const separationY = (dy / distance) * overlap * 0.5;
                    mol1.x -= separationX;
                    mol1.y -= separationY;
                    mol2.x += separationX;
                    mol2.y += separationY;
                }
            }
        }
    }
    
    function animate() {
        if (!isRunning) return;
        
        updateMolecules();
        drawMolecules();
        requestAnimationFrame(animate);
    }
    
    document.getElementById('startBtn').addEventListener('click', () => {
        isRunning = true;
        animate();
    });
    
    document.getElementById('stopBtn').addEventListener('click', () => {
        isRunning = false;
    });
    
    document.getElementById('temperature').addEventListener('input', (e) => {
        document.getElementById('temperatureValue').textContent = e.target.value;
        createMolecules();
        if (!isRunning) drawMolecules();
    });
    
    document.getElementById('moleculeCount').addEventListener('input', (e) => {
        document.getElementById('moleculeCountValue').textContent = e.target.value;
        createMolecules();
        if (!isRunning) drawMolecules();
    });
    
    createMolecules();
    drawMolecules();
});
            """
        )

        self.stdout.write(
            self.style.SUCCESS('Fizika bo\'limlari va qismlari uchun simulyatsiyalar muvaffaqiyatli yaratildi!')
        )
