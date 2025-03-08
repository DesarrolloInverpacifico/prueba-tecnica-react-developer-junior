function NavBar() {
  return (
    <nav className="flex items-center justify-between p-1 bg-blue-700 px-16">
        <img src="/logo.png" alt="logoPlusSalary" width={60} height={24} />
        <h1 className="font-bold text-2xl text-amber-300">PlusSalary</h1>
        <p className="text-amber-300 font-bold">Prueba Tecnica</p>
    </nav>
  )
}

export default NavBar
