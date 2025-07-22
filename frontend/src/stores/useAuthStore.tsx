import axios, { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type User = { id: string; name: string; email: string; createdAt: Date };
export type Credentials = { email: string; password: string };

type AuthStateStore = {
    user: User | null;
    signinLoading: boolean;
    signupLoading: boolean;
    signoutLoading: boolean;
    signin: (credentials: Credentials) => Promise<void>;
    signup: (credentials: { name: string } & Credentials) => Promise<void>;
    signOut: () => Promise<void>;
};

export const useAuthState = create<AuthStateStore>()(
    persist(
        (set) => ({
            user: null,
            signinLoading: false,
            signupLoading: false,
            signoutLoading: false,

            signin: async ({ email, password }) => {
                set({ signinLoading: true });
                try {
                    const response = await axios.post("/auth/signin", { email, password });
                    set({ user: response.data.data.user });
                    toast.success(response.data.message);
                } catch (error) {
                    toast.error(isAxiosError(error) ? error.response?.data?.message : "Something went wrong");
                } finally {
                    set({ signinLoading: false });
                }
            },

            signup: async ({ name, email, password }) => {
                set({ signupLoading: true });
                try {
                    const response = await axios.post("/auth/signup", { name, email, password });
                    set({ user: response.data.data.user });
                    toast.success(response.data.message);
                } catch (error) {
                    toast.error(isAxiosError(error) ? error.response?.data?.message : "Something went wrong");
                } finally {
                    set({ signupLoading: false });
                }
            },
            signOut: async () => {
                set({ signoutLoading: true });
                try {
                    const response = await axios.post("/auth/signout");
                    set({ user: null });

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    toast.success(response.message);
                } catch (error) {
                    toast.error(isAxiosError(error) ? error.response?.data?.message : "Something went wrong");
                } finally {
                    set({ signoutLoading: false });
                }
            },
        }),
        {
            name: "insightbase_auth",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user }),
        }
    )
);
