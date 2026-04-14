import { Box, Button } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../libs/hooks/useProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema, type EditProfileSchema } from "../../libs/schemas/editProfileSchema";
import { useEffect } from "react";
import CustomizedTextField from "../../app/shared/components/CustomizedTextField";

type Props = {
    setEditMode: (mode: boolean) => void
}

export default function ProfileEdit({setEditMode}: Props) {
    const { id } = useParams();
    const { updateProfile, profile } = useProfile(id);
    const { control, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<EditProfileSchema>({
	        resolver: zodResolver(editProfileSchema),
	        mode: 'onTouched'
    });
    
    useEffect(() => {
        reset({
            displayName: profile?.displayName,
            bio: profile?.bio || ''
        });
    }, [profile, reset]);

    const onSubmit = (data: EditProfileSchema) => {
        updateProfile.mutate(data, {
            onSuccess: () => {setEditMode(false)}
        });
    }

    return (
        <Box component='form'
            onSubmit={handleSubmit(onSubmit)}
            display='flex'
            flexDirection='column'
            alignContent='center'
            gap={3}
            mt={3}
        >
            <CustomizedTextField label='Display Name' name='displayName' control={control} />
            <CustomizedTextField label='Add your bio' name='bio' control={control} multiline rows={4} />
            <Button type='submit' variant='contained' disabled={!isValid || !isDirty || updateProfile.isPending}>
                Update profile
            </Button>
        </Box>
    )
}