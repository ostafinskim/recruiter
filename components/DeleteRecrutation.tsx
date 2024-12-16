import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecrutation } from "@/utils/actions";
import { Button } from "./ui/button";

export default function DeleteRecrutationButton({ id }: { id: string }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteRecrutation(id),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: "There was an error" });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["recruitments"] });

      toast({ description: "recrutation removed" });

    },
  });
  return (
    <>
      <Button
        size="sm"
        disabled={isPending}
        onClick={() => {
          mutate(id);
        }}
      >
        {isPending ? "deleting..." : "delete"}
      </Button>
    </>
  );
}
