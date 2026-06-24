import { PageProps } from '@/types';

export default function Reset({ auth }: PageProps) {
    return (
        <div className="bg-red-500 p-24 m-24 text-black font-black text-4xl">
            <span>hello, {auth.user?.name} </span>
        </div>
    );
}