import { Checkbox } from "@/components/ui/checkbox";
import { User, RelatedUsersType, MultipleListProps, RadioListProps } from "@/types";
import Radio from "@/components/custom/Radio";

export const RelatedUsers = ({ related_users, theirs, data, handleCheckboxes, handleRadio, errors, whoAmI }: RelatedUsersType) => {
    const takenArray = Array.from(Object.values(theirs ?? []));

    const isSensei = whoAmI.roles[0].toLocaleLowerCase() === 'sensei';

    console.log(whoAmI);

    return (
        <div className="mb-8">
            {Object.values(related_users ?? []).map((user: User) => {
                const isTaken = takenArray.some(u => u.id === user.id);
                const byWhom = takenArray.find(u => u.id === user.id)?.sensei?.name;
                const isChecked = data?.related_users?.some(u => u.id === user.id) ?? false;

                return (
                    isSensei ? (<MultipleList
                        key={user.id}
                        user={user}
                        checked={isChecked}
                        disabled={isTaken}
                        byWhom={byWhom}
                        onChange={handleCheckboxes}
                    />) : (
                        // <></>
                        <RadioList data={data} user={user} key={user.id} onChange={handleRadio} />
                    )
                );
            })}
            <span className="text-red-500">{errors.related_users}</span>
        </div>
    );
};


const MultipleList = ({ user, checked, disabled, byWhom, onChange }: MultipleListProps) => {
    return (
        <label className="flex select-none items-center mb-1 opacity-80">
            <Checkbox
                checked={checked}
                onCheckedChange={(checked: boolean) => onChange(checked, user)}
                disabled={disabled}
            />
            <span className={`ms-2 text-sm ${disabled ? 'text-gray-500' : 'text-gray-400'}`}>
                {user.name} {disabled && byWhom ? `в группе ${byWhom}` : ''}
            </span>
        </label>
    );
};




const RadioList = ({
    data,
    user,
    onChange
}: RadioListProps) => {

    const isChecked = data?.related_users?.[0]?.id === user.id;

    return (
        <label className="flex select-none items-center mb-1" >
            <Radio
                checked={isChecked}
                onChange={() => onChange(user)}
            />
            <span className="ms-2 text-sm text-gray-400 cursor-pointer">
                {user.name}
            </span>
        </label>
    );
};

