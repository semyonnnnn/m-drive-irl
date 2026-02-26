import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types";

type UltraUser = User & {
    sensei?: {
        id: number
        name: string
    } | null
}

type RelatedUsers = {
    related_users: User[]
};

export const RelatedUsers = ({ related_users }: RelatedUsers) => {
    return (
        <div className="mb-8">
            {Object.values(related_users ?? []).map((user: User) => {
                // Make sure theirs is an array
                theirs = Array.from(Object.values(theirs ?? []));

                const takenArray = theirs ?? [];
                const isTaken = takenArray.some(u => u.id === user.id);
                const byWhom = theirs?.find(u => u.id === user.id)?.sensei?.name;

                return (
                    <label key={user.id} className="flex select-none items-center mb-1 opacity-80">
                        <Checkbox
                            checked={data.related_users.some(u => u.id === user.id)}
                            onCheckedChange={(checked: boolean) => handleCheckboxes(checked as boolean, user)}
                            disabled={isTaken}
                        />
                        <span className={`ms-2 text-sm ${isTaken ? 'text-gray-500' : 'text-gray-400'}`}>
                            {user.name} {isTaken ? 'в группе ' + byWhom : ''}
                        </span>
                    </label>
                );
            })}
            <span className="text-red-500">{errors.related_users}</span>
        </div>
    );
}