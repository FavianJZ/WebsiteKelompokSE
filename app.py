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

# Load HTML konten
html_content = load_file(page)

# Load CSS sesuai halaman (jika ada)
css_file = os.path.join('css', page.replace('.html', '.css'))
css_content = ''
if os.path.exists(css_file):
    css_content = load_file(css_file)
    css_tag = f'<style>{css_content}</style>'
else:
    css_tag = ''

# Load JS sesuai halaman (jika ada)
js_file = os.path.join('js', page.replace('.html', '.js'))
js_content = ''
if os.path.exists(js_file):
    js_content = load_file(js_file)
    js_tag = f'<script>{js_content}</script>'
else:
    js_tag = ''

# Gabungkan semua: CSS + HTML + JS
full_html = css_tag + html_content + js_tag

# Tampilkan di Streamlit
st.components.v1.html(full_html, height=800, scrolling=True)
