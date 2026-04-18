import { useForm, useWatch } from "react-hook-form";
import { useAccount } from "../../libs/hooks/useAccount"
import { loginSchema, type LoginSchema } from "../../libs/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomizedTextField from "../../app/shared/components/CustomizedTextField";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";
import { GitHub, LockOpen } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
    const { loginUser, resendConfirmationEmail } = useAccount();
    const [ notVerified, setNotVerified ] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const email = useWatch({control, name: 'email'});

    const onSubmit = async (data: LoginSchema) => {
        loginUser.mutate(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/activities')
            },
            onError: (error) => {
                console.log(error);
                if(error.message === 'NotAllowed') {
                    setNotVerified(true);
                }
            }
        })
    }

    const handleResendEmail = async () => {
        try {
            await resendConfirmationEmail.mutateAsync({email});
            setNotVerified(true);
        } catch (error) {
            console.log(error);
            toast.error('Problem sending email - please check email address');
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onError = (error: any) => {
        console.log(error);
    }

    const loginWithGithub = () => {
        const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectUrl = import.meta.env.VITE_REDIRECT_URI;
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirectUri=${redirectUrl}&scope=read:user user:email`
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
                size="large">
                    Login
            </Button>
            <Button
                type='button'
                startIcon={<GitHub />}
                sx={{background: 'black'}}
                onClick={loginWithGithub}
                variant="contained"
                size="large">
                    Login with Github
            </Button>
            {notVerified 
                ? <Box display='flex' flexDirection='column' justifyContent='center'>
                    <Typography textAlign='center' color="error">
                        Your email has not been verified. You can click the button to re-send the verfication link.
                    </Typography>
                    <Button
                        disabled={resendConfirmationEmail.isPending}
                        onClick={handleResendEmail}
                    >
                        Re-send email link
                    </Button>
                    </Box>
                : (
                    <Box display='flex' alignItems='center' justifyContent='center' gap={3}>
                    <Typography>
                            Forgot password? Click <Link to='/forgot-password'>here</Link>
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don't have an account?
                        <Typography sx={{ ml: 2 }} component={Link} to='/register' color='primary'>
                            Sign up
                        </Typography>
                    </Typography>
                    </Box>
                    )}
        </Paper>
    )
}