"use client"
import { toast } from "sonner"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { RegisterUser } from "@/actions/auth"
import { Fragment, useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

type AuthMode = "login" | "register" | "reset-password";

const LoginDialog = ({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
    const [mode, setMode] = useState<AuthMode>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            if (mode === "register") {
                const res = await RegisterUser(email, password)
                if (res.error) {
                    toast.error(res.error.includes("Unique constraint") ? "Email already exists" : res.error)
                    return
                }
            }
            const res = await signIn("credentials", { email, password, redirect: false });
            if (res?.error) {
                toast.error(res.error)
                return
            }
            toast.success("Login successfully")
            setOpen(false)
        })
    }

    const title = mode === "login" ? `Login to your account` : `Create an account!`;
    const description = mode === "login" ? `Enter your email/password below to login` : `Fill in the details to register for an account`;

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            setEmail("");
            setPassword("");
            setMode("login");
        }}>
            <DialogContent className="w-[400px]">
                <Fragment>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    <div className="flex flex-col gap-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {mode === "login" && (
                                        <Button variant="link" type="button">
                                            Forgot your password?
                                        </Button>
                                    )}
                                </div>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>


                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "login" ? "Login" : "Register"}
                                </Button>
                            </div>

                            <div className="mt-4 text-center text-sm">
                                {mode === "login" ? (
                                    <>
                                        <div className="mt-4 text-center text-sm">
                                            Don&apos;t have an account?{" "}
                                            <Button variant="link" type="button" onClick={() => { setMode("register") }}>Sign up</Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mt-4 text-center text-sm">
                                            Already have an account?{" "}
                                            <Button variant="link" type="button" onClick={() => { setMode("login") }}>Login</Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </Fragment>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog