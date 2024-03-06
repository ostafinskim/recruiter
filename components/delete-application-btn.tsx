import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteApplicationAction } from '@/utils/actions';
import { useToast } from '@/components/ui/use-toast';

function DeleteApplicationBtn({ id }: { id: string }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteApplicationAction(id),
        onSuccess: (data) => {
            if (!data) {
                toast({
                    description: 'there was an error',
                });
                return;
            }
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            queryClient.invalidateQueries({ queryKey: ['stats'] });
            queryClient.invalidateQueries({ queryKey: ['charts'] });

            toast({ description: 'application removed' });
        },
    });
    return (
        <Button
            size="sm"
            disabled={isPending}
            onClick={() => {
                mutate(id);
            }}
        >
            {isPending ? 'deleting...' : 'delete'}
        </Button>
    );
}
export default DeleteApplicationBtn;
