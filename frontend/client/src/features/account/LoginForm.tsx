import { useForm } from "react-hook-form";
import { useAccount } from "../../libs/hooks/useAccount"
import { loginSchema, type LoginSchema } from "../../libs/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomizedTextField from "../../app/shared/components/CustomizedTextField";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";
import { LockOpen } from "@mui/icons-material";

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();

    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        loginUser.mutate(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities')
            }
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onError = (error: any) => {
        console.log(error);
    }

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit, onError)}
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
                <LockOpen fontSize='large' />
                <Typography variant="h4">Sign in</Typography>
            </Box>
            <CustomizedTextField label='Email' control={control} name='email' />
            <CustomizedTextField label='Password' control={control} name='password' type='password' />
            <Button
                type='submit'
                loading={isSubmitting}
                disabled={!isValid}
                variant="contained"
                size="large">Login</Button>
            <Typography sx={{ textAlign: 'center' }}>
                Don't have an account?
                <Typography sx={{ ml: 2 }} component={Link} to='/register' color='primary'>
                    Sign up
                </Typography>
            </Typography>
        </Paper>
    )
}