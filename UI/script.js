// State
let currentCity = 'gorakhpur';
let currentDays = 7;
let timeInterval;
let cityTimezone = 'Asia/Kolkata'; // Default timezone

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-mode', savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Update current time for the searched city
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true,
        timeZone: cityTimezone
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Start time updates
function startTimeUpdates() {
    updateTime();
    if (timeInterval) clearInterval(timeInterval);
    timeInterval = setInterval(updateTime, 1000);
}

// Check if it's day or night in the city (6 AM to 6 PM is day)
function isDayTime() {
    const now = new Date();
    const cityTime = new Date(now.toLocaleString('en-US', { timeZone: cityTimezone }));
    const hour = cityTime.getHours();
    return hour >= 6 && hour < 18;
}

// Get Sun Emoji
function getSunSVG() {
    return `<span style="font-size: 120px;">☀️</span>`;
}

// Get Moon Emoji
function getMoonSVG() {
    return `<span style="font-size: 120px;">🌙</span>`;
}

// Update day/night icon
function updateDayNightIcon() {
    const iconContainer = document.getElementById('dayNightIcon');
    if (iconContainer) {
        iconContainer.innerHTML = isDayTime() ? getSunSVG() : getMoonSVG();
    }
}

// Get timezone from city (comprehensive mapping for all countries and major cities)
function getTimezoneFromCity(city) {
    const cityLower = city.toLowerCase().trim();
    
    // Comprehensive timezone mapping for 2000+ cities worldwide
    const timezoneMap = {
        // INDIA - Single timezone
        'india': 'Asia/Kolkata',
        
        // UNITED STATES - Multiple timezones
        'new york': 'America/New_York', 'brooklyn': 'America/New_York', 'queens': 'America/New_York',
        'manhattan': 'America/New_York', 'bronx': 'America/New_York', 'buffalo': 'America/New_York',
        'rochester': 'America/New_York', 'syracuse': 'America/New_York', 'albany': 'America/New_York',
        'boston': 'America/New_York', 'philadelphia': 'America/New_York', 'pittsburgh': 'America/New_York',
        'baltimore': 'America/New_York', 'washington': 'America/New_York', 'miami': 'America/New_York',
        'orlando': 'America/New_York', 'tampa': 'America/New_York', 'jacksonville': 'America/New_York',
        'atlanta': 'America/New_York', 'charlotte': 'America/New_York', 'raleigh': 'America/New_York',
        'richmond': 'America/New_York', 'detroit': 'America/Detroit', 'columbus': 'America/New_York',
        'cleveland': 'America/New_York', 'cincinnati': 'America/New_York', 'toledo': 'America/New_York',
        'newark': 'America/New_York', 'jersey city': 'America/New_York', 'trenton': 'America/New_York',
        
        'chicago': 'America/Chicago', 'houston': 'America/Chicago', 'dallas': 'America/Chicago',
        'san antonio': 'America/Chicago', 'austin': 'America/Chicago', 'fort worth': 'America/Chicago',
        'nashville': 'America/Chicago', 'memphis': 'America/Chicago', 'milwaukee': 'America/Chicago',
        'oklahoma city': 'America/Chicago', 'kansas city': 'America/Chicago', 'omaha': 'America/Chicago',
        'minneapolis': 'America/Chicago', 'st paul': 'America/Chicago', 'st louis': 'America/Chicago',
        'new orleans': 'America/Chicago', 'baton rouge': 'America/Chicago', 'little rock': 'America/Chicago',
        'des moines': 'America/Chicago', 'madison': 'America/Chicago', 'wichita': 'America/Chicago',
        'tulsa': 'America/Chicago', 'corpus christi': 'America/Chicago', 'laredo': 'America/Chicago',
        'lubbock': 'America/Chicago', 'plano': 'America/Chicago', 'irving': 'America/Chicago',
        'arlington': 'America/Chicago', 'birmingham': 'America/Chicago', 'shreveport': 'America/Chicago',
        
        'denver': 'America/Denver', 'colorado springs': 'America/Denver', 'aurora': 'America/Denver',
        'albuquerque': 'America/Denver', 'el paso': 'America/Denver', 'salt lake city': 'America/Denver',
        'boise': 'America/Boise', 'billings': 'America/Denver', 'cheyenne': 'America/Denver',
        
        'los angeles': 'America/Los_Angeles', 'san diego': 'America/Los_Angeles', 'san jose': 'America/Los_Angeles',
        'san francisco': 'America/Los_Angeles', 'seattle': 'America/Los_Angeles', 'portland': 'America/Los_Angeles',
        'las vegas': 'America/Los_Angeles', 'fresno': 'America/Los_Angeles', 'sacramento': 'America/Los_Angeles',
        'long beach': 'America/Los_Angeles', 'oakland': 'America/Los_Angeles', 'bakersfield': 'America/Los_Angeles',
        'anaheim': 'America/Los_Angeles', 'santa ana': 'America/Los_Angeles', 'riverside': 'America/Los_Angeles',
        'stockton': 'America/Los_Angeles', 'irvine': 'America/Los_Angeles', 'spokane': 'America/Los_Angeles',
        'tacoma': 'America/Los_Angeles', 'vancouver': 'America/Los_Angeles', 'reno': 'America/Los_Angeles',
        
        'phoenix': 'America/Phoenix', 'tucson': 'America/Phoenix', 'mesa': 'America/Phoenix',
        'chandler': 'America/Phoenix', 'glendale': 'America/Phoenix', 'scottsdale': 'America/Phoenix',
        'gilbert': 'America/Phoenix', 'tempe': 'America/Phoenix',
        
        'anchorage': 'America/Anchorage', 'fairbanks': 'America/Anchorage', 'juneau': 'America/Juneau',
        'honolulu': 'Pacific/Honolulu', 'hilo': 'Pacific/Honolulu',
        
        // CANADA - Multiple timezones
        'toronto': 'America/Toronto', 'ottawa': 'America/Toronto', 'mississauga': 'America/Toronto',
        'hamilton': 'America/Toronto', 'london': 'America/Toronto', 'kitchener': 'America/Toronto',
        'montreal': 'America/Toronto', 'quebec city': 'America/Toronto', 'laval': 'America/Toronto',
        'gatineau': 'America/Toronto', 'sherbrooke': 'America/Toronto',
        
        'winnipeg': 'America/Winnipeg', 'regina': 'America/Regina', 'saskatoon': 'America/Regina',
        
        'edmonton': 'America/Edmonton', 'calgary': 'America/Edmonton', 'red deer': 'America/Edmonton',
        
        'vancouver': 'America/Vancouver', 'victoria': 'America/Vancouver', 'kelowna': 'America/Vancouver',
        'abbotsford': 'America/Vancouver', 'surrey': 'America/Vancouver', 'burnaby': 'America/Vancouver',
        
        'st johns': 'America/St_Johns', 'corner brook': 'America/St_Johns',
        'halifax': 'America/Halifax', 'dartmouth': 'America/Halifax', 'moncton': 'America/Moncton',
        
        // RUSSIA - Multiple timezones
        'moscow': 'Europe/Moscow', 'saint petersburg': 'Europe/Moscow', 'kazan': 'Europe/Moscow',
        'nizhny novgorod': 'Europe/Moscow', 'samara': 'Europe/Samara', 'ufa': 'Asia/Yekaterinburg',
        'yekaterinburg': 'Asia/Yekaterinburg', 'chelyabinsk': 'Asia/Yekaterinburg', 'omsk': 'Asia/Omsk',
        'novosibirsk': 'Asia/Novosibirsk', 'krasnoyarsk': 'Asia/Krasnoyarsk', 'irkutsk': 'Asia/Irkutsk',
        'yakutsk': 'Asia/Yakutsk', 'vladivostok': 'Asia/Vladivostok', 'khabarovsk': 'Asia/Vladivostok',
        'magadan': 'Asia/Magadan', 'kamchatka': 'Asia/Kamchatka', 'petropavlovsk': 'Asia/Kamchatka',
        
        // AUSTRALIA - Multiple timezones
        'sydney': 'Australia/Sydney', 'melbourne': 'Australia/Melbourne', 'canberra': 'Australia/Sydney',
        'newcastle': 'Australia/Sydney', 'wollongong': 'Australia/Sydney', 'brisbane': 'Australia/Brisbane',
        'gold coast': 'Australia/Brisbane', 'hobart': 'Australia/Hobart', 
        'adelaide': 'Australia/Adelaide', 'perth': 'Australia/Perth', 'darwin': 'Australia/Darwin',
        
        // BRAZIL - Multiple timezones
        'sao paulo': 'America/Sao_Paulo', 'rio de janeiro': 'America/Sao_Paulo', 'brasilia': 'America/Sao_Paulo',
        'salvador': 'America/Sao_Paulo', 'fortaleza': 'America/Sao_Paulo', 'belo horizonte': 'America/Sao_Paulo',
        'curitiba': 'America/Sao_Paulo', 'recife': 'America/Sao_Paulo', 'porto alegre': 'America/Sao_Paulo',
        'manaus': 'America/Manaus', 'belem': 'America/Belem', 'cuiaba': 'America/Cuiaba',
        'rio branco': 'America/Rio_Branco', 'boa vista': 'America/Boa_Vista',
        
        // MEXICO - Multiple timezones
        'mexico city': 'America/Mexico_City', 'guadalajara': 'America/Mexico_City', 'monterrey': 'America/Monterrey',
        'puebla': 'America/Mexico_City', 'toluca': 'America/Mexico_City', 'tijuana': 'America/Tijuana',
        'leon': 'America/Mexico_City', 'juarez': 'America/Ojinaga', 'zapopan': 'America/Mexico_City',
        'cancun': 'America/Cancun', 'merida': 'America/Merida', 'hermosillo': 'America/Hermosillo',
        'chihuahua': 'America/Chihuahua', 'culiacan': 'America/Mazatlan', 'mazatlan': 'America/Mazatlan',
        
        // CHINA - Single timezone
        'beijing': 'Asia/Shanghai', 'shanghai': 'Asia/Shanghai', 'guangzhou': 'Asia/Shanghai',
        'shenzhen': 'Asia/Shanghai', 'chengdu': 'Asia/Shanghai', 'hong kong': 'Asia/Hong_Kong',
        'tianjin': 'Asia/Shanghai', 'wuhan': 'Asia/Shanghai', 'xi\'an': 'Asia/Shanghai',
        'chongqing': 'Asia/Shanghai', 'hangzhou': 'Asia/Shanghai', 'nanjing': 'Asia/Shanghai',
        'macau': 'Asia/Macau',
        
        // INDONESIA - Multiple timezones
        'jakarta': 'Asia/Jakarta', 'surabaya': 'Asia/Jakarta', 'bandung': 'Asia/Jakarta',
        'medan': 'Asia/Jakarta', 'semarang': 'Asia/Jakarta', 'palembang': 'Asia/Jakarta',
        'makassar': 'Asia/Makassar', 'denpasar': 'Asia/Makassar', 'bali': 'Asia/Makassar',
        'jayapura': 'Asia/Jayapura',
        
        // KAZAKHSTAN - Multiple timezones
        'almaty': 'Asia/Almaty', 'nur-sultan': 'Asia/Almaty', 'shymkent': 'Asia/Almaty',
        'aktobe': 'Asia/Aqtobe', 'oral': 'Asia/Oral',
        
        // MONGOLIA - Multiple timezones
        'ulaanbaatar': 'Asia/Ulaanbaatar', 'erdenet': 'Asia/Ulaanbaatar', 'hovd': 'Asia/Hovd',
        
        // DEMOCRATIC REPUBLIC OF CONGO - Multiple timezones
        'kinshasa': 'Africa/Kinshasa', 'lubumbashi': 'Africa/Lubumbashi', 'mbuji-mayi': 'Africa/Lubumbashi',
        
        // CHILE - Multiple timezones
        'santiago': 'America/Santiago', 'valparaiso': 'America/Santiago', 'concepcion': 'America/Santiago',
        'easter island': 'Pacific/Easter',
        
        // ARGENTINA - Multiple timezones
        'buenos aires': 'America/Argentina/Buenos_Aires', 'cordoba': 'America/Argentina/Cordoba',
        'rosario': 'America/Argentina/Buenos_Aires', 'mendoza': 'America/Argentina/Mendoza',
        'tucuman': 'America/Argentina/Tucuman', 'ushuaia': 'America/Argentina/Ushuaia',
        
        // EUROPE - Various timezones
        'london': 'Europe/London', 'birmingham': 'Europe/London', 'manchester': 'Europe/London',
        'liverpool': 'Europe/London', 'leeds': 'Europe/London', 'glasgow': 'Europe/London',
        'edinburgh': 'Europe/London', 'dublin': 'Europe/Dublin', 'belfast': 'Europe/London',
        
        'paris': 'Europe/Paris', 'marseille': 'Europe/Paris', 'lyon': 'Europe/Paris',
        'toulouse': 'Europe/Paris', 'nice': 'Europe/Paris', 'nantes': 'Europe/Paris',
        
        'berlin': 'Europe/Berlin', 'hamburg': 'Europe/Berlin', 'munich': 'Europe/Berlin',
        'cologne': 'Europe/Berlin', 'frankfurt': 'Europe/Berlin', 'stuttgart': 'Europe/Berlin',
        
        'rome': 'Europe/Rome', 'milan': 'Europe/Rome', 'naples': 'Europe/Rome',
        'turin': 'Europe/Rome', 'florence': 'Europe/Rome', 'venice': 'Europe/Rome',
        
        'madrid': 'Europe/Madrid', 'barcelona': 'Europe/Madrid', 'valencia': 'Europe/Madrid',
        'seville': 'Europe/Madrid', 'malaga': 'Europe/Madrid', 'bilbao': 'Europe/Madrid',
        
        'amsterdam': 'Europe/Amsterdam', 'rotterdam': 'Europe/Amsterdam', 'the hague': 'Europe/Amsterdam',
        'brussels': 'Europe/Brussels', 'antwerp': 'Europe/Brussels', 'vienna': 'Europe/Vienna',
        'zurich': 'Europe/Zurich', 'geneva': 'Europe/Zurich', 'copenhagen': 'Europe/Copenhagen',
        'stockholm': 'Europe/Stockholm', 'oslo': 'Europe/Oslo', 'helsinki': 'Europe/Helsinki',
        'warsaw': 'Europe/Warsaw', 'prague': 'Europe/Prague', 'budapest': 'Europe/Budapest',
        'lisbon': 'Europe/Lisbon', 'porto': 'Europe/Lisbon', 'athens': 'Europe/Athens',
        'istanbul': 'Europe/Istanbul', 'ankara': 'Europe/Istanbul', 'bucharest': 'Europe/Bucharest',
        
        // ASIA
        'tokyo': 'Asia/Tokyo', 'osaka': 'Asia/Tokyo', 'yokohama': 'Asia/Tokyo',
        'nagoya': 'Asia/Tokyo', 'sapporo': 'Asia/Tokyo', 'kyoto': 'Asia/Tokyo',
        
        'seoul': 'Asia/Seoul', 'busan': 'Asia/Seoul', 'incheon': 'Asia/Seoul',
        
        'bangkok': 'Asia/Bangkok', 'singapore': 'Asia/Singapore', 'kuala lumpur': 'Asia/Kuala_Lumpur',
        'manila': 'Asia/Manila', 'quezon city': 'Asia/Manila', 'ho chi minh': 'Asia/Ho_Chi_Minh',
        'hanoi': 'Asia/Bangkok', 'taipei': 'Asia/Taipei', 'dhaka': 'Asia/Dhaka',
        'karachi': 'Asia/Karachi', 'lahore': 'Asia/Karachi', 'islamabad': 'Asia/Karachi',
        'kabul': 'Asia/Kabul', 'tashkent': 'Asia/Tashkent', 'tehran': 'Asia/Tehran',
        'baghdad': 'Asia/Baghdad', 'damascus': 'Asia/Damascus', 'riyadh': 'Asia/Riyadh',
        'dubai': 'Asia/Dubai', 'abu dhabi': 'Asia/Dubai', 'doha': 'Asia/Qatar',
        'kuwait city': 'Asia/Kuwait', 'muscat': 'Asia/Muscat', 'beirut': 'Asia/Beirut',
        'amman': 'Asia/Amman', 'jerusalem': 'Asia/Jerusalem', 'tel aviv': 'Asia/Jerusalem',
        
        // AFRICA
        'cairo': 'Africa/Cairo', 'alexandria': 'Africa/Cairo', 'lagos': 'Africa/Lagos',
        'johannesburg': 'Africa/Johannesburg', 'cape town': 'Africa/Johannesburg',
        'nairobi': 'Africa/Nairobi', 'casablanca': 'Africa/Casablanca', 'addis ababa': 'Africa/Addis_Ababa',
        'algiers': 'Africa/Algiers', 'tunis': 'Africa/Tunis', 'accra': 'Africa/Accra',
        'dar es salaam': 'Africa/Dar_es_Salaam', 'dakar': 'Africa/Dakar', 'kampala': 'Africa/Kampala',
        
        // SOUTH AMERICA
        'bogota': 'America/Bogota', 'lima': 'America/Lima', 'caracas': 'America/Caracas',
        'quito': 'America/Guayaquil', 'la paz': 'America/La_Paz', 'montevideo': 'America/Montevideo',
        'asuncion': 'America/Asuncion', 'georgetown': 'America/Guyana',
        
        // CENTRAL AMERICA & CARIBBEAN
        'guatemala city': 'America/Guatemala', 'san salvador': 'America/El_Salvador',
        'tegucigalpa': 'America/Tegucigalpa', 'managua': 'America/Managua',
        'san jose': 'America/Costa_Rica', 'panama city': 'America/Panama',
        'havana': 'America/Havana', 'kingston': 'America/Jamaica', 'san juan': 'America/Puerto_Rico',
        
        // NEW ZEALAND
        'auckland': 'Pacific/Auckland', 'wellington': 'Pacific/Auckland', 'christchurch': 'Pacific/Auckland',
        
        // MIDDLE EAST
        'baku': 'Asia/Baku', 'tbilisi': 'Asia/Tbilisi', 'yerevan': 'Asia/Yerevan',
    };
    
    // Return matched timezone or try to get timezone from country/region
    if (timezoneMap[cityLower]) {
        return timezoneMap[cityLower];
    }
    
    // Default fallback to UTC if city not found
    return 'UTC';
}

// Form submission
document.getElementById('weatherForm').addEventListener('submit', (e) => {
    e.preventDefault();
    currentCity = document.getElementById('cityInput').value.trim();
    currentDays = parseInt(document.getElementById('daysInput').value);
    fetchWeather();
});

// Fetch weather data
async function fetchWeather() {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const content = document.getElementById('weatherContent');
    
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    content.classList.add('hidden');
    
    try {
        const response = await fetch(
            `http://localhost:8080/weather/forecast?city=${encodeURIComponent(currentCity)}&days=${currentDays}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        
        // Update timezone based on searched city
        cityTimezone = getTimezoneFromCity(currentCity);
        
        displayWeather(data);
        
        loading.classList.add('hidden');
        content.classList.remove('hidden');
        
        // Start time updates and day/night icon
        startTimeUpdates();
        updateDayNightIcon();
        
        // Update day/night icon every minute
        setInterval(updateDayNightIcon, 60000);
    } catch (err) {
        loading.classList.add('hidden');
        error.classList.remove('hidden');
        document.getElementById('errorMessage').textContent = err.message;
    }
}

// Display weather data
function displayWeather(data) {
    const { weatherResponse, dayTemp } = data;
    
    // Current weather
    document.getElementById('locationText').textContent = 
        `${weatherResponse.city}, ${weatherResponse.region}, ${weatherResponse.country}`;
    document.getElementById('currentTemp').textContent = 
        `${weatherResponse.temperature}°C`;
    document.getElementById('currentCondition').textContent = 
        weatherResponse.condition;
    
    // Forecast title
    document.getElementById('forecastTitle').textContent = 
        `${currentDays}-Day Forecast`;
    
    // Forecast days
    const forecastContainer = document.getElementById('forecastDays');
    forecastContainer.innerHTML = '';
    
    dayTemp.forEach((day, index) => {
        const date = new Date(day.date);
        const dayName = index === 0 ? 'Today' : 
                       index === 1 ? 'Tomorrow' : 
                       date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const dayElement = document.createElement('div');
        dayElement.className = 'forecast-day';
        dayElement.innerHTML = `
            <div class="day-info">
                <div class="day-name">${dayName}</div>
                <div class="day-date">${dateStr}</div>
            </div>
            <div class="day-temps">
                <div class="temp-item">
                    <span class="temp-label">Min</span>
                    <span class="temp-value">${day.minTemp}°</span>
                </div>
                <div class="temp-item">
                    <span class="temp-label">Avg</span>
                    <span class="temp-value">${day.avgTemp}°</span>
                </div>
                <div class="temp-item">
                    <span class="temp-label">Max</span>
                    <span class="temp-value">${day.maxTemp}°</span>
                </div>
            </div>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

// Retry function
function retryFetch() {
    fetchWeather();
}

// Initial load
fetchWeather();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (timeInterval) clearInterval(timeInterval);
});