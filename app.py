import streamlit as st

st.set_page_config(page_title="Kelompok SE App", layout="wide")

menu = st.sidebar.selectbox("Pilih Halaman", ["Landing", "Cart", "Profile"])

if menu == "Landing":
    st.title("Halaman Landing")
    st.markdown("Konten dari landing.html dimasukkan ulang di sini.")

elif menu == "Cart":
    st.title("Keranjang Belanja")
    st.markdown("Konten dari cart.html.")

elif menu == "Profile":
    st.title("Profil Pengguna")
    st.markdown("Konten dari profile.html.")
