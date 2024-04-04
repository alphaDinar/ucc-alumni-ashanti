'use client'
import { ReactNode, useEffect, useState } from "react";
import styles from './panel.module.css';
import { MdEvent, MdLinearScale, MdOutlineAnalytics, MdOutlineCategory, MdOutlineHome, MdOutlineMenu, MdOutlineNotifications, MdOutlineShoppingCartCheckout, MdOutlineSmartphone, MdPowerSettingsNew } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { fireAuth } from '@/Firebase/base';
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LiaDonateSolid } from "react-icons/lia";

type panelProps = {
  children: ReactNode
}

const Panel = ({ children }: panelProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    // const authStream = onAuthStateChanged(fireAuth, (user) => {
    //   if (user) {
    //     if (user.email === 'admin@manager.com') {
    //       setIsManager(true);
    //     } else {
    //       signOut(fireAuth)
    //         .then(() => router.push('/manager/login'));
    //     }
    //   } else {
    //     router.push('/manager/login');
    //   }
    // })
    // return () => authStream();
  }, [])

  const topTagList = [
    { tag: 'Home', iconEl: <MdOutlineHome />, target: '/manager' },
    { tag: 'Members', iconEl: <HiOutlineUserGroup />, target: '/manager/members' },
    { tag: 'Donations', iconEl: <LiaDonateSolid />, target: '/manager/donations' },
    { tag: 'Events', iconEl: <MdEvent />, target: '/manager/events' },
    { tag: 'Notifications', iconEl: <MdOutlineNotifications />, target: '/manager/notifications' },
  ]

  const lowTagList = [
    { tag: 'Payments', iconEl: <MdOutlineAnalytics />, target: '/manager/sales' },
    // { tag: 'Customer Analytics', iconEl: <MdOutlineAnalytics />, target: '/manager/customers' },
    // { tag: 'Delivery Analytics', iconEl: <MdOutlineAnalytics />, target: '/manager/dispatch' },
  ]

  const [sidebarToggled, setSidebarToggled] = useState(false);

  const toggleSidebar = () => {
    sidebarToggled ? setSidebarToggled(false) : setSidebarToggled(true);
  }

  return (
    <main className={styles.panel}>
      <section className={sidebarToggled ? `${styles.sidebar} ${styles.change}` : styles.sidebar}>
        <MdOutlineMenu className={styles.tag} onClick={toggleSidebar} />
        <header>
          <strong>Maqete</strong>
        </header>

        <article>
          <nav>
            {topTagList.map((el, i) => (
              <Link key={i} href={el.target} style={pathname === el.target ? { border: '1px solid #D4D4D4' } : { border: '1px solid transparent' }}  >
                {el.iconEl} <span>{el.tag}</span>
              </Link>
            ))}
          </nav>
          <hr />
          <nav>
            {lowTagList.map((el, i) => (
              <Link key={i} href={el.target} style={pathname === el.target ? { border: '1px solid #D4D4D4' } : { border: '1px solid transparent' }}  >
                {el.iconEl} <span>{el.tag}</span>
              </Link>
            ))}
          </nav>
        </article>

        <footer>
          <a>
            <MdPowerSettingsNew />
            <span>Logout</span>
          </a>
        </footer>
      </section>

      <section className={sidebarToggled ? `${styles.conBox} ${styles.change}` : styles.conBox}>
        {children}
      </section>

      {/* {!isManager &&
        <section className={styles.loaderBox}></section>
      } */}
    </main>
  );
}

export default Panel;