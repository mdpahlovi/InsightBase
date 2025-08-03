import axios from "@/lib/axios";
import { deleteCookie } from "cookies-next/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type User = { id: string; name: string; email: string; createdAt: Date };
export type Credentials = { email: string; password: string; route: AppRouterInstance; element: HTMLFormElement };

type AuthStateStore = {
    user: User | null;
    signinLoading: boolean;
    signupLoading: boolean;
    signoutLoading: boolean;
    signin: (credentials: Credentials) => Promise<void>;
    signup: (credentials: { name: string } & Credentials) => Promise<void>;
    signOut: ({ route }: { route: AppRouterInstance }) => Promise<void>;
};

export const useAuthState = create<AuthStateStore>()(
    persist(
        (set) => ({
            user: null,
            signinLoading: false,
            signupLoading: false,
            signoutLoading: false,

            signin: async ({ email, password, route, element }) => {
                set({ signinLoading: true });
                try {
                    const response = await axios.post("/auth/signin", { email, password });
                    set({ user: response.data.data.user });

                    element.reset();
                    route.replace("/");

                    toast.success(response.data.message);
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    toast.error(error?.message);
                } finally {
                    set({ signinLoading: false });
                }
            },

            signup: async ({ name, email, password, route, element }) => {
                set({ signupLoading: true });
                try {
                    const response = await axios.post("/auth/signup", { name, email, password });
                    set({ user: response.data.data.user });

                    element.reset();
                    route.replace("/");

                    toast.success(response.data.message);
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    toast.error(error?.message);
                } finally {
                    set({ signupLoading: false });
                }
            },
            signOut: async ({ route }: { route: AppRouterInstance }) => {
                deleteCookie("token");
                set({ user: null });

                route.replace("/signin");

                toast.success("Signout successfully");
            },
        }),
        {
            name: "insightbase_auth",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user }),
        }
    )
);
