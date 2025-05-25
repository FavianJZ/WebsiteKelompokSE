import streamlit as st
import os

def load_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

st.title("Website Kelompok SE dengan Streamlit")

html_pages = [
    'landing.html',
    'deals.html',
    'profile.html',
    'signin.html',
    'signup.html',
    'dash.html',
    'cart.html',
    'buy.html',
    'orders.html',
    'resto.html',
    'search.html',
    'support.html'
]

page = st.sidebar.selectbox("Pilih Halaman", html_pages)

# Map halaman HTML ke file CSS sesuai nama di folder css
css_map = {
    'signin.html': 'css/sign.css',
    'signup.html': 'css/sign.css',
    # Default case, file CSS punya nama sama dengan HTML tapi ekstensi .css
    # Jadi kalau tidak ada di map, pakai ini:
    # 'landing.html' -> 'css/landing.css', dst
}

css_file = css_map.get(page, os.path.join('css', page.replace('.html', '.css')))
if os.path.exists(css_file):
    css_content = load_file(css_file)
    css_tag = f'<style>{css_content}</style>'
else:
    css_tag = ''

# Load file JS sesuai nama halaman
js_file = os.path.join('js', page.replace('.html', '.js'))
if os.path.exists(js_file):
    js_content = load_file(js_file)
    js_tag = f'<script>{js_content}</script>'
else:
    js_tag = ''

# Load HTML
html_content = load_file(page)

# Gabungkan CSS + HTML + JS
full_html = css_tag + html_content + js_tag

st.components.v1.html(full_html, height=800, scrolling=True)
