'use client'
import { useEffect, useState } from "react";
import PageLogin from "../login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/index";
// import Login from "../Login";
import LoadingComponent from "@/app/components/Loading";


const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAuthComponent: React.FC<P> = (props: P) => {
        const [user, setUser] = useState(null)
        const [loading, setLoading] = useState(true)
        const [isAuth, setIsAuh] = useState(false)


        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setUser(user);
                setLoading(false);
                setIsAuh(true)
            } else {
                setUser(null);
                setLoading(false);
                setIsAuh(false)
            }
        });

        if (loading) {
            return (
              <LoadingComponent/>
            )
        }

        return isAuth ? <WrappedComponent {...props} /> : <PageLogin />;
    };

    return WithAuthComponent;
};

export default withAuth;
