import os
import sqlite3
import hashlib
from datetime import datetime
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='static', static_url_path='')
DATABASE = 'nutrition.db'

# ══════════════════════════════════
# DATABASE SETUP
# ══════════════════════════════════

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        name     TEXT    NOT NULL,
        email    TEXT    UNIQUE NOT NULL,
        password TEXT    NOT NULL,
        phone    TEXT    DEFAULT '',
        height   REAL    DEFAULT 0,
        weight   REAL    DEFAULT 0,
        role     TEXT    NOT NULL DEFAULT 'customer'
    )''')

    c.execute('''CREATE TABLE IF NOT EXISTS appointments (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName  TEXT NOT NULL,
        customerEmail TEXT NOT NULL,
        service       TEXT NOT NULL,
        date          TEXT NOT NULL,
        time          TEXT NOT NULL,
        consultant    TEXT NOT NULL,
        notes         TEXT DEFAULT '',
        status        TEXT NOT NULL DEFAULT 'Pending'
    )''')

    c.execute('''CREATE TABLE IF NOT EXISTS health_logs (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        customerEmail TEXT NOT NULL,
        date         TEXT NOT NULL,
        weight       REAL NOT NULL,
        height       REAL DEFAULT 165,
        bmi          REAL NOT NULL,
        steps        INTEGER DEFAULT 0,
        water        REAL DEFAULT 0
    )''')

    c.execute('''CREATE TABLE IF NOT EXISTS blogs (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        title     TEXT NOT NULL,
        category  TEXT NOT NULL,
        summary   TEXT NOT NULL,
        content   TEXT NOT NULL,
        author    TEXT NOT NULL,
        date      TEXT NOT NULL,
        read_time TEXT NOT NULL
    )''')

    c.execute('''CREATE TABLE IF NOT EXISTS tips (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        title    TEXT NOT NULL,
        content  TEXT NOT NULL
    )''')

    c.execute('''CREATE TABLE IF NOT EXISTS contacts (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        name    TEXT NOT NULL,
        phone   TEXT NOT NULL,
        email   TEXT DEFAULT '',
        service TEXT DEFAULT '',
        message TEXT DEFAULT '',
        date    TEXT NOT NULL
    )''')

    conn.commit()

    # ── Seed default users ──
    def hash_pw(pw):
        return hashlib.sha256(pw.encode()).hexdigest()

    c.execute("SELECT id FROM users WHERE email='admin@nutrition.com'")
    if not c.fetchone():
        c.execute("INSERT INTO users (name,email,password,role,height,weight) VALUES (?,?,?,?,?,?)",
                  ('Admin', 'admin@nutrition.com', hash_pw('admin123'), 'admin', 170, 65))

    c.execute("SELECT id FROM users WHERE email='client@nutrition.com'")
    if not c.fetchone():
        c.execute("INSERT INTO users (name,email,password,role,height,weight) VALUES (?,?,?,?,?,?)",
                  ('Demo Client', 'client@nutrition.com', hash_pw('password'), 'customer', 165, 70))

    # ── Seed sample blogs ──
    c.execute("SELECT COUNT(*) FROM blogs")
    if c.fetchone()[0] == 0:
        blogs = [
            ('5 Essential Nutrients Every Senior Needs Daily', 'old-age',
             'Discover the key nutrients that help seniors maintain strength and cognitive health.',
             'Calcium, Vitamin D, B12, Omega-3, and Iron are critical for seniors. Here is how to get them through diet...',
             "Preethi Ma'am", datetime.now().strftime('%Y-%m-%d'), '6 min read'),
            ('The Anti-Acne Diet: Foods to Eat and Avoid', 'skin',
             'Your diet plays a 70% role in skin health. Learn what triggers and clears breakouts.',
             'Reducing glycemic load, eliminating dairy, and adding zinc-rich foods can dramatically improve skin health...',
             "Preethi Ma'am", datetime.now().strftime('%Y-%m-%d'), '5 min read'),
            ('PCOS Diet: Balancing Hormones Through Food', 'women',
             'A comprehensive guide to eating for PCOS — managing insulin resistance and inflammation.',
             'Low-GI carbohydrates, anti-inflammatory foods, and adequate protein are the cornerstones of PCOS nutrition...',
             "Preethi Ma'am", datetime.now().strftime('%Y-%m-%d'), '8 min read'),
        ]
        c.executemany("INSERT INTO blogs (title,category,summary,content,author,date,read_time) VALUES (?,?,?,?,?,?,?)", blogs)

    # ── Seed sample tips ──
    c.execute("SELECT COUNT(*) FROM tips")
    if c.fetchone()[0] == 0:
        sample_tips = [
            ('Skin Care', 'Hydration for Radiant Skin', 'Drink at least 3 liters of water daily. Proper hydration flushes toxins and keeps skin plump and glowing.'),
            ('Weight Loss', 'Morning Lemon Water Boost', 'Start your day with warm lemon water to kickstart metabolism, aid digestion, and provide a dose of Vitamin C.'),
            ('Children Nutrition', 'Rainbow Plate for Kids', 'Encourage children to eat vegetables of 5 different colors. Each color provides unique vitamins and minerals for healthy growth.'),
            ('General', 'Sleep 7-9 Hours for Health', 'Poor sleep raises hunger hormones by 15%. Prioritize 7-9 hours of quality sleep for weight management and overall wellness.'),
            ('Women Health', 'Iron-Rich Foods During Periods', 'Include spinach, dates, jaggery, and lentils during menstruation. Pair with Vitamin C foods to triple iron absorption.'),
        ]
        c.executemany("INSERT INTO tips (category,title,content) VALUES (?,?,?)", sample_tips)

    conn.commit()
    conn.close()
    print("✅ Database initialized and seeded.")

# ══════════════════════════════════
# SERVE FRONTEND
# ══════════════════════════════════

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/style.css')
def css():
    return send_from_directory('static', 'style.css')

@app.route('/app.js')
def js():
    return send_from_directory('static', 'app.js')

# ══════════════════════════════════
# AUTH ROUTES
# ══════════════════════════════════

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name     = data.get('name', '').strip()
    email    = data.get('email', '').strip().lower()
    password = data.get('password', '')
    phone    = data.get('phone', '')
    height   = float(data.get('height') or 0)
    weight   = float(data.get('weight') or 0)

    if not name or not email or not password:
        return jsonify({'error': 'Name, email and password are required.'}), 400
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters.'}), 400

    hashed = hashlib.sha256(password.encode()).hexdigest()
    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO users (name,email,password,phone,height,weight,role) VALUES (?,?,?,?,?,?,?)",
            (name, email, hashed, phone, height, weight, 'customer')
        )
        conn.commit()
        user = dict(conn.execute("SELECT id,name,email,role,height,weight FROM users WHERE email=?", (email,)).fetchone())
        return jsonify(user), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'An account with this email already exists.'}), 409
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email    = data.get('email', '').strip().lower()
    password = data.get('password', '')
    hashed   = hashlib.sha256(password.encode()).hexdigest()

    conn = get_db()
    row = conn.execute(
        "SELECT id,name,email,role,height,weight FROM users WHERE email=? AND password=?",
        (email, hashed)
    ).fetchone()
    conn.close()

    if not row:
        return jsonify({'error': 'Invalid email or password.'}), 401
    return jsonify(dict(row)), 200

# ══════════════════════════════════
# HEALTH LOGS
# ══════════════════════════════════

@app.route('/api/health-logs', methods=['GET', 'POST'])
def health_logs():
    if request.method == 'POST':
        d = request.json
        conn = get_db()
        conn.execute(
            "INSERT INTO health_logs (customerEmail,date,weight,height,bmi,steps,water) VALUES (?,?,?,?,?,?,?)",
            (d['email'], datetime.now().strftime('%Y-%m-%d'), d['weight'], d.get('height',165), d['bmi'], d.get('steps',0), d.get('water',0))
        )
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 201

    email = request.args.get('email')
    if not email:
        return jsonify({'error': 'Email required'}), 400
    conn = get_db()
    logs = [dict(r) for r in conn.execute(
        "SELECT * FROM health_logs WHERE customerEmail=? ORDER BY date DESC LIMIT 30", (email,)
    ).fetchall()]
    conn.close()
    return jsonify(logs)

# ══════════════════════════════════
# APPOINTMENTS
# ══════════════════════════════════

@app.route('/api/appointments', methods=['GET', 'POST'])
def appointments():
    if request.method == 'POST':
        d = request.json
        conn = get_db()
        conn.execute(
            "INSERT INTO appointments (customerName,customerEmail,service,date,time,consultant,notes) VALUES (?,?,?,?,?,?,?)",
            (d['customerName'], d['customerEmail'], d['service'], d['date'], d['time'], d['consultant'], d.get('notes',''))
        )
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 201

    email = request.args.get('email')
    conn  = get_db()
    if email:
        rows = conn.execute(
            "SELECT * FROM appointments WHERE customerEmail=? ORDER BY date DESC", (email,)
        ).fetchall()
    else:
        rows = conn.execute("SELECT * FROM appointments ORDER BY date DESC").fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/appointments/<int:appt_id>', methods=['PUT'])
def update_appointment(appt_id):
    status = request.json.get('status')
    conn   = get_db()
    conn.execute("UPDATE appointments SET status=? WHERE id=?", (status, appt_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ══════════════════════════════════
# BLOGS
# ══════════════════════════════════

@app.route('/api/blogs', methods=['GET', 'POST'])
def blogs():
    if request.method == 'POST':
        d = request.json
        conn = get_db()
        conn.execute(
            "INSERT INTO blogs (title,category,summary,content,author,date,read_time) VALUES (?,?,?,?,?,?,?)",
            (d['title'], d['category'], d['summary'], d['content'], d['author'],
             datetime.now().strftime('%Y-%m-%d'), d.get('read_time','5 min read'))
        )
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 201

    conn  = get_db()
    cat   = request.args.get('category')
    if cat:
        rows = conn.execute("SELECT * FROM blogs WHERE category=? ORDER BY date DESC", (cat,)).fetchall()
    else:
        rows = conn.execute("SELECT * FROM blogs ORDER BY date DESC").fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/blogs/<int:blog_id>', methods=['DELETE'])
def delete_blog(blog_id):
    conn = get_db()
    conn.execute("DELETE FROM blogs WHERE id=?", (blog_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ══════════════════════════════════
# TIPS
# ══════════════════════════════════

@app.route('/api/tips', methods=['GET', 'POST'])
def tips():
    if request.method == 'POST':
        d = request.json
        conn = get_db()
        conn.execute("INSERT INTO tips (category,title,content) VALUES (?,?,?)",
                     (d['category'], d['title'], d['content']))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 201

    conn = get_db()
    rows = conn.execute("SELECT * FROM tips ORDER BY id DESC").fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/tips/<int:tip_id>', methods=['DELETE'])
def delete_tip(tip_id):
    conn = get_db()
    conn.execute("DELETE FROM tips WHERE id=?", (tip_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ══════════════════════════════════
# CONTACT
# ══════════════════════════════════

@app.route('/api/contact', methods=['POST'])
def contact():
    d = request.json
    conn = get_db()
    conn.execute(
        "INSERT INTO contacts (name,phone,email,service,message,date) VALUES (?,?,?,?,?,?)",
        (d.get('name',''), d.get('phone',''), d.get('email',''), d.get('service',''), d.get('message',''), datetime.now().strftime('%Y-%m-%d'))
    )
    conn.commit()
    conn.close()
    return jsonify({'success': True}), 201

# ══════════════════════════════════
# ADMIN ROUTES
# ══════════════════════════════════

@app.route('/api/admin/clients', methods=['GET'])
def admin_clients():
    conn  = get_db()
    rows  = conn.execute("SELECT id,name,email,phone,height,weight FROM users WHERE role='customer' ORDER BY id DESC").fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/admin/appointments', methods=['GET'])
def admin_appointments():
    conn = get_db()
    rows = conn.execute("SELECT * FROM appointments ORDER BY date DESC").fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/admin/contacts', methods=['GET'])
def admin_contacts():
    conn = get_db()
    rows = conn.execute("SELECT * FROM contacts ORDER BY date DESC").fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

# ══════════════════════════════════
# RUN
# ══════════════════════════════════

if __name__ == '__main__':
    init_db()
    print("\n" + "═"*55)
    print("  🌿  PREETHI NUTRITION CENTER")
    print("═"*55)
    print("  ✅  Server started successfully!")
    print("  🌐  Open: http://localhost:5000")
    print()
    print("  TEST ACCOUNTS:")
    print("  👤 Customer: client@nutrition.com / password")
    print("  🛡️  Admin:    admin@nutrition.com  / admin123")
    print("═"*55 + "\n")
    app.run(debug=True, port=5000)
