import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";
import type { EditProfileSchema } from "../schemas/editProfileSchema";

export const useProfile = (id?: string) => {
    const queryClient = useQueryClient();
    
    const isCurrentUser = useMemo(() => {
      return id === queryClient.getQueryData<User>(['user'])?.id
    }, [id, queryClient])

    const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/profiles/${id}`);
            return response.data
        },
        enabled: !!id
    });

    const {data: photos, isLoading: loadingPhotos} = useQuery<Photo[]>({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
            return response.data
        },
        enabled: !!id
    });

    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await agent.post('/profiles/add-photo', formData, {
                headers: {'Content-type': 'multipart/form-data'}
            });
            return response.data;
        },
        onSuccess: async (photo: Photo) => {
            await queryClient.invalidateQueries({
                queryKey: ['photos', id]
            });
            
            // same result but trade-off performance 
            // await queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.setQueryData(['user'], (user: User) => {
                if (!user) return user;
                return {
                    ...user,
                    imageUrl: user.imageUrl ?? photo.url
                }
            });

            // same result but trade-off performance
            // await queryClient.invalidateQueries({ queryKey: ['profile', id] });
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if (!profile) return profile;
                return {
                    ...profile,
                    imageUrl: profile.imageUrl ?? photo.url
                }
            });
        }
    });

    const updateProfile = useMutation({
        mutationFn: async (profile: EditProfileSchema) => {
            await agent.put(`/profiles`, profile);
        },
        onSuccess: (_, profile) => {
            // same result but trade-off performance
            // await queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.setQueryData(['user'], (user: User) => {
                if (!user) return user;
                return {
                    ...user,
                    displayName: profile.displayName,
                    bio: profile.bio
                }
            });
    
            // same result but trade-off performance
            // await queryClient.invalidateQueries({ queryKey: ['profile', id] });
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if (!profile) return profile;
                return {
                    ...profile,
                    displayName: profile.displayName,
                    bio: profile.bio
                }
            });
        }
    });

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.put(`/profiles/set-main/${photo.id}`, {});
        },
        onSuccess: (_, photo) => {

            // same result but trade-off performance
            // await queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.setQueryData(['user'], (user: User) => {
                if (!user) return user;
                return {
                    ...user,
                    imageUrl: photo.url
                }
            });

            // same result but trade-off performance
            // await queryClient.invalidateQueries({ queryKey: ['profile', id] });
            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if (!profile) return profile;
                return {
                    ...profile,
                    imageUrl: photo.url
                }
            });
        }
    });
    
    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => {
            await agent.delete(`/profiles/photos/${photoId}`);
        },
        onSuccess: (_, photoId) => {
            // same result but trade-off performance
            // await queryClient.invalidateQueries({ queryKey: ['profile', id] });
            queryClient.setQueryData(['photos', id], (photos: Photo[]) => {
                return photos?.filter(p => p.id !== photoId);
            });
        }
    })

    return {
        profile,
        loadingProfile,
        photos,
        loadingPhotos,
        uploadPhoto,
        setMainPhoto,
        deletePhoto,
        updateProfile,
        isCurrentUser,
    }
}