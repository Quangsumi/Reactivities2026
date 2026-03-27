import {useAccount} from "../../libs/hooks/useAccount";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, Paper, Typography} from "@mui/material";
import {LockOpen} from "@mui/icons-material";
import {registerSchema, type RegisterSchema} from "../../libs/schemas/registerSchema";
import { Link } from "react-router";
import CustomizedTextField from "../../app/shared/components/CustomizedTextField";

export default function RegisterForm() {
    const {registerUser} = useAccount();
    const {control, handleSubmit, setError, formState: {isValid, isSubmitting}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach((err) => {
                        if (err.includes('Email')) setError('email', {message: err});
                        else if (err.includes('Password')) setError('password', {message: err});
                    });
                }
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onError = (error: any) => console.log(error)

    return (
        <Paper component='form' onSubmit={handleSubmit(onSubmit, onError)}
               sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   p: 3,
                   gap: 3,
                   maxWidth: 'md',
                   mx: 'auto',
                   borderRadius: 3
               }}>
            <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
                <LockOpen fontSize='large'/>
                <Typography variant="h4">Register</Typography>
            </Box>
            <CustomizedTextField label='Email' control={control} name='email'/>
            <CustomizedTextField label='Display name' control={control} name='displayName'/>
            <CustomizedTextField label='Password' control={control} name='password' type='password'/>
            <Button
                type='submit'
                loading={isSubmitting}
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large">Register</Button>
            <Typography sx={{ textAlign: 'center' }}>
                Already have an account?
                <Typography sx={{ ml: 2 }} component={Link} to='/login' color='primary'>
                    Sign in
                </Typography>
            </Typography>
        </Paper>
    );
}