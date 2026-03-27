import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
    const { state } = useLocation();
    const rawError = state?.error;

    // state.error.error will throw exception
    // Cursor created this codes to handle all error cases
    const getErrorMessage = (error: unknown): string => {
        if (!error) return "There has been an error!";
        if (typeof error === "string") return error;
        if (typeof error === "number" || typeof error === "boolean") return String(error);
        if (error instanceof Error) return error.message;
        if (typeof error === "object") {
            const record = error as Record<string, unknown>;
            if (typeof record.message === "string") return record.message;
            if (typeof record.title === "string") return record.title;
            if (typeof record.error === "string") return record.error;
        }
        return "There has been an error!";
    };
    const getErrorDetails = (error: unknown): string => {
        if (!error) return "Internal server error";
        if (typeof error === "string") return error;
        if (typeof error === "number" || typeof error === "boolean") return String(error);
        if (error instanceof Error) return error.stack || error.message;
        if (typeof error === "object") {
            const record = error as Record<string, unknown>;
            const nested = record.error;
            if (typeof record.details === "string") return record.details;
            if (typeof nested === "string") return nested;
            if (nested && typeof nested === "object") return JSON.stringify(nested, null, 2);
            return JSON.stringify(record, null, 2);
        }
        return "Internal server error";
    };

    return (
        <Paper>
            {rawError ? (
                <>
                    <Typography gutterBottom variant="h3" sx={{px: 4, pt: 2}} color="secondary">
                        {getErrorMessage(rawError)}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" sx={{p: 4}}>
                        {getErrorDetails(rawError)}
                    </Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom>Server error</Typography>
            )}

        </Paper>
    )
}