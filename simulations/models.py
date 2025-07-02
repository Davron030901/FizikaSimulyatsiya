from django.db import models
from django.urls import reverse


class Simulation(models.Model):
    SIMULATION_TYPES = [
        ('mexanika', 'Mexanika'),
        ('molekulyar_fizika', 'Molekulyar fizika va termodinamika'),
        ('elektrodinamika', 'Elektrodinamika (elektr va magnit hodisalari)'),
        ('optika', 'Optika'),
        ('atom_yadro', 'Atom va yadro fizikasi'),
    ]
    
    SUBCATEGORIES = [
        # Mexanika qismlari
        ('kinematika', 'Kinematika'),
        ('dinamika', 'Dinamika'),
        ('statika', 'Statika'),
        
        # Molekulyar fizika va termodinamika qismlari
        ('moddaning_tuzilishi', 'Moddaning tuzilishi'),
        ('issiqlik_almashinuvi', 'Issiqlik almashinuvi'),
        ('termodinamika_qonunlari', 'Termodinamika qonunlari'),
        
        # Elektrodinamika qismlari
        ('elektrostatika', 'Elektrostatika'),
        ('doimiy_tok', 'Doimiy tok'),
        ('magnit_maydon', 'Magnit maydon va induksiya'),
        ('ozgaruvchan_tok', "O'zgaruvchan tok"),
        
        # Optika qismlari
        ('geometrik_optika', 'Geometrik optika'),
        ('tolqinli_optika', "To'lqinli optika"),
        
        # Atom va yadro fizikasi qismlari
        ('atom_tuzilishi', 'Atom tuzilishi'),
        ('radioaktivlik', 'Radioaktivlik'),
        ('yadro_fizikasi', 'Yadro fizikasi'),
        ('elementar_zarrachalar', 'Elementar zarrachalar'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="Sarlavha")
    description = models.TextField(verbose_name="Tavsif")
    simulation_type = models.CharField(
        max_length=20, 
        choices=SIMULATION_TYPES, 
        verbose_name="Simulyatsiya turi"
    )
    subcategory = models.CharField(
        max_length=30, 
        choices=SUBCATEGORIES, 
        verbose_name="Qism",
        blank=True,
        null=True
    )
    html_code = models.TextField(verbose_name="HTML kodi")
    css_code = models.TextField(blank=True, verbose_name="CSS kodi")
    js_code = models.TextField(blank=True, verbose_name="JavaScript kodi")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Simulyatsiya"
        verbose_name_plural = "Simulyatsiyalar"
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('simulation_detail', kwargs={'pk': self.pk})
    
    @classmethod
    def get_subcategories_for_type(cls, simulation_type):
        """Berilgan simulyatsiya turi uchun qismlarni qaytarish"""
        subcategory_mapping = {
            'mexanika': [
                ('kinematika', 'Kinematika'),
                ('dinamika', 'Dinamika'),
                ('statika', 'Statika'),
            ],
            'molekulyar_fizika': [
                ('moddaning_tuzilishi', 'Moddaning tuzilishi'),
                ('issiqlik_almashinuvi', 'Issiqlik almashinuvi'),
                ('termodinamika_qonunlari', 'Termodinamika qonunlari'),
            ],
            'elektrodinamika': [
                ('elektrostatika', 'Elektrostatika'),
                ('doimiy_tok', 'Doimiy tok'),
                ('magnit_maydon', 'Magnit maydon va induksiya'),
                ('ozgaruvchan_tok', "O'zgaruvchan tok"),
            ],
            'optika': [
                ('geometrik_optika', 'Geometrik optika'),
                ('tolqinli_optika', "To'lqinli optika"),
            ],
            'atom_yadro': [
                ('atom_tuzilishi', 'Atom tuzilishi'),
                ('radioaktivlik', 'Radioaktivlik'),
                ('yadro_fizikasi', 'Yadro fizikasi'),
                ('elementar_zarrachalar', 'Elementar zarrachalar'),
            ],
        }
        return subcategory_mapping.get(simulation_type, [])
