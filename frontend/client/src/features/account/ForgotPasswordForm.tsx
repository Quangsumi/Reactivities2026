import { LockOpen } from "@mui/icons-material";
import CustomizedTextField from "../../app/shared/components/CustomizedTextField";
import { useAccount } from "../../libs/hooks/useAccount"
import AccountFormWrapper from "./AccountFormWrapper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import type { FieldValues } from "react-hook-form";

export default function ForgotPasswordForm() {
    const { forgotPassword } = useAccount();
    const navigate = useNavigate();

    const onSubmit = async (data: FieldValues) => {
        try {
            await forgotPassword.mutateAsync(data.email, {
                onSuccess: () => {
                    toast.success('Password reset requested - please check your email');
                    navigate('/login');
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AccountFormWrapper
            title="Pls enter your email"
            icon={<LockOpen fontSize='large' />}
            submitButtonText="Request password reset link"
            onSubmit={onSubmit}
        >
            <CustomizedTextField rules={{required: true}} label='Email address' name='email'/>
        </AccountFormWrapper>
    )
}