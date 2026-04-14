import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";

export default function useActivities(id?: string) {
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    const location = useLocation();

    const {data: activities, isPending} = useQuery({
        queryKey: ['activities'],
        queryFn: async() => {
        const response = await agent.get<Activity[]>('/activities');
        return response.data;
        }, 
        enabled: !id && location.pathname === '/activities' && !!currentUser,
        select: data => {
            const activities = data.map(activity => {
                const host = activity.attendees.find(a => a.id === activity.hostId)
                return {
                    ...activity,
                    isHost: activity.hostId === currentUser?.id,
                    isGoing: activity.attendees.some(a => a.id === currentUser?.id),
                    hostImageUrl: host?.imageUrl
                }
            })
            return activities;
        }
    })

    const { isLoading: isLoadingActivity, data: activity } = useQuery<Activity>({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        //enabled: !!id //only run query if id is present
        enabled: Boolean(id),
        select: data => {
            const host = data.attendees.find(x => x.id === data.hostId);
            const activity = {
                ...data,
                isHost: currentUser?.id === data.hostId,
                isGoing: data.attendees.some(a => a.id === currentUser?.id),
                hostImageUrl: host?.imageUrl
            }
            return activity
        }
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    });

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post('/activities', activity);
            console.log(response);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    const updateAttendee = useMutation({
        mutationFn: async (id: string) => {
            const response = await agent.post(`/activities/${id}/attend`);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            })
        }
    })

    return {
        activities,
        isPending,
        updateActivity,
        createActivity,
        deleteActivity,
        updateAttendee,
        activity,
        isLoadingActivity
    }
}
