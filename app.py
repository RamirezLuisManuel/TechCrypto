import datetime

from flask import Flask, jsonify, render_template, request
from services import CryptoService, HistoryService, StockService

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# RUTA 1: Para ver la página del Mercado
@app.route('/dashboard')
def dashboard_realtime():
    # Obtenemos las criptos de CoinMarketCap
    cryptos = CryptoService.get_top_cryptos()
    return render_template('realtime.html', cryptos=cryptos)


# RUTA 2: Para obtener los datos del gráfico (La que busca el JS)
@app.route('/dashboard-chart/<symbol>')
def dashboard_chart(symbol):
    # CoinMarketCap Basic no permite gráficas. 
    # Usamos Binance solo como motor de datos para que el gráfico no esté vacío.
    from services import HistoryService
    
    # Obtenemos los últimos 90 días gratis de Binance
    prices = HistoryService.get_history(symbol=symbol, limit=500)
    
    if not prices:
        # Si Binance falla, enviamos lista vacía para evitar errores
        return jsonify({"prices": []})
        
    return jsonify({"prices": prices})


@app.route('/news')
def news_view():
    # Obtenemos los datos
    news_list = StockService.get_market_news()
    
    for item in news_list:
        # Usamos la sintaxis completa para evitar el AttributeError previo
        dt_object = datetime.datetime.fromtimestamp(item['datetime'])
        item['date_pretty'] = dt_object.strftime('%d %b, %H:%M')
        
    # EL FIX: El nombre aquí debe ser news_list
    return render_template('news.html', news_list=news_list)

if __name__ == '__main__':
    app.run(debug=True)