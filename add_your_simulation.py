#!/usr/bin/env python
import os
import django

# Django konfiguratsiyasini yuklash
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'simulation_website.settings')
django.setup()

from simulations.models import Simulation

# Sizning HTML simulyatsiyangiz
html_content = """<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset    # Yangi simulyatsiya yaratish
    simulation = Simulation.objects.create(
        title="Projectile Motion - Mexanika Simulyatori",
        description="Projectile motion (tushayotgan jismlar harakati) simulyatsiyasi. Boshlang'ich tezlik, burchak, balandlik va gravitatsiya kuchini o'zgartirib, jismning trajektoriyasini kuzatishingiz mumkin. Kinematika qonunlarini amaliy o'rganish uchun mo'ljallangan.",
        html_code=html_content,
        simulation_type="mexanika",
        subcategory="kinematika"
    )>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tushayotgan Jism Simulyatsiyasi</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 28px;
        }
        
        .simulation-area {
            position: relative;
            width: 100%;
            height: 400px;
            border: 3px solid #ddd;
            margin: 20px 0;
            background: linear-gradient(to bottom, #87CEEB 0%, #87CEEB 50%, #90EE90 50%, #90EE90 100%);
            border-radius: 10px;
            overflow: hidden;
        }
        
        .ball {
            position: absolute;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle at 30% 30%, #ff6b6b, #d63031);
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            left: 50%;
            top: 10px;
            transform: translateX(-50%);
            transition: none;
        }
        
        .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin: 20px 0;
            justify-content: center;
        }
        
        .control-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .control-group label {
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }
        
        .control-group input {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            text-align: center;
            font-size: 14px;
        }
        
        .buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
        }
        
        button {
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .start-btn {
            background: linear-gradient(45deg, #00b894, #00cec9);
            color: white;
        }
        
        .stop-btn {
            background: linear-gradient(45deg, #e17055, #d63031);
            color: white;
        }
        
        .reset-btn {
            background: linear-gradient(45deg, #6c5ce7, #a29bfe);
            color: white;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .info {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #00b894;
        }
        
        .results {
            background: #f0f8ff;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #0984e3;
        }
        
        .formula {
            background: #fff3cd;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
            text-align: center;
            border: 1px solid #ffeaa7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌍 Erkin Tushish Simulyatsiyasi</h1>
        
        <div class="info">
            <h3>📚 Nazariy ma'lumot:</h3>
            <p><strong>Erkin tushish</strong> - jismning faqat og'irlik kuchi ta'sirida harakat qilishi. Havo qarshiligi hisobga olinmaydi.</p>
            <div class="formula">
                <strong>Asosiy formulalar:</strong><br>
                h = v₀t + ½gt² <br>
                v = v₀ + gt <br>
                v² = v₀² + 2gh
            </div>
        </div>
        
        <div class="simulation-area" id="simulationArea">
            <div class="ball" id="ball"></div>
        </div>
        
        <div class="controls">
            <div class="control-group">
                <label for="height">Boshlang'ich balandlik (m)</label>
                <input type="number" id="height" value="100" min="10" max="200">
            </div>
            <div class="control-group">
                <label for="velocity">Boshlang'ich tezlik (m/s)</label>
                <input type="number" id="velocity" value="0" min="0" max="50">
            </div>
            <div class="control-group">
                <label for="gravity">Erkin tushish tezlanishi (m/s²)</label>
                <input type="number" id="gravity" value="9.8" min="1" max="20" step="0.1">
            </div>
        </div>
        
        <div class="buttons">
            <button class="start-btn" onclick="startSimulation()">▶ Boshlash</button>
            <button class="stop-btn" onclick="stopSimulation()">⏸ To'xtatish</button>
            <button class="reset-btn" onclick="resetSimulation()">🔄 Qayta boshlash</button>
        </div>
        
        <div class="results" id="results">
            <h3>📊 Natijalar:</h3>
            <p>Simulyatsiyani boshlang, natijalarni ko'rish uchun...</p>
        </div>
    </div>

    <script>
        let animationId;
        let startTime;
        let isRunning = false;
        
        function startSimulation() {
            if (isRunning) return;
            
            const height = parseFloat(document.getElementById('height').value);
            const initialVelocity = parseFloat(document.getElementById('velocity').value);
            const gravity = parseFloat(document.getElementById('gravity').value);
            
            if (height <= 0 || gravity <= 0) {
                alert('Iltimos, musbat qiymatlarni kiriting!');
                return;
            }
            
            isRunning = true;
            startTime = Date.now();
            
            const ball = document.getElementById('ball');
            const simulationArea = document.getElementById('simulationArea');
            const areaHeight = simulationArea.offsetHeight;
            const ballHeight = ball.offsetHeight;
            const maxDistance = areaHeight - ballHeight - 10;
            
            // Vaqt hisoblagichi
            const scale = maxDistance / height; // piksel/metr nisbati
            
            function animate() {
                const currentTime = Date.now();
                const elapsedTime = (currentTime - startTime) / 1000; // sekundlarda
                
                // Fizika hisoblari
                const distance = initialVelocity * elapsedTime + 0.5 * gravity * elapsedTime * elapsedTime;
                const currentVelocity = initialVelocity + gravity * elapsedTime;
                
                // Ekranda ko'rsatish uchun piksel pozitsiyasi
                const pixelPosition = distance * scale;
                
                if (pixelPosition < maxDistance) {
                    ball.style.top = (10 + pixelPosition) + 'px';
                    
                    // Natijalarni yangilash
                    updateResults(elapsedTime, distance, currentVelocity, height - distance);
                    
                    animationId = requestAnimationFrame(animate);
                } else {
                    // Yerga yetdi
                    ball.style.top = (10 + maxDistance) + 'px';
                    
                    // Yakuniy natijalar
                    const finalTime = Math.sqrt(2 * height / gravity);
                    const finalVelocity = Math.sqrt(initialVelocity * initialVelocity + 2 * gravity * height);
                    
                    updateResults(finalTime, height, finalVelocity, 0, true);
                    stopSimulation();
                }
            }
            
            animate();
        }
        
        function stopSimulation() {
            isRunning = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        }
        
        function resetSimulation() {
            stopSimulation();
            const ball = document.getElementById('ball');
            ball.style.top = '10px';
            
            document.getElementById('results').innerHTML = `
                <h3>📊 Natijalar:</h3>
                <p>Simulyatsiyani boshlang, natijalarni ko'rish uchun...</p>
            `;
        }
        
        function updateResults(time, distance, velocity, remainingHeight, isFinal = false) {
            const resultsDiv = document.getElementById('results');
            const status = isFinal ? '✅ Jism yerga yetdi!' : '🔄 Harakatda...';
            
            resultsDiv.innerHTML = `
                <h3>📊 Natijalar: ${status}</h3>
                <p><strong>Vaqt:</strong> ${time.toFixed(2)} sekund</p>
                <p><strong>Bosib o'tilgan masofa:</strong> ${distance.toFixed(2)} metr</p>
                <p><strong>Joriy tezlik:</strong> ${velocity.toFixed(2)} m/s</p>
                <p><strong>Qolgan balandlik:</strong> ${remainingHeight.toFixed(2)} metr</p>
                ${isFinal ? '<p><strong>🎯 Simulyatsiya tugadi!</strong></p>' : ''}
            `;
        }
        
        // Klaviatura boshqaruvi
        document.addEventListener('keydown', function(event) {
            switch(event.key) {
                case ' ':
                case 'Enter':
                    event.preventDefault();
                    if (isRunning) {
                        stopSimulation();
                    } else {
                        startSimulation();
                    }
                    break;
                case 'Escape':
                    resetSimulation();
                    break;
            }
        });
        
        // Boshlang'ich holat
        resetSimulation();
    </script>
</body>
</html>"""

def add_simulation():
    """Sizning simulyatsiyangizni qo'shish"""
    
    # Avval shu nomdagi simulyatsiya bor yoki yo'qligini tekshiramiz
    existing = Simulation.objects.filter(title="Projectile Motion - Mexanika Simulyatori").first()
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
        title="Projectile Motion - Mexanika Simulyatori",
        description="Projectile motion (tushayotgan jismlar harakati) simulyatsiyasi. Boshlang'ich tezlik, burchak, balandlik va gravitatsiya kuchini o'zgartirib, jismning trajektoriyasini kuzatishingiz mumkin. Kinematika qonunlarini amaliy o'rganish uchun mo'ljallangan.",
        html_code=html_content,
        simulation_type="mexanika",
        subcategory="kinematika"
    )
    
    print(f"🎉 Simulyatsiya muvaffaqiyatli qo'shildi!")
    print(f"📝 ID: {simulation.id}")
    print(f"📋 Sarlavha: {simulation.title}")
    print(f"🔗 URL: http://127.0.0.1:8000/simulation/{simulation.id}/")

if __name__ == "__main__":
    add_simulation()
