interface IUseAuthReturn {
    isLoggedIn: boolean;
    userEmail: string | null;
}
export declare const useAuth: () => IUseAuthReturn;
export {};
