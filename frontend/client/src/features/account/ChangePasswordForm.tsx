import { Password } from "@mui/icons-material";
import CustomizedTextField from "../../app/shared/components/CustomizedTextField";
import { useAccount } from "../../libs/hooks/useAccount"
import AccountFormWrapper from "./AccountFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordSchema } from "../../libs/schemas/changePasswordSchema";
import { toast } from "react-toastify";

export default function ChangePasswordForm() {
    const {changePassword} = useAccount();
    
    const onSubmit = async (data: ChangePasswordSchema) => {
        try {
            await changePassword.mutateAsync(data, {
                onSuccess: () => toast.success('Your password has been changed')
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AccountFormWrapper<ChangePasswordSchema>
            title="Change Password"
            icon={<Password fontSize="large" />}
            onSubmit={onSubmit}
            submitButtonText="Update password"
            resolver={zodResolver(changePasswordSchema)}
            reset={true}
        >
            <CustomizedTextField type="password" label='Current password' name="currentPassword" />
            <CustomizedTextField type="password" label='New password' name="newPassword" />
            <CustomizedTextField type="password" label='Confirm password' name="confirmPassword" />
        </AccountFormWrapper>
    )
}