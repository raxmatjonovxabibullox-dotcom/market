export const INITIAL_PRODUCTS = [
  {
    id: "p1",
    title: "iPhone 16 Pro Max 256GB Natural Titanium",
    category: "cat_smartphones",
    price: 1399,
    oldPrice: 1549,
    stock: 12,
    rating: 4.9,
    reviewsCount: 48,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
    description: "A18 Pro chip, titanium design with Camera Control, 48MP Fusion camera system, and extraordinary battery life.",
    specs: {
      Screen: "6.9-inch Super Retina XDR OLED",
      Chip: "Apple A18 Pro (3nm)",
      Camera: "48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto",
      Battery: "4685 mAh",
      OS: "iOS 18"
    }
  },
  {
    id: "p2",
    title: "Samsung Galaxy S25 Ultra 5G 512GB",
    category: "cat_smartphones",
    price: 1299,
    oldPrice: 1429,
    stock: 8,
    rating: 4.8,
    reviewsCount: 34,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    description: "Snapdragon 8 Elite Processor, Built-in S-Pen, 200MP AI Camera with Galaxy AI features.",
    specs: {
      Screen: "6.8-inch Dynamic AMOLED 2X 120Hz",
      Chip: "Snapdragon 8 Elite for Galaxy",
      Camera: "200MP + 50MP + 10MP + 50MP",
      Battery: "5000 mAh 45W Fast Charging",
      OS: "Android 15 (One UI 7)"
    }
  },
  {
    id: "p3",
    title: "MacBook Pro 16 M3 Max 36GB / 1TB SSD Space Black",
    category: "cat_laptops",
    price: 3499,
    oldPrice: 3799,
    stock: 5,
    rating: 5.0,
    reviewsCount: 19,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    description: "Ultimate workstation power with Apple M3 Max 16-core CPU, 40-core GPU, Liquid Retina XDR display.",
    specs: {
      CPU: "Apple M3 Max 16-core",
      RAM: "36GB Unified Memory",
      Storage: "1TB NVMe SSD",
      Display: "16.2-inch Liquid Retina XDR 120Hz ProMotion",
      Weight: "2.14 kg"
    }
  },
  {
    id: "p4",
    title: "Sony WH-1000XM5 Noise Canceling Headphones",
    category: "cat_audio",
    price: 389,
    oldPrice: 449,
    stock: 18,
    rating: 4.9,
    reviewsCount: 92,
    isFlashSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    description: "Industry-leading noise canceling with two processors and eight microphones for unprecedented sound purity.",
    specs: {
      Battery: "Up to 30 Hours with ANC",
      Connectivity: "Bluetooth 5.2 & Multi-point",
      Drivers: "30mm Precision Engineered",
      Weight: "250g"
    }
  },
  {
    id: "p5",
    title: "Apple Watch Ultra 2 GPS + Cellular 49mm Titanium",
    category: "cat_watches",
    price: 799,
    oldPrice: 899,
    stock: 7,
    rating: 4.9,
    reviewsCount: 27,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop",
    description: "The ultimate sports and adventure watch. S9 SiP with Double Tap gesture, brightest display ever.",
    specs: {
      Case: "49mm Aerospace Titanium",
      Brightness: "3000 nits Peak",
      WaterResistance: "100m (EN13319)",
      Battery: "36 Hours Normal / 72 Hours Low Power"
    }
  },
  {
    id: "p6",
    title: "ASUS ROG Strix SCAR 18 i9-14900HX RTX 4090",
    category: "cat_gaming",
    price: 3899,
    oldPrice: 4199,
    stock: 4,
    rating: 4.9,
    reviewsCount: 15,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop",
    description: "Dominant gaming horsepower featuring 18-inch ROG Nebula HDR display, liquid metal cooling, 64GB RAM.",
    specs: {
      CPU: "Intel Core i9-14900HX",
      GPU: "NVIDIA GeForce RTX 4090 16GB",
      RAM: "64GB DDR5 5600MHz",
      Storage: "2TB PCIe 4.0 NVMe SSD"
    }
  },
  {
    id: "p7",
    title: "AirPods Pro 2nd Gen USB-C Active Noise Cancellation",
    category: "cat_audio",
    price: 239,
    oldPrice: 279,
    stock: 25,
    rating: 4.8,
    reviewsCount: 110,
    isFlashSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop",
    description: "H2 chip powered active noise cancellation, Adaptive Audio, and personalized Spatial Audio.",
    specs: {
      Chip: "Apple H2 Headphone Chip",
      Case: "MagSafe Charging Case (USB-C) with Speaker",
      Battery: "Up to 6 hours listening time"
    }
  },
  {
    id: "p8",
    title: "Anker Prime 20,000mAh Power Bank 200W Output",
    category: "cat_accessories",
    price: 119,
    oldPrice: 149,
    stock: 30,
    rating: 4.7,
    reviewsCount: 64,
    isFlashSale: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop",
    description: "Ultra-fast multi-device charging with smart digital display and compact portable body.",
    specs: {
      Capacity: "20,000mAh (72Wh)",
      Output: "Max 200W Combined",
      Ports: "2x USB-C, 1x USB-A"
    }
  },
  {
    id: "p9",
    title: "Google Pixel 9 Pro XL 256GB Obsidian",
    category: "cat_smartphones",
    price: 1099,
    oldPrice: 1199,
    stock: 15,
    rating: 4.8,
    reviewsCount: 32,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
    description: "Gemini AI integratsiyasi, Google Tensor G4 protsessori va ilg'or 50MP pro kamera tizimi.",
    specs: {
      Screen: "6.8-inch Super Actua LTPO OLED 120Hz",
      Chip: "Google Tensor G4 (4nm)",
      Camera: "50MP Main + 48MP Ultra Wide + 48MP Telephoto",
      Battery: "5060 mAh 37W Fast Charging",
      OS: "Android 15"
    }
  },
  {
    id: "p10",
    title: "Xiaomi 15 Ultra Leica Optics 512GB",
    category: "cat_smartphones",
    price: 1049,
    oldPrice: 1199,
    stock: 10,
    rating: 4.8,
    reviewsCount: 28,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=800&auto=format&fit=crop",
    description: "Leica professional optikasi, Snapdragon 8 Elite va 90W giper tezkor quvvatlash.",
    specs: {
      Screen: "6.73-inch AMOLED 2K 120Hz Dolby Vision",
      Chip: "Qualcomm Snapdragon 8 Elite",
      Camera: "50MP 1-inch sensor Leica Quad Camera",
      Battery: "6000 mAh 90W Wired + 80W Wireless",
      OS: "HyperOS 2.0"
    }
  },
  {
    id: "p11",
    title: "MacBook Air 15 M3 16GB / 512GB Midnight",
    category: "cat_laptops",
    price: 1499,
    oldPrice: 1699,
    stock: 14,
    rating: 4.9,
    reviewsCount: 54,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop",
    description: "Yupqa va yengil alyuminiy korpus, M3 chipining mislsiz unumdorligi va 18 soatgacha batareya.",
    specs: {
      CPU: "Apple M3 8-core CPU / 10-core GPU",
      RAM: "16GB Unified Memory",
      Storage: "512GB SSD",
      Display: "15.3-inch Liquid Retina Display",
      Weight: "1.51 kg"
    }
  },
  {
    id: "p12",
    title: "Dell XPS 16 OLED Core Ultra 9 32GB RTX 4070",
    category: "cat_laptops",
    price: 2899,
    oldPrice: 3199,
    stock: 6,
    rating: 4.8,
    reviewsCount: 22,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop",
    description: "Mukammal 4K OLED sensorli ekran, Intel Core Ultra 9 va kuchli NVIDIA RTX 4070 grafikasi.",
    specs: {
      CPU: "Intel Core Ultra 9 185H",
      GPU: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      RAM: "32GB LPDDR5X",
      Storage: "1TB PCIe Gen4 SSD",
      Display: "16.3-inch 4K+ OLED Touchscreen"
    }
  },
  {
    id: "p13",
    title: "Lenovo ThinkPad X1 Carbon Gen 12 Ultralight",
    category: "cat_laptops",
    price: 1899,
    oldPrice: 2099,
    stock: 8,
    rating: 4.9,
    reviewsCount: 38,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop",
    description: "Biznes uchun afsonaviy mustahkam uglerod tolali korpus va qulay ergonomik klaviatura.",
    specs: {
      CPU: "Intel Core Ultra 7 155H",
      RAM: "32GB LPDDR5X",
      Storage: "1TB NVMe SSD",
      Display: "14-inch 2.8K OLED 120Hz",
      Weight: "1.09 kg"
    }
  },
  {
    id: "p14",
    title: "Marshall Major IV Wireless Bluetooth Headphones",
    category: "cat_audio",
    price: 149,
    oldPrice: 179,
    stock: 24,
    rating: 4.8,
    reviewsCount: 86,
    isFlashSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
    description: "Afsonaviy Marshall ovoz sifati, 80+ soat simsiz tinglash va qulay buklanuvchi dizayn.",
    specs: {
      Battery: "80+ Hours Wireless Playtime",
      Charging: "Wireless Charging + Quick Charge (15min = 15hrs)",
      Drivers: "40mm Dynamic",
      Connectivity: "Bluetooth 5.0 / 3.5mm Jack"
    }
  },
  {
    id: "p15",
    title: "JBL Boombox 3 Wi-Fi & Bluetooth Massive Bass",
    category: "cat_audio",
    price: 499,
    oldPrice: 599,
    stock: 11,
    rating: 4.9,
    reviewsCount: 41,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
    description: "Katta quvvatli bass va Dolby Atmos qo'llab-quvvatlovi bilan kuchli portativ karnay.",
    specs: {
      Power: "180W RMS (AC mode) / 136W (Battery)",
      Battery: "Up to 24 Hours",
      Protection: "IP67 Suv va changdan himoya",
      Features: "Wi-Fi, Bluetooth 5.3, Built-in Powerbank"
    }
  },
  {
    id: "p16",
    title: "Samsung Galaxy Watch Ultra 47mm LTE Titanium",
    category: "cat_watches",
    price: 649,
    oldPrice: 729,
    stock: 9,
    rating: 4.8,
    reviewsCount: 35,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
    description: "Ekstremal sport va faol hayot tarzi uchun titan korpus va ikki chastotali GPS.",
    specs: {
      Case: "47mm Grade 4 Titanium",
      Display: "1.5-inch Super AMOLED 3000 nits",
      Battery: "590 mAh (100 soatgacha energiya tejash rejimida)",
      Durability: "10 ATM + IP68 + MIL-STD-810H"
    }
  },
  {
    id: "p17",
    title: "Garmin Fenix 7X Pro Solar Sapphire Multisport",
    category: "cat_watches",
    price: 899,
    oldPrice: 999,
    stock: 5,
    rating: 5.0,
    reviewsCount: 48,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    description: "Quyosh batareyasi orqali zaryadlanuvchi safir oynali professional sport soati.",
    specs: {
      Lens: "Power Sapphire Solar Charging",
      Battery: "37 kungacha (quyosh quvvati bilan)",
      Flashlight: "O'rnatilgan ko'p rejimli LED chiroq",
      Navigation: "TopoActive xaritalar va ko'p polosali GNSS"
    }
  },
  {
    id: "p18",
    title: "Apple Watch Series 10 Jet Black 46mm GPS",
    category: "cat_watches",
    price: 429,
    oldPrice: 479,
    stock: 16,
    rating: 4.9,
    reviewsCount: 63,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?q=80&w=800&auto=format&fit=crop",
    description: "Tarixdagi eng yupqa Apple Watch, yanada keng ko'rish burchagiga ega OLED displey.",
    specs: {
      Chip: "Apple S10 SiP 64-bit dual-core",
      Display: "Wide-angle OLED Always-On Retina",
      Sensors: "EKG, Qon kislorodi, Uyqu apnesi tahlili",
      Charging: "Tezkor zaryadlash (30 daqiqada 80%)"
    }
  },
  {
    id: "p19",
    title: "Logitech MX Master 3S Wireless Performance Mouse",
    category: "cat_accessories",
    price: 99,
    oldPrice: 119,
    stock: 35,
    rating: 4.9,
    reviewsCount: 140,
    isFlashSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
    description: "Dasturchilar va dizaynerlar uchun eng mashhur ergonomik sokin bosiluvchi sichqoncha.",
    specs: {
      Sensor: "8000 DPI Darkfield (shisha ustida ham ishlaydi)",
      Scroll: "MagSpeed elektromagnit aylantirish (sekundiga 1000 qator)",
      Battery: "70 kungacha (1 daqiqa zaryad = 3 soat ish)",
      Connectivity: "Bluetooth Low Energy + Logi Bolt USB"
    }
  },
  {
    id: "p20",
    title: "Apple MagSafe Duo Wireless Fast Charger",
    category: "cat_accessories",
    price: 129,
    oldPrice: 149,
    stock: 20,
    rating: 4.7,
    reviewsCount: 45,
    isFlashSale: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop",
    description: "iPhone va Apple Watch qurilmalarini bir vaqtning o'zida quvvatlovchi buklanuvchi stansiya.",
    specs: {
      Compatibility: "iPhone 12/13/14/15/16, Apple Watch, AirPods",
      Port: "Lightning / USB-C to Lightning Cable",
      Design: "Ixcham sayohat uchun buklanadigan premium mato"
    }
  },
  {
    id: "p21",
    title: "Baseus GaN5 Pro 140W Desktop Fast Charger Hub",
    category: "cat_accessories",
    price: 79,
    oldPrice: 99,
    stock: 40,
    rating: 4.8,
    reviewsCount: 72,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    description: "Noutbuk, planshet va telefonlarni bir vaqtda to'liq quvvatlovchi zamonaviy GaN texnologiyasi.",
    specs: {
      Output: "Max 140W PD 3.1 Fast Charge",
      Ports: "2x USB-C + 1x USB-A",
      Technology: "GaN5 Pro & BPS II aqlli taqsimlash",
      Weight: "304g"
    }
  },
  {
    id: "p22",
    title: "Sony PlayStation 5 Pro 2TB 4K 120fps Console",
    category: "cat_gaming",
    price: 699,
    oldPrice: 749,
    stock: 7,
    rating: 4.9,
    reviewsCount: 58,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop",
    description: "PSSR sun'iy intellektli masshtablash, 2TB xotira va 120 kadr/soniyada 4K o'yin grafikasiga ega yangi PS5 Pro.",
    specs: {
      Storage: "2TB Ultra-High Speed Custom SSD",
      Graphics: "Kengaytirilgan Ray Tracing va AI Upscaling (PSSR)",
      Performance: "4K 60fps/120fps va 8K qo'llab-quvvatlovi",
      Controller: "DualSense Wireless Controller Haptic Feedback"
    }
  },
  {
    id: "p23",
    title: "Nintendo Switch OLED Model Mario Red Edition",
    category: "cat_gaming",
    price: 349,
    oldPrice: 399,
    stock: 15,
    rating: 4.8,
    reviewsCount: 82,
    isFlashSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=800&auto=format&fit=crop",
    description: "7 dyuymli yorqin rang-barang OLED ekran, mustahkam metall tayanch va boy ovozli dinamiklar.",
    specs: {
      Screen: "7.0-inch OLED Multi-touch Display",
      Storage: "64GB Internal (MicroSD kengaytma)",
      Modes: "TV rejimi, Stol rejimi, Portativ rejim",
      Battery: "4.5 dan 9 soatgacha o'yin vaqti"
    }
  },
  {
    id: "p24",
    title: "Razer DeathAdder V3 Pro Wireless Gaming Mouse",
    category: "cat_gaming",
    price: 149,
    oldPrice: 169,
    stock: 22,
    rating: 4.9,
    reviewsCount: 67,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?q=80&w=800&auto=format&fit=crop",
    description: "Professional kibersportchilar tanlovi: 63 gramm yengillik va 30,000 DPI optik sensor.",
    specs: {
      Sensor: "Focus Pro 30K Optical Sensor",
      Weight: "63g Ultra-yengil vazn",
      Switches: "Optical Mouse Switches Gen-3 (90 mln marta bosish)",
      Battery: "90 soatgacha uzluksiz o'yin vaqti"
    }
  },
  {
    id: "p25",
    title: "Samsung Neo QLED 65\" 4K Smart TV (QN90D 2026)",
    category: "cat_tv",
    price: 1799,
    oldPrice: 2099,
    stock: 7,
    rating: 4.9,
    reviewsCount: 38,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop",
    description: "NQ4 AI Gen2 Processor, Quantum Matrix Technology, Dolby Atmos, Real Depth Enhancer va 144Hz o'yin rejimi.",
    specs: {
      Screen: "65 dyuym 4K Ultra HD (3840x2160)",
      Matrix: "Neo QLED 144Hz VRR",
      Audio: "60W 4.2.2Ch Dolby Atmos",
      Smart: "Tizen OS 2026, SmartThings Hub",
      HDR: "Neo Quantum HDR+"
    }
  },
  {
    id: "p26",
    title: "LG OLED evo 55\" 4K Cinema Smart TV (C4 Series)",
    category: "cat_tv",
    price: 1499,
    oldPrice: 1699,
    stock: 10,
    rating: 5.0,
    reviewsCount: 45,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1552975084-6e027cd345c2?q=80&w=800&auto=format&fit=crop",
    description: "Self-lit OLED piksellari, cheksiz kontrast, a9 AI Processor Gen7 va 0.1ms o'yin tezligi.",
    specs: {
      Screen: "55 dyuym 4K OLED evo",
      Matrix: "OLED 144Hz G-Sync / FreeSync",
      Audio: "40W Dolby Atmos / DTS:X",
      Smart: "webOS 24 AI ThinQ",
      HDR: "Dolby Vision, HDR10 Pro"
    }
  },
  {
    id: "p27",
    title: "Sony BRAVIA XR 75\" Mini LED 4K Google TV (X95L)",
    category: "cat_tv",
    price: 2499,
    oldPrice: 2899,
    stock: 4,
    rating: 4.9,
    reviewsCount: 23,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=800&auto=format&fit=crop",
    description: "Cognitive Processor XR sun'iy intellekti, Acoustic Multi-Audio ovozi va PlayStation 5 uchun mukammal moslik.",
    specs: {
      Screen: "75 dyuym 4K XR Mini LED",
      Matrix: "XR Triluminos Pro 120Hz",
      Audio: "Acoustic Multi-Audio+ 60W",
      Smart: "Google TV (Android 14)",
      HDR: "XR HDR Remaster, Dolby Vision"
    }
  },
  {
    id: "p28",
    title: "Xiaomi TV Max 86\" Ultra Large 4K Smart TV",
    category: "cat_tv",
    price: 1399,
    oldPrice: 1599,
    stock: 6,
    rating: 4.8,
    reviewsCount: 29,
    isFlashSale: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=800&auto=format&fit=crop",
    description: "Gigant 86 dyuymli ekran, 120Hz MEMC, metall korpus va Dolby Vision IQ / Dolby Atmos qo'llab-quvvatlashi.",
    specs: {
      Screen: "86 dyuym 4K UHD",
      Matrix: "DLED 120Hz MEMC",
      Audio: "30W Stereo Dolby Atmos",
      Smart: "Android TV, Google Assistant",
      HDR: "Dolby Vision IQ, HDR10+"
    }
  },
  {
    id: "p29",
    title: "TCL 65\" QD-Mini LED 4K 144Hz Gaming TV (C755)",
    category: "cat_tv",
    price: 899,
    oldPrice: 1049,
    stock: 14,
    rating: 4.7,
    reviewsCount: 41,
    isFlashSale: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=800&auto=format&fit=crop",
    description: "QLED ranglar, 500+ Local Dimming zonalari, ONKYO audio tizimi va o'yinlar uchun 144Hz VRR.",
    specs: {
      Screen: "65 dyuym 4K QD-Mini LED",
      Matrix: "Quantum Dot 144Hz",
      Audio: "ONKYO 2.1 Hi-Fi 50W",
      Smart: "Google TV",
      HDR: "HDR Premium 1300 nits"
    }
  },
  {
    id: "p30",
    title: "Samsung The Frame 55\" QLED 4K Art Mode TV",
    category: "cat_tv",
    price: 1199,
    oldPrice: 1350,
    stock: 8,
    rating: 4.9,
    reviewsCount: 26,
    isFlashSale: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
    description: "Mat ekran (Anti-Reflection), san'at asari kabi devorga o'rnatish, San'at rejimi (Art Mode) va magnit ramkalar.",
    specs: {
      Screen: "55 dyuym Matte QLED 4K",
      Matrix: "100% Color Volume with Quantum Dot",
      Audio: "40W Dolby Atmos",
      Smart: "Tizen OS with Art Store",
      HDR: "Quantum HDR"
    }
  }
];

export const INITIAL_PROMO_CODES = [
  { code: "VOV2026", discountPercent: 20, description: "20% Chegirma Ustozlar va Barcha uchun!" },
  { code: "SUPER10", discountPercent: 10, description: "10% Chegirma birinchi xaridga" },
  { code: "TEGO50", fixedDiscount: 50, description: "$50 Maxsus Chegirma" }
];

export const STORE_LOCATION = {
  name: "VOV TECH Flagship Store",
  city: "Tashkent, Uzbekistan",
  address: "Amir Temur shox ko'chasi, 108-uy",
  lat: 41.3323,
  lng: 69.2842,
  phone: "+998 (90) 123-45-67",
  telegram: "@vov_tech_bot"
};
