import Link from 'next/link';
import { useContext, useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import DrawerItem from './DrawerItem';
import styles from '../styles/desktop.module.css'


function NavBar() {

  const [drawerMode, setdrawerMode] = useState<boolean>(false);

  return (
    <div className={`${styles.NavBar} fixed z-[1000] top-0 flex items-center h-[10vh] w-[100vw] justify-between box-border px-[15px] backdrop-blur-2xl`} >
      {/*---------- logo -----------*/}
      <img src="/Assets/lightmode/logo-light.png" alt="logo" className={`${styles.Logo} w-[30%] max-w-[100px]`} />
      {/*---------- logo -----------*/}

      {/*------------- navigation bar contents starts here --------------------- */}

      <div className={`${styles.NavBarItemsContainer} sm:w-[45%]`}>

        {/*---------------- navigation bar items visible only in desktop mode starts here --------------------*/}

        <div className="w-[100%] hidden sm:flex sm:items-center sm:justify-evenly ">
          <Link href={"/"}><span className={`${styles.NavBarItems} cursor-pointer`}>Home</span></Link>
          <Link href={"/designs"}><span className={`${styles.NavBarItems} cursor-pointer`}>Designs</span></Link>
          <Link href={"/challenges"}><span className={`${styles.NavBarItems} cursor-pointer`}>Challenges</span></Link>
          <Link href={"/"}><span className={`${styles.NavBarItems} cursor-pointer`}>About Us</span></Link>
          <AiOutlineBell className={`${styles.BellIcon} cursor-pointer`} size={25} />
          <div className="group flex flex-col items-center justify-center cursor-pointer">
            <img src="/Assets/icons/avatar.png" alt="" className={`${styles.Avatar} max-w-[50px] cursor-pointer`} />

            {/*----------------- mini navigation drawer of desktopmode starts here --------------*/}

            <div className={`${styles.DrawerDesktop} hidden group-hover:flex flex-col items-center justify-start fixed w-[15vw] min-w-[200px] h-[30vh] bg-white top-[9vh] right-[4vw] rounded-[20px] shadow-task sm:z-[100]`}>
              <DrawerItem url='/Assets/lightmode/home(1).png' title='Home' redAccent={false} destination={""} upcoming={false} />
              <DrawerItem url='/Assets/lightmode/user.png' title='Profile' redAccent={false} destination={"profile"} upcoming={false} />
              <DrawerItem url='/Assets/lightmode/log-out.png' title='Sign Out' redAccent={true} destination={""} upcoming={false} />
            </div>

            {/*----------------- mini navigation drawer of desktopmode ends here --------------*/}

          </div>
        </div>

        {/*---------------- navigation bar items visible only in desktop mode ends here --------------------*/}

        {/*------------------- navigation items(Hamburger menu) visible only in mobile view starts here ------------------*/}

        <div className="group flex items-center justify-center w-[40px] h-[37px] bg-white rounded-[5px] block sm:hidden shadow-task">
          <img onClick={() => setdrawerMode(!drawerMode)} src="/Hamburger Menu.svg" alt="" className="w-[90%] max-w-[25px] " />
            {/*---------------- navigation drawer in mobile view starts here -------------*/}
          {drawerMode && (
            <div className="fixed w-[55vw] h-auto overflow-hidden bg-white top-[9vh] right-[4vw] rounded-[20px] shadow-task">
              <DrawerItem url='/Assets/lightmode/home(1).png' title='Home' redAccent={false} destination={""} upcoming={false} />
              <DrawerItem url='/Assets/lightmode/design.png' title='Designs' redAccent={false} destination={"/designs"} upcoming={false} />
              <DrawerItem url='/Assets/lightmode/challenge.png' title='Challenges' redAccent={false} destination={"/challenges"} upcoming={false} />
              <DrawerItem url='/Assets/lightmode/user.png' title='Profile' redAccent={false} destination={"profile"} upcoming={false} />
              <DrawerItem url='/Assets/lightmode/icons8-bell-24.png' title='Notification' redAccent={false} destination={""} upcoming={false} />
              <DrawerItem url='/Assets/lightmode/moon.png' title='Darkmode' redAccent={false} destination={""} upcoming={true} />
              <DrawerItem url='/Assets/lightmode/log-out.png' title='Sign Out' redAccent={true} destination={""} upcoming={false} />
            </div>
          )}

            {/*---------------- navigation drawer in mobile view ends here -------------*/}

        </div>

        {/*------------------- navigation items visible(Hamburger menu) only in mobile view ends here ------------------*/}

      </div>

      {/*------------- navigation bar contents ends here --------------------- */}


    </div>
  );
}

export default NavBar;
