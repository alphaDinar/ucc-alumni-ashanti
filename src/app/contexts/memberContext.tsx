'use client'
import { Dispatch, ReactNode, createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { fireAuth, fireStoreDB } from '@/Firebase/base';

interface defType extends Record<string, any> { };

type memberContextProviderProps = {
  children: ReactNode;
};

type memberContext = {
  member: defType,
  setMember: Dispatch<React.SetStateAction<defType>>;
}

export const MemberContext = createContext<memberContext | null>(null);

export const MemberContextProvider = ({ children }: memberContextProviderProps) => {
  const [member, setMember] = useState<defType>({});

  useEffect(() => {
    const authStream = onAuthStateChanged(fireAuth, (user) => {
      if (user) {
        const memberStream = onSnapshot(doc(fireStoreDB, 'Members/' + user.uid), (snapshot) => {
          if (snapshot.exists()) {
            const memberTemp: defType = (snapshot.data());
            setMember(memberTemp);
          }
        });
        return () => memberStream();
      }
    });

    return () => authStream();
  }, [])

  return (
    <MemberContext.Provider value={{ member, setMember }}>
      {children}
    </MemberContext.Provider>
  )
}

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMemberContext must be within a cartContextProvider");
  }
  return context;
}
