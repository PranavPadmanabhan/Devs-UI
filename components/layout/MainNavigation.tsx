import Link from "next/link";
function MainNavigation() {
  return (
    <header className="flex items-center h-[10vh] w-screen justify-between bg-transparent pl-[10px]">
      <div className="">React Meetups</div>
      <nav className="flex w-[50%]" >
        <ul className="flex bg-transparent w-full h-10 items-center justify-evenly " >
          <li>
            <Link href="/">Designs</Link>
          </li>
          <li>
            <Link href="/new-meetup">Challenges</Link>
          </li>
          <li>
            <Link href="/new-meetup">About us</Link>
          </li>
          <li>
            <Link href="/new-meetup">About us</Link>
          </li>
          <li>
            <Link href="/new-meetup">About us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
