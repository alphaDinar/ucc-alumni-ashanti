'use client'
import Image from "next/image";
import Panel from "../Panel/Panel";
import styles from './members.module.css';
import { MdArrowForward } from "react-icons/md";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { fireStoreDB } from "@/Firebase/base";
import Link from "next/link";
import { sortByTime } from "@/External/sort";
import { fixContact } from "@/External/auth";

interface defType extends Record<string, any> { };
const Members = () => {
  const person = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711721582/maqete/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV_ue71a2.jpg';

  const [allMembers, setAllMembers] = useState<defType[]>([]);
  const [members, setMembers] = useState<defType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [profession, setProfession] = useState('');

  useEffect(() => {
    const memberStream = onSnapshot(collection(fireStoreDB, 'Members/'), (snapshot) => {
      setMembers(sortByTime(snapshot.docs.map((member) => ({ id: member.id, ...member.data() }))));
      setAllMembers(sortByTime(snapshot.docs.map((member) => ({ id: member.id, ...member.data() }))));
      setIsLoading(false);
    });

    return () => memberStream();
  }, [])

  const searchMembers = (name: string, contact: string, profession: string, location: string) => {
    const membersTemp = [...allMembers];
    const updatedMembers = membersTemp.filter((el) => el.contact.toLowerCase().includes(contact.toLowerCase())).filter((el) => el.profession.toLowerCase().includes(profession.toLowerCase())).filter((el) => el.location.toLowerCase().includes(location.toLowerCase())).filter((el) => el.fullName.toLowerCase().includes(name.toLowerCase()));
    setMembers(updatedMembers);
  }


  return (
    <Panel>
      <section id="frame" className={styles.memberBox}>
        <header>
          <h3>Members</h3>
          <div>
            <input type="text" placeholder="search Name" value={name} onChange={(e) => { setName(e.target.value); searchMembers(e.target.value, contact, profession, location) }} />
            <input type="text" placeholder="search Contact" value={contact} onChange={(e) => { setContact(e.target.value); searchMembers(name, e.target.value, profession, location) }} />
            <input type="text" placeholder="search Location" value={location} onChange={(e) => { setLocation(e.target.value); searchMembers(name, contact, profession, e.target.value) }} />
            <input type="text" placeholder="search Profession" value={profession} onChange={(e) => { setProfession(e.target.value); searchMembers(name, contact, e.target.value, location) }} />
            <select name="" id="">
              <option value="" hidden>Year</option>
            </select>
          </div>
        </header>

        <section className={styles.members}>
          {members.map((member, i) => (
            <Link href={{ pathname: '/manager/viewMember', query: { member: JSON.stringify(member) } }} className={styles.member} key={i}>
              <Image src={person} alt="" className="cover" width={50} height={50} />
              <p>
                <strong>{member.fullName}</strong>
                <small>{member.profession}</small>
              </p>
              <span className="cash">{fixContact(member.contact)}</span>
              <span>{member.location}</span>
              <strong className="cash">{member.year}</strong>
              <MdArrowForward />
            </Link>
          ))}
        </section>
      </section>
    </Panel>
  );
}

export default Members;