import { useContext, useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import DrawerItem from './DrawerItem';


function NavBar() {

  const [drawerMode, setdrawerMode] = useState<boolean>(false);

  return (
    <div className="fixed z-1000 top-0 flex items-center h-[10vh] w-[100vw] justify-between box-border px-[15px] ">
      <img src="/Assets/lightmode/logo-light.png" alt="logo" className="w-[30%] max-w-[100px]" />
      <div className="sm:w-[45%]">
        <div className="w-[100%] hidden sm:flex sm:items-center sm:justify-evenly">
          <span className="">Designs</span>
          <span className="">Challenges</span>
          <span className="">About Us</span>
          <AiOutlineBell size={25} />
          <div className="group flex flex-col items-center justify-center">
            <img src="/Assets/icons/avatar.png" alt="" className="max-w-[50px]" />
            <div className="hidden group-hover:flex flex-col items-center justify-start fixed w-[15vw] min-w-[200px] h-[30vh] bg-white top-[9vh] right-[4vw] rounded-[20px] shadow-task">
              <DrawerItem url='/Assets/lightmode/home(1).png' title='Home' redAccent={false} />
              <DrawerItem url='/Assets/lightmode/dashboard.png' title='Dashboard' redAccent={false} />
              <DrawerItem url='/Assets/lightmode/user.png' title='Profile' redAccent={false} />
              <DrawerItem url='/Assets/lightmode/log-out.png' title='Sign Out' redAccent={true} />
            </div>
          </div>
        </div>
        <div className="group flex items-center justify-center w-[30px] h-[30px] bg-white rounded-[5px] block sm:hidden">
          <img onClick={() => setdrawerMode(!drawerMode)} src="/Hamburger Menu.svg" alt="" className="w-[90%] max-w-[25px] " />
          {drawerMode && (
            <div className="fixed w-[55vw] h-auto overflow-hidden bg-white top-[9vh] right-[4vw] rounded-[20px] shadow-task">
              <DrawerItem url='/Assets/lightmode/home(1).png' title='Home' redAccent={false} />
              <DrawerItem url='/Assets/lightmode/design.png' title='Designs' redAccent={false} />
              <DrawerItem url='/Assets/lightmode/challenge.png' title='Challenges' redAccent={false} />
              <DrawerItem url='/Assets/lightmode/dashboard.png' title='Dashboard' redAccent={false} />
              <DrawerItem url='/Assets/lightmode/user.png' title='Profile' redAccent={false} />
              <DrawerItem url='/Assets/lightmode/icons8-bell-24.png' title='Notification' redAccent={false} />
              <DrawerItem url='/Assets/lightmode/log-out.png' title='Sign Out' redAccent={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
