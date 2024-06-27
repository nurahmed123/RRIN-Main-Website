import Loading from "@/components/Loading";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";


const login = () => {

    const { data: session, status } = useSession();

    if (status === "loading") {
        // Loading state, loader or any other indicator
        return <div className='lodingdata flex flex-col flex-center wh_100'>
            <Loading />
            <h1 className='mt-1'>Loading...</h1>
        </div>
    }

    const router = useRouter();

    async function login() {
        await router.push('/');
        await signIn();
    }

    if (session) {
        router.push('/');
        return null; // Return null or any loading indicator while redirecting
    }


    if (!session) {
        return (
            <div className="loginfront flex flex-center flex-col full-w" >
                <Image src='/img/user.png' width={250} height={250} />
                <h1  >Welcome Admin of the RoboSuperior 👋</h1>
                <p>Visit my profile <Link target="_blank" href="https://linkedin.com/in/06nurahmed">Md Nur Ahmad</Link></p>

                <button onClick={login} className='mt-2' >Login with Google</button>
            </div>
        )
    }
}

export default login