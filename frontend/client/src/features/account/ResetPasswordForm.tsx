import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen } from "@mui/icons-material";
import { type ResetPasswordSchema, resetPasswordSchema } from "../../libs/schemas/resetPasswordSchema";
import AccountFormWrapper from "./AccountFormWrapper";
import CustomizedTextField from "../../app/shared/components/CustomizedTextField";
import { useAccount } from "../../libs/hooks/useAccount";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";
import { Typography } from "@mui/material";

export default function ResetPasswordForm() {
    const {resetPassword} = useAccount();
    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const email = searchParams.get('email');

    if(!code || !email) return <Typography>Invalid reset password code</Typography>

    const onSubmit = async (data: ResetPasswordSchema)=> {
        try {
            await resetPassword.mutateAsync({email, resetCode: code, newPassword: data.newPassword}, {
                onSuccess: () => {
                    toast.success('Password reset successfully - you can now sign in');
                    navigate('/login')
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AccountFormWrapper<ResetPasswordSchema>
            title="Reset your password"
            submitButtonText="Request password"
            onSubmit={onSubmit}
            resolver={zodResolver(resetPasswordSchema)}
            icon={<LockOpen fontSize="large" />}
        >
            <CustomizedTextField label='New password' type='password' name='newPassword' />
            <CustomizedTextField label='Confirm password' type='password' name='confirmPassword' />
        </AccountFormWrapper>
    )
}