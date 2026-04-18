import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { LoginSchema } from "../schemas/loginSchema";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { RegisterSchema } from "../schemas/registerSchema";
import type { ChangePasswordSchema } from "../schemas/changePasswordSchema";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/accounts/user-info');
            return response.data
        },
        // enabled: !queryClient.getQueryData(['user'])
    });

    const loginUser = useMutation({
        mutationFn: async (data: LoginSchema) => {
            await agent.post('/login?useCookies=true', data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
            await navigate('/activities');
        }
    });

    const registerUser = useMutation({
        mutationFn: async (data: RegisterSchema) => {
            await agent.post('/accounts/register', data);
        },
        onSuccess: async () => {
            toast.success('Register successful - you can now login');
            navigate('/login');
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/accounts/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['user']});
            queryClient.removeQueries({queryKey: ['activities']});
            navigate('/');
        }
    })

    const verifyEmail = useMutation({
        mutationFn: async({userId, code}: {userId: string, code: string}) => {
            await agent.get(`/confirmEmail?userId=${userId}&code=${code}`);
        }
    })

    const resendConfirmationEmail  = useMutation({
        mutationFn: async({userId, email}: {userId?: string | null, email?: string | null}) => {
            await agent.get(`/accounts/resend-confirm-email`, {
                params: { userId, email }
            });
        },
        onSuccess: () => {
            toast.success('Email sent - please check your inbox');
        }
    })

    const changePassword = useMutation({
        mutationFn: async (data: ChangePasswordSchema) => {
            await agent.post('/account/change-password', data);
        }
    });

    const forgotPassword = useMutation({
        mutationFn: async (email: string) => {
            await agent.post('/forgotPassword', {email})
        }
    })


    const resetPassword = useMutation({
        mutationFn: async (data: ResetPassword) => {
            await agent.post('/resetPassword', data);
        }
    })

    return {
        currentUser,
        loadingUserInfo,
        loginUser,
        registerUser,
        logoutUser,
        verifyEmail,
        resendConfirmationEmail,
        changePassword,
        forgotPassword,
        resetPassword,
    }
}