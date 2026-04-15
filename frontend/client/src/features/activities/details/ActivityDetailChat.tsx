import { Box, Typography, Card, CardContent, TextField, Avatar, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router";
import { useComments } from "../../../libs/hooks/useComments";
import { useForm, type FieldValues } from "react-hook-form";
import { timeAgo } from "../../../libs/utils/util";
import { observer } from "mobx-react-lite";

const ActivityDetailsChat = observer(() => {
    const {id} = useParams();
    const {commentStore} = useComments(id);
    const {register, handleSubmit, reset, formState: {isSubmitting}} = useForm();
    
    const addComment = async (data: FieldValues) => {
        try {
            await commentStore.hubConnection?.invoke('SendComment', {
                activityId: id,
                body: data.body
            })
            reset();
        } catch (error) {
            console.log(error);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(addComment)();
        }
    }

    return (
        <>
            <Box
                sx={{
                    textAlign: 'center',
                    bgcolor: 'primary.main',
                    color: 'white',
                    padding: 2
                }}
            >
                <Typography variant="h6">Chat about this event</Typography>
            </Box>
            <Card>
                <CardContent>
                    <div>
                        <form>
                            <TextField
                                {...register('body', {required: true})}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                                onKeyDown={handleKeyPress}
                                slotProps={{
                                    input: {
                                        endAdornment: isSubmitting ? (
                                            <CircularProgress size={24} />
                                        ) : null
                                    }
                                }}
                            />
                        </form>
                    </div>

                    <Box>
                        {commentStore.comments.map(c => (
                            <Box sx={{ display: 'flex', my: 2 }} key={c.id}>
                                <Avatar src={c.imageUrl} alt={'user image'} sx={{ mr: 2 }} />
                                <Box display='flex' flexDirection='column'>
                                    <Box display='flex' alignItems='center' gap={3}>
                                        <Typography component={Link} to={`/profiles/${c.userId}`} variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'none' }}>
                                            {c.displayName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {timeAgo(c.createdAt)}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>{c.body}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </>
    )
})

export default ActivityDetailsChat;