import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useAccount } from "../../libs/hooks/useAccount";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { EmailRounded } from "@mui/icons-material";

export default function VerifyEmail() {
    const hasRun = useRef(false);
    const [status, setStatus] = useState('verifying');
    const { resendConfirmationEmail, verifyEmail } = useAccount();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const code = searchParams.get('code');

    useEffect(() => {
        if(userId && code && !hasRun.current) {
            hasRun.current = true;
            verifyEmail.mutateAsync({userId, code})
                .then(() => setStatus('verified'))
                .catch(() => setStatus('failed'))
        }
    }, [userId, code, verifyEmail])

    const getBody = () => {
        switch (status) {
            case 'verifying':
                return <Typography>Verifying...</Typography>
                break;
            case 'failed':
                return (
                <Box display='flex' flexDirection='column' gap={2} justifyContent='center'>
                        <Typography>Verification failed.  You can try resending the verify link to your email</Typography>
                        <Button
                            onClick={() => resendConfirmationEmail.mutateAsync({userId})}
                            loading={resendConfirmationEmail.isPending}
                        >
                            Resend verification email
                        </Button>
                    </Box>
                )
                break;
            case 'verified':
                return (
                    <Box display='flex' flexDirection='column' gap={2} justifyContent='center'>
                        <Typography>Email has been verified - you can now login</Typography>
                        <Button component={Link} to='/login'>
                            Go to login
                        </Button>
                    </Box>
                )
                break;
        }
    }

    return (
        <Paper
            sx={{
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6,
            }}
        >
            <EmailRounded sx={{ fontSize: 100 }} color="primary" />
            <Typography gutterBottom variant="h3">
                Email verification
            </Typography>
            <Divider sx={{my: 2}} />
            {getBody()}
        </Paper>
    )
}