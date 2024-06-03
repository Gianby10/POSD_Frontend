"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, Plus, UserRound } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
};

const UserDropdown = ({ username }: Props) => {
  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <UserRound className="h-5 w-5" />
            <span className="font-bold">{username}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Il mio profilo</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              router.push("/patterns/add");
            }}
          >
            <Plus className="h-3 w-3 mr-1" />
            Suggerisci nuovo pattern
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 cursor-pointer"
            onClick={() => {
              logoutAction();
            }}
          >
            <LogOut className="h-3 w-3 mr-1" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropdown;
