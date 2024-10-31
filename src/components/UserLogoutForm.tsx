"use client"
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface UserLogoutForm {
  children: React.ReactNode;
}


const UserLogoutForm: React.FC<UserLogoutForm> = ({ children }) => {
  const logout = async () => {
    await signOut({ callbackUrl: "http://localhost:3000/" })

  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? You will need to log in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            type='button'
            onClick={logout}
          >Logout</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export default UserLogoutForm;
