import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { LoginSchema } from "../schemas/loginSchema";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { RegisterSchema } from "../schemas/registerSchema";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

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

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/accounts/user-info');
            return response.data
        },
        // enabled: !queryClient.getQueryData(['user'])
    });

    return {
        currentUser,
        loadingUserInfo,
        loginUser,
        registerUser,
        logoutUser,
    }
}