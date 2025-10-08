"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { ChevronDown, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react"
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="w-full bg-white border-b shadow-sm p-4 flex justify-between items-center">
      <Link className="text-xl font-semibold cursor-pointer" href={'/timesheet'}>TickClock</Link>
      <div className="flex  w-full justify-between">
        <div className="px-4">Timesheets</div>
        <div className="flex space-x-2">
          <div>{session?.user.username} </div>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <ChevronDown />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem className="bg-white   rounded-sm shadow flex  border  cursor-pointer" onClick={()=>signOut()}>
                    <Button variant="ghost"  className="cursor-pointer"> logout  <LogOut /> </Button>
        
                    </MenubarItem>
                </MenubarContent>
        
              </MenubarMenu>
            </Menubar>
        </div>
      </div>
    </header>
  );
};

export default Header;
