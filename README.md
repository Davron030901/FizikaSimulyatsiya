# Fizika Simulyatsiyalari Website

Django-da yaratilgan fizika simulyatsiyalarini ko'rish va o'rganish platformasi. Turli fizika bo'limlari bo'yicha interaktiv simulyatsiyalar.

## Xususiyatlar

### � Fizika bo'limlari
- **Kinematika**: Harakat simulyatsiyalari (gorizontal otilgan jism, parabola harakat)
- **Dinamika**: Kuch va harakat (matematik mayatnik, tebranish)
- **Termodinamika**: Issiqlik va gaz (ideal gaz molekulalari)
- **Elektr**: Elektr hodisalari
- **Optika**: Yorug'lik va optik hodisalar

### 🎯 Asosiy funksiyalar
- **Interaktiv simulyatsiyalar**: Real vaqtda parametrlarni o'zgartirish
- **Vizual ko'rsatish**: Canvas yordamida grafik simulyatsiyalar
- **Matematik hisoblashlar**: Fizika formulalari va natijalar
- **Oddiy interfeys**: Foydalanuvchi uchun qulay dizayn
- **Admin panel**: Simulyatsiyalarni boshqarish

### 🎨 Texnologiyalar
- **Backend**: Django + Python
- **Frontend**: HTML5, CSS3, JavaScript (Canvas API)
- **Template Engine**: Django Templates
- **Database**: SQLite (development)
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: Font Awesome
- **Graphics**: HTML5 Canvas

## O'rnatish va ishga tushirish

### 1. Repository klonlash
```bash
git clone <repository-url>
cd App_Simulations
```

### 2. Virtual environment yaratish
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac
```

### 3. Paketlarni o'rnatish
```bash
pip install -r requirements.txt
```

### 5. Namuna simulyatsiyalar yaratish
```bash
python manage.py create_sample_data
```

### 6. Serverni ishga tushirish
```bash
python manage.py runserver
```

Websiteni [http://127.0.0.1:8000](http://127.0.0.1:8000) manzilida ko'rish mumkin.

## Foydalanish

### Simulyatsiyalarni ko'rish
- Bosh sahifada barcha mavjud fizika simulyatsiyalar ko'rsatiladi
- Har bir simulyatsiya kartasida qisqacha tavsif bor
- "Ko'rish" tugmasi bilan batafsil ma'lumot olish mumkin
- "Ishga tushirish" tugmasi bilan simulyatsiyani ishlatish mumkin

### Admin panel orqali simulyatsiya qo'shish
1. `/admin/` manziliga kiring
2. Superuser hisobi bilan kiring
3. "Simulyatsiyalar" bo'limida "Qo'shish" tugmasini bosing
4. Kerakli ma'lumotlarni kiriting:
   - Sarlavha va tavsif
   - Fizika bo'limi (kinematika, dinamika, va h.k.)
   - HTML, CSS va JavaScript kodlar
5. Saqlang

## Proyekt strukturasi

```
App_Simulations/
├── simulation_website/          # Asosiy Django proyekt
│   ├── settings.py             # Sozlamalar
│   ├── urls.py                 # URL marshrutlari
│   └── wsgi.py                 # WSGI konfiguratsiya
├── simulations/                # Simulyatsiyalar app
│   ├── models.py               # Ma'lumotlar modellari
│   ├── views.py                # Ko'rinishlar
│   ├── admin.py                # Admin panel
│   ├── urls.py                 # App URL-lari
│   └── management/commands/    # Management commandlar
├── templates/                  # HTML templatelar
│   ├── base.html               # Asosiy template
│   └── simulations/            # Simulyatsiya templatelari
├── requirements.txt            # Python paketlari
└── manage.py                   # Django management script
```

## Models (Ma'lumotlar modellari)

### Simulation
- `title`: Simulyatsiya sarlavhasi
- `description`: Tavsif
- `simulation_type`: Fizika bo'limi (kinematika/dinamika/termodinamika/elektr/optika)
- `html_code`: HTML kodi
- `css_code`: CSS kodi
- `js_code`: JavaScript kodi
- `created_at`: Yaratilgan vaqt

## Fizika simulyatsiyalari namunalari

### Kinematika
- **Gorizontal otilgan jism**: Parabola harakat simulyatsiyasi
- Tezlik, burchak va balandlikni o'zgartirish imkoniyati
- Real vaqtda fizika hisoblashlar

### Dinamika  
- **Matematik mayatnik**: Tebranish harakati simulyatsiyasi
- Uzunlik va boshlang'ich burchakni sozlash
- Period va chastota hisoblashlar

### Termodinamika
- **Ideal gaz molekulalari**: Gaz molekulalarining harakati
- Harorat ta'sirini ko'rsatish
- Molekular kinetik nazariya
python manage.py migrate
```

### 5. Superuser yaratish
```bash
python manage.py createsuperuser
```

### 6. Serverni ishga tushirish
```bash
python manage.py runserver
```

Websiteni [http://127.0.0.1:8000](http://127.0.0.1:8000) manzilida ko'rish mumkin.

## Proyekt strukturasi

```
App_Simulations/
├── simulation_website/          # Asosiy Django proyekt
│   ├── settings.py             # Sozlamalar
│   ├── urls.py                 # URL marshrutlari
│   └── wsgi.py                 # WSGI konfiguratsiya
├── simulations/                # Simulyatsiyalar app
│   ├── models.py               # Ma'lumotlar modellari
│   ├── views.py                # Ko'rinishlar
│   ├── forms.py                # Formalar
│   ├── admin.py                # Admin panel
│   └── urls.py                 # App URL-lari
├── accounts/                   # Foydalanuvchilar app
│   ├── models.py               # Foydalanuvchi modellari
│   ├── views.py                # Autentifikatsiya ko'rinishlari
│   ├── forms.py                # Ro'yxatdan o'tish/kirish formalar
│   └── urls.py                 # Account URL-lari
├── templates/                  # HTML templatelar
│   ├── base.html               # Asosiy template
│   ├── simulations/            # Simulyatsiya templatelari
│   └── accounts/               # Account templatelari
├── static/                     # Static fayllar
│   ├── css/                    # CSS fayllar
│   └── js/                     # JavaScript fayllar
├── media/                      # Yuklangan fayllar
├── requirements.txt            # Python paketlari
└── manage.py                   # Django management script
```

## Foydalanish

### Simulyatsiya yaratish
1. Websitega kiring yoki ro'yxatdan o'ting
2. "Yangi yaratish" tugmasini bosing
3. Simulyatsiya ma'lumotlarini kiriting:
   - Sarlavha va tavsif
   - Simulyatsiya turi (HTML, CSS, JavaScript)
   - Kod yozing (HTML, CSS, JS)
4. "Saqlash" tugmasini bosing

### Simulyatsiyalarni ko'rish
- Bosh sahifada barcha ochiq simulyatsiyalar ko'rsatiladi
- "Ko'rish" tugmasi bilan batafsil ma'lumot olish mumkin
- "Ishga tushirish" tugmasi bilan simulyatsiyani ishlatish mumkin

### Simulyatsiyalarni boshqarish
- "Mening simulyatsiyalarim" bo'limida o'z simulyatsiyalaringizni ko'ring
- Tahrirlash, o'chirish va holat o'zgartirish mumkin

## Models (Ma'lumotlar modellari)

### Simulation
- `title`: Simulyatsiya sarlavhasi
- `description`: Tavsif
- `simulation_type`: Turi (HTML/CSS/JavaScript)
- `html_code`: HTML kodi
- `css_code`: CSS kodi
- `js_code`: JavaScript kodi
- `created_by`: Yaratuvchi foydalanuvchi
- `is_public`: Ochiq/yopiq holati

### Comment
- `simulation`: Simulyatsiya (ForeignKey)
- `user`: Foydalanuvchi (ForeignKey)
- `content`: Izoh matni
- `created_at`: Yaratilgan vaqt

### Like
- `simulation`: Simulyatsiya (ForeignKey)
- `user`: Foydalanuvchi (ForeignKey)
- `created_at`: Yaratilgan vaqt

## Hissa qo'shish

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. O'zgarishlarni commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Branch-ni push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request yarating

## Litsenziya

Bu proyekt MIT litsenziyasi ostida chiqarilgan. Batafsil ma'lumot uchun `LICENSE` faylini ko'ring.

## Muallif

**Simulyatsiyalar Jamoasi** - Eng yaxshi web simulyatsiyalar platformasi

## Qo'llab-quvvatlash

Agar savollaringiz bo'lsa, muammo bilan duch kelsangiz yoki takliflaringiz bo'lsa:

- Issue yarating GitHub-da
- Email jo'nating: support@simulations.uz
- Telegram orqali murojaat qiling: @simulations_support
