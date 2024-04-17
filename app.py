from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

# Define the route for the contact form
@app.route('/submit', methods=['POST'])
def submit_form():
    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        
        # Store form data in SQLite database
        conn = sqlite3.connect('messages.db')
        cursor = conn.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, name TEXT, email TEXT, message TEXT)')
        cursor.execute('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', (name, email, message))
        conn.commit()
        conn.close()
        
        # Get the data from the database
        conn = sqlite3.connect('messages.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM messages')
        data = cursor.fetchall()
        conn.close()
        
        return 'Form submitted successfully! Here is the data you submitted: ' + str(data)
    else:
        return 'Method not allowed'

# Define the route for serving the HTML form
@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)