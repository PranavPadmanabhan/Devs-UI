

function NavBar() {
  return (
    <div className="fixed z-1000 top-0 flex items-center h-[10vh] w-[100vw] justify-between box-border px-[15px] ">
      <img src="/Assets/lightmode/logo-light.png" alt="logo" className="w-[30%]" />
      <div className="">
        <div className="hidden sm:block">
            <span className="">Designs</span>
            <span className="">Challenges</span>
            <span className="">About Us</span>
        </div>
        <div className="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-[5px]">
        <img src="/Hamburger Menu.svg" alt="" className="w-[90%] max-w-[25px] block sm:hidden" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
