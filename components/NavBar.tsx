import { AiOutlineBell} from 'react-icons/ai';



function NavBar() {
  return (
    <div className="fixed z-1000 top-0 flex items-center h-[10vh] w-[100vw] justify-between box-border px-[15px] ">
      <img src="/Assets/lightmode/logo-light.png" alt="logo" className="w-[30%] max-w-[100px]" />
      <div className="sm:w-[45%]">
        <div className="w-[100%] hidden sm:flex sm:items-center sm:justify-evenly">
            <span className="">Designs</span>
            <span className="">Challenges</span>
            <span className="">About Us</span>
            <AiOutlineBell size={25}/>
            <img src="/Assets/icons/avatar.png" alt="" className="max-w-[50px]" />
        </div>
        <div className="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-[5px] block sm:hidden">
        <img src="/Hamburger Menu.svg" alt="" className="w-[90%] max-w-[25px] " />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
