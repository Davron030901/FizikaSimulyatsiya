from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.views.generic import ListView, DetailView
from .models import Simulation


class HomeView(ListView):
    model = Simulation
    template_name = 'simulations/home.html'
    context_object_name = 'simulations'
    paginate_by = 12
    
    def get_queryset(self):
        queryset = Simulation.objects.all()
        section = self.request.GET.get('section')
        subcategory = self.request.GET.get('subcategory')
        
        if section:
            queryset = queryset.filter(simulation_type=section)
        if subcategory:
            queryset = queryset.filter(subcategory=subcategory)
            
        return queryset
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['current_section'] = self.request.GET.get('section')
        context['current_subcategory'] = self.request.GET.get('subcategory')
        context['sections'] = Simulation.SIMULATION_TYPES
        
        # Agar section tanlangan bo'lsa, uning qismlarini ham yuborish
        current_section = self.request.GET.get('section')
        if current_section:
            context['subcategories'] = Simulation.get_subcategories_for_type(current_section)
        
        return context


class SimulationDetailView(DetailView):
    model = Simulation
    template_name = 'simulations/detail.html'
    context_object_name = 'simulation'


def run_simulation(request, pk):
    simulation = get_object_or_404(Simulation, pk=pk)
    
    # Universal responsive CSS va touch support
    responsive_css = """
        /* Universal Responsive fixes */
        * {
            box-sizing: border-box;
        }
        
        html {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        body {
            touch-action: manipulation;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Touch-friendly controls */
        input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            height: 8px !important;
            background: rgba(255, 255, 255, 0.3) !important;
            outline: none !important;
            border-radius: 4px !important;
            touch-action: none !important;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px !important;
            height: 24px !important;
            border-radius: 50% !important;
            background: #4CAF50 !important;
            cursor: pointer !important;
            border: 2px solid white !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3) !important;
        }
        
        input[type="range"]::-moz-range-thumb {
            width: 24px !important;
            height: 24px !important;
            border-radius: 50% !important;
            background: #4CAF50 !important;
            cursor: pointer !important;
            border: 2px solid white !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3) !important;
        }
        
        /* Touch-friendly buttons */
        button {
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            min-height: 44px !important;
            min-width: 44px !important;
            cursor: pointer !important;
            user-select: none !important;
        }
        
        button:active {
            transform: scale(0.98) !important;
        }
        
        /* Canvas touch optimization */
        canvas {
            touch-action: none !important;
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            -khtml-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
        }
        
        /* Desktop optimizations */
        @media (min-width: 1200px) {
            .container {
                max-width: 1400px !important;
            }
            canvas {
                max-height: 600px !important;
            }
        }
        
        /* Tablet optimizations */
        @media (min-width: 768px) and (max-width: 1199px) {
            .main-content, .simulator-container {
                grid-template-columns: 1fr !important;
                gap: 20px !important;
            }
            
            .controls {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 15px !important;
            }
            
            canvas {
                max-height: 400px !important;
            }
        }
        
        /* Mobile optimizations */
        @media (max-width: 767px) {
            body { 
                padding: 5px !important; 
                margin: 0 !important; 
                font-size: 14px !important;
            }
            
            .container { 
                padding: 15px !important; 
                margin: 5px !important;
                border-radius: 10px !important;
            }
            
            .main-content, .simulator-container {
                grid-template-columns: 1fr !important;
                gap: 15px !important;
            }
            
            .controls {
                grid-template-columns: 1fr !important;
                gap: 10px !important;
                padding: 15px !important;
            }
            
            .control-group {
                margin-bottom: 15px !important;
            }
            
            .control-group label {
                font-size: 16px !important;
                margin-bottom: 10px !important;
            }
            
            .buttons {
                display: grid !important;
                grid-template-columns: 1fr !important;
                gap: 12px !important;
            }
            
            button {
                width: 100% !important;
                padding: 16px !important;
                font-size: 18px !important;
                border-radius: 12px !important;
            }
            
            canvas {
                width: 100% !important;
                max-height: 280px !important;
            }
            
            .canvas-container {
                padding: 10px !important;
                overflow-x: auto !important;
            }
            
            .info-grid, .results {
                grid-template-columns: 1fr !important;
                gap: 10px !important;
            }
            
            .graphs-container {
                grid-template-columns: 1fr !important;
                gap: 15px !important;
            }
            
            h1 {
                font-size: 1.8em !important;
                text-align: center !important;
                margin-bottom: 20px !important;
            }
            
            .formula {
                font-size: 13px !important;
                overflow-x: auto !important;
                padding: 12px !important;
                white-space: nowrap !important;
            }
            
            .result-card {
                padding: 12px !important;
                min-height: 80px !important;
            }
            
            .result-value {
                font-size: 1.3em !important;
            }
            
            .value-display {
                font-size: 16px !important;
                padding: 10px !important;
            }
        }
        
        /* Very small screens */
        @media (max-width: 480px) {
            body { 
                font-size: 13px !important;
                padding: 3px !important;
            }
            
            .container { 
                padding: 12px !important;
                margin: 2px !important;
            }
            
            h1 { 
                font-size: 1.5em !important; 
                margin-bottom: 15px !important;
            }
            
            canvas { 
                max-height: 220px !important;
            }
            
            .formula { 
                font-size: 11px !important;
            }
            
            .control-group label {
                font-size: 14px !important;
            }
            
            button {
                padding: 14px !important;
                font-size: 16px !important;
            }
        }
        
        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            canvas {
                image-rendering: -webkit-optimize-contrast !important;
                image-rendering: crisp-edges !important;
            }
        }
        
        /* Print styles */
        @media print {
            body { 
                background: white !important; 
                color: black !important;
            }
            .container {
                box-shadow: none !important;
                background: white !important;
            }
            .controls, .buttons {
                display: none !important;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            /* Already dark, no changes needed */
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            button {
                transition: none !important;
            }
            
            button:hover {
                transform: none !important;
            }
        }
        
        /* Landscape orientation on mobile */
        @media (max-width: 767px) and (orientation: landscape) {
            .simulator-container {
                grid-template-columns: 1fr 300px !important;
            }
            
            canvas {
                max-height: 200px !important;
            }
            
            .controls {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }
    """
    
    # Touch event support JavaScript
    touch_js = """
        // Touch events va responsive support
        document.addEventListener('DOMContentLoaded', function() {
            // Disable zoom on double tap
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
            
            // Canvas touch optimization
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach(canvas => {
                // Prevent scrolling when touching canvas
                canvas.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                }, { passive: false });
                
                canvas.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                }, { passive: false });
                
                canvas.addEventListener('touchend', function(e) {
                    e.preventDefault();
                }, { passive: false });
                
                // Resize canvas for high DPI
                const ctx = canvas.getContext('2d');
                const devicePixelRatio = window.devicePixelRatio || 1;
                const rect = canvas.getBoundingClientRect();
                
                canvas.width = rect.width * devicePixelRatio;
                canvas.height = rect.height * devicePixelRatio;
                canvas.style.width = rect.width + 'px';
                canvas.style.height = rect.height + 'px';
                
                ctx.scale(devicePixelRatio, devicePixelRatio);
            });
            
            // Range input touch improvement
            const ranges = document.querySelectorAll('input[type="range"]');
            ranges.forEach(range => {
                range.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(1.1)';
                });
                
                range.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                });
            });
            
            // Button haptic feedback (if supported)
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('touchstart', function() {
                    if (navigator.vibrate) {
                        navigator.vibrate(10); // 10ms vibration
                    }
                });
            });
            
            // Responsive canvas resizing
            function resizeCanvases() {
                canvases.forEach(canvas => {
                    const container = canvas.parentElement;
                    const containerWidth = container.offsetWidth - 40;
                    const maxWidth = window.innerWidth < 768 ? window.innerWidth - 50 : 800;
                    canvas.style.width = Math.min(containerWidth, maxWidth) + 'px';
                    
                    // Trigger custom resize event if simulator has one
                    if (window.ProjectileSimulator && typeof window.ProjectileSimulator.prototype.resizeCanvas === 'function') {
                        const simulator = window.simulatorInstance;
                        if (simulator && simulator.resizeCanvas) {
                            simulator.resizeCanvas();
                        }
                    }
                });
            }
            
            window.addEventListener('resize', resizeCanvases);
            window.addEventListener('orientationchange', function() {
                setTimeout(resizeCanvases, 100);
            });
            
            // Initial resize
            resizeCanvases();
            
            // Fix iOS viewport issues
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                window.addEventListener('orientationchange', function() {
                    setTimeout(function() {
                        window.scrollTo(0, 1);
                    }, 500);
                });
            }
        });
    """
    
    # Simulyatsiya kodlarini birlashtirish
    html_content = f"""
    <!DOCTYPE html>
    <html lang="uz">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, maximum-scale=5.0, minimum-scale=0.5">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <title>{simulation.title}</title>
        <style>
            {simulation.css_code}
            {responsive_css}
        </style>
    </head>
    <body>
        {simulation.html_code}
        <script>
            {simulation.js_code}
            {touch_js}
        </script>
    </body>
    </html>
    """
    
    return HttpResponse(html_content)
