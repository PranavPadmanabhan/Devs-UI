import Link from "next/link";
function NavBar() {
  return (
    <div className="fixed top-0 flex items-center h-[10vh] w-[100vw] justify-between box-border px-[15px] ">
      <div className="">LOGO</div>
      <div className="">
        <div className="hidden sm:block">
            <span className="">Home</span>
            <span className="">Home</span>
            <span className="">Home</span>
        </div>
        <div className="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-[5px]">
        <img src="/Hamburger Menu.svg" alt="" className="w-[90%] max-w-[25px] block sm:hidden" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
