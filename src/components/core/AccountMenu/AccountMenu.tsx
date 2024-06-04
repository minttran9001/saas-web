import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import React from "react";
import SignOut from "../SignOut/SignOut";
import { TUser } from "@/utils/types";

type Props = {
  user?: TUser;
};

type AccountMenuComponentProps = {
  avatarImage: string;
  avatarFallback: string;
  name?: string;
};

const AccountMenuComponent = (props: AccountMenuComponentProps) => {
  const { avatarImage, avatarFallback, name } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={avatarImage} alt={avatarFallback} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const AccountMenu = (props: Props) => {
  const { user } = props;
  if (!user) return null;

  return (
    <AccountMenuComponent
      avatarImage={user.image || ""}
      avatarFallback={`${user.firstName[0]}${user.lastName[0]}`}
      name={`${user.firstName} ${user.lastName}`}
    />
  );
};

export default AccountMenu;
