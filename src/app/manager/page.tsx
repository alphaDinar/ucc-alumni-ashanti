'use client';
import { MdAdd, MdMoney, MdOutlineCategory, MdOutlineLocalShipping, MdOutlinePendingActions, MdOutlineSelfImprovement, MdOutlineSmartphone, MdPhone } from "react-icons/md";
import Panel from "./Panel/Panel";
import styles from './manager.module.css';
import Link from "next/link";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { fireStoreDB } from "@/Firebase/base";
import { getTimeSince } from "@/External/time";
import { sortByTime } from "@/External/sort";
import { getOrderQuantity, getOrderSetTotal } from "@/External/services";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { fireAuth } from '@/Firebase/base';


interface defType extends Record<string, any> { };
const Manager = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<defType[]>([]);
  const [categories, setCategories] = useState<defType[]>([]);
  const [products, setProducts] = useState<defType[]>([]);
  const [customers, setCustomers] = useState<defType[]>([]);

  useEffect(() => {
    // const authStream = onAuthStateChanged(fireAuth, (user) => {
    //   if (user) {
    //     if (user.email === 'admin@manager.com') {
    //       orderStream();
    //       categoryStream();
    //       productStream();
    //       customerStream();
    //     } else {
    //       signOut(fireAuth)
    //         .then(() => router.push('/manager/login'));
    //     }
    //   } else {
    //     router.push('/manager/login');
    //   }
    // })

    const orderStream = onSnapshot(collection(fireStoreDB, 'Orders/'), (snapshot) => {
      setOrders(sortByTime(snapshot.docs.map((order) => ({ id: order.id, ...order.data() }))));
    });

    const categoryStream = onSnapshot(collection(fireStoreDB, 'Categories/'), (snapshot) => {
      setCategories(snapshot.docs.map((cat) => ({ id: cat.id, ...cat.data() })));
    });

    const productStream = onSnapshot(collection(fireStoreDB, 'Products/'), (snapshot) => {
      setProducts(snapshot.docs.map((prod) => ({ id: prod.id, ...prod.data() })));
    });

    const customerStream = onSnapshot(collection(fireStoreDB, 'Customers/'), (snapshot) => {
      setCustomers(snapshot.docs.map((cus) => ({ id: cus.id, ...cus.data() })));
    });

    return () =>
    // authStream();

    {
      orderStream();
      categoryStream();
      productStream();
      customerStream();
    }
  }, [])

  return (
    <Panel>
      <section className={styles.con}>
      </section>
    </Panel>
  );
}

export default Manager;