import { User, RelatedUsersType, MultipleListProps, RadioListProps } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import Radio from "@/components/custom/Radio";

export const RelatedUsers = ({
    related_users,
    ours,
    data,
    handleCheckboxes,
    handleRadio,
    errors,
    selectedRole
}: RelatedUsersType) => {
    const role = selectedRole.toLowerCase();
    const gakuseis: User[] = related_users?.gakuseis ?? [];
    const senseis: User[] = related_users?.senseis ?? [];
    const oursArray: User[] = ours ?? [];


    console.log(related_users);

    if (role === "admin") return null;

    return (
        <div className="mb-8">
            {role === "sensei" &&
                gakuseis.map(user => {
                    const isChecked =
                        data.related_users.some(u => u.id === user.id) ||
                        oursArray.some(u => u.id === user.id);

                    return (
                        <MultipleList
                            key={user.id}
                            user={user}
                            checked={isChecked}
                            onChange={handleCheckboxes}
                        />
                    );
                })}

            {role === "gakusei" &&
                senseis.map(user => {
                    const selectedUserId = data.related_users[0]?.id ?? oursArray[0]?.id ?? null;
                    const isChecked = user.id === selectedUserId;

                    return (
                        <RadioList
                            key={user.id}
                            user={user}
                            checked={isChecked}
                            onChange={handleRadio}
                        />
                    );
                })}

            <span className="text-red-500">{errors.related_users}</span>
        </div>
    );
};

const MultipleList = ({ user, checked, disabled, onChange }: MultipleListProps) => {
    return (
        <label className="flex select-none items-center mb-1 opacity-80">
            <Checkbox
                checked={!!checked} // force boolean
                onCheckedChange={(value) => onChange(!!value, user)} // force boolean
                disabled={disabled}
            />
            <span className="ms-2 text-sm text-gray-400">{user.name}</span>
        </label>
    );
};

const RadioList = ({ user, checked, onChange }: RadioListProps) => {
    return (
        <label className="flex select-none items-center mb-1 cursor-pointer">
            <Radio
                checked={!!checked}
                onChange={() => onChange(user)}
                className="self-start"
            />
            <span className="ms-2 text-sm text-gray-400">{user.name}</span>
        </label>
    );
};