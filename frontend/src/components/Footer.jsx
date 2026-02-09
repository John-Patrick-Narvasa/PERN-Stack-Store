function Footer() {
    const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <p>Copyright &copy; {year}</p>
    </footer>
  )
}

export default Footer