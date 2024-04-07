'use client'
import Image from "next/image";
import Panel from "../Panel/Panel";
import styles from './viewMember.module.css';
import Link from "next/link";
import { fixContact } from "@/External/auth";
import { HiMiniArrowRight } from "react-icons/hi2";

interface defType extends Record<string, any> { };
const Payments = ({ searchParams }: { searchParams: { member: string } }) => {
  const member = JSON.parse(searchParams.member);
  const person = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711721582/maqete/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV_ue71a2.jpg';
  return (
    <Panel>
      <section id="frame" className={styles.paymentBox}>
        <header>
          <h3>{member.fullName}</h3>
        </header>
        <Link href={''} className={styles.member}>
          <Image src={person} alt="" className="cover" width={50} height={50} />
          <p>
            <span>First Name</span> <HiMiniArrowRight />  <strong>{member.firstName}</strong>
          </p>
          {member.middleName &&
            <p>
              <span>Middle Name</span> <HiMiniArrowRight />  <strong>{member.firstName}</strong>
            </p>
          }
          <p>
            <span>Surname</span> <HiMiniArrowRight />  <strong>{member.surname}</strong>
          </p>
          <p>
            <span>Contact</span> <HiMiniArrowRight />  <strong className="cash">{fixContact(member.contact)}</strong>
          </p>
          <p>
            <span>E-mail</span> <HiMiniArrowRight />  <strong>{member.email}</strong>
          </p>
          <p>
            <span>Profession</span> <HiMiniArrowRight />  <strong>{member.profession}</strong>
          </p>
          <p>
            <span>Place of Residence</span> <HiMiniArrowRight />  <strong>{member.location}</strong>
          </p>
          <p>
            <span>Program</span> <HiMiniArrowRight />  <strong>{member.program}</strong>
          </p>
          <p>
            <span>Year</span> <HiMiniArrowRight />  <strong>{member.year}</strong>
          </p>
        </Link>
      </section>
    </Panel>
  );
}

export default Payments;