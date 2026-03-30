function Navbar({ cartCount, setOpen }) {
  return (
    <nav className="bg-black text-white py-5 px-6 border-b border-gray-800">  
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
          <h1 className="text-xl font-extrabold tracking-widest">
            BBF
          </h1>

        <button
          onClick={() => setOpen(true)}
          className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 hover:scale-105 transition duration-200" >
          🛒 ({cartCount})
        </button>

      </div>

    </nav>
  );
}

export default Navbar;