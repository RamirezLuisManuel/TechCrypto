import requests
import os
from dotenv import load_dotenv

load_dotenv()

# --- COINMARKETCAP (Para la Tabla y Gráfico Realtime) ---
class CryptoService:
    @staticmethod
    def get_top_cryptos():
        url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
        parameters = {'start':'1', 'limit':'100', 'convert':'USD'}
        headers = {'X-CMC_PRO_API_KEY': '745b0ff26d4c438a9e4df065f5745769'}
        try:
            response = requests.get(url, headers=headers, params=parameters)
            return response.json().get('data', [])
        except:
            return []

# --- BINANCE (Solo para la página de Histórico) ---
class HistoryService:
    @staticmethod
    def get_history(symbol='BTC', limit=100):
        symbol = symbol.upper().strip() + "USDT"
        url = "https://api.binance.com/api/v3/klines"
        params = {'symbol': symbol, 'interval': '1d', 'limit': limit}
        try:
            response = requests.get(url, params=params)
            data = response.json()
            return [[item[0], float(item[4])] for item in data]
        except:
            return []

# --- FINNHUB (Stock News) ---  
class StockService:
    @staticmethod
    def get_market_news():
        api_key = 'd6f8el9r01qvn4o26oj0d6f8el9r01qvn4o26ojg'
        url = f"https://finnhub.io/api/v1/news?category=general&token={api_key}"
        
        try:
            response = requests.get(url, timeout=10)
            all_news = response.json()
            
            # Filtro estricto de finanzas y empresas
            money_words = ['market', 'stock', 'bank', 'fed', 'economy', 'shares', 'earnings', 'ceo', 'company', 'biz', 'invest']
            
            filtered = [
                n for n in all_news 
                if n.get('category') == 'business' or 
                any(word in n.get('headline', '').lower() for word in money_words)
            ]
            
            return filtered
        except:
            return []