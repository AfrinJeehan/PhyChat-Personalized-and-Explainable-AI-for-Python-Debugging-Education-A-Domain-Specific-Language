"""
PhyChat - Flask Application
An AI-powered Physics Learning Assistant
"""

from flask import Flask, render_template, request, jsonify
import os

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.urandom(24)

# ============================================
# Routes
# ============================================

@app.route('/')
def index():
    """Home page - Landing page with hero section and features"""
    return render_template('index.html')


@app.route('/chat')
def chat():
    """Chat interface - Main AI chat functionality"""
    return render_template('chat.html')


@app.route('/features')
def features():
    """Features page - Showcase PhyChat capabilities"""
    return render_template('features.html')


@app.route('/about')
def about():
    """About page - Project information and team"""
    return render_template('about.html')


@app.route('/contact')
def contact():
    """Contact page - Contact form and FAQ"""
    return render_template('contact.html')


# ============================================
# API Routes (for future ML integration)
# ============================================

@app.route('/api/chat', methods=['POST'])
def api_chat():
    """API endpoint for chat messages
    
    This endpoint can be connected to the ML model in the future.
    Currently returns a placeholder response.
    """
    data = request.get_json()
    user_message = data.get('message', '')
    
    # Placeholder response - Replace with ML model integration
    response = {
        'status': 'success',
        'message': f'Received: {user_message}',
        'response': 'This is a placeholder response. Connect your ML model here.'
    }
    
    return jsonify(response)


@app.route('/api/contact', methods=['POST'])
def api_contact():
    """API endpoint for contact form submissions"""
    data = request.get_json()
    
    name = data.get('name', '')
    email = data.get('email', '')
    subject = data.get('subject', '')
    message = data.get('message', '')
    
    # Here you would typically:
    # 1. Validate the data
    # 2. Save to database or send email
    # 3. Return appropriate response
    
    response = {
        'status': 'success',
        'message': 'Thank you for your message! We will get back to you soon.'
    }
    
    return jsonify(response)


# ============================================
# Error Handlers
# ============================================

@app.errorhandler(404)
def page_not_found(e):
    """Handle 404 errors"""
    return render_template('index.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    """Handle 500 errors"""
    return render_template('index.html'), 500


# ============================================
# Main Entry Point
# ============================================

if __name__ == '__main__':
    # Run the Flask development server
    app.run(debug=True, host='0.0.0.0', port=5000)
