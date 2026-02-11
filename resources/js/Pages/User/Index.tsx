import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { User, PageProps } from "@/types";
import { can } from "@/helpers";


export default function Index({ auth, users }: PageProps<{ users: User[] }>) {

  const canEdit = (auth.user.roles[0].toLocaleLowerCase() === 'root' ||
    auth.user.roles[0].toLocaleLowerCase() === 'admin')

  // const user_root = users.find(user => user.name.toLowerCase() === 'root')!;
  const visible_users = users.filter(user => {
    const user_role = user.roles[0].toLocaleLowerCase();
    const auth_role = auth.user.roles[0].toLocaleLowerCase();

    switch (auth_role) {
      case 'root': {
        return true;
      }
      case 'admin': {
        if (user_role === 'root') {
          return false;
        }
        return true;
      }
      default: {
        if (user_role === 'root' || user_role === 'admin') {
          return false;
        }
        return true;
      }
    }
  });

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-200">
          Пользователи
        </h2>
      }
    >
      <Head title="Пользователи" />

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs uppercase bg-bg-main text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Имя
              </th>
              <th scope="col" className="px-6 py-3">
                Почта
              </th>
              <th scope="col" className="px-6 py-3">
                Создан
              </th>
              <th scope="col" className="px-6 py-3">
                Роли
              </th>
              {
                canEdit &&
                <th scope="col" className="px-6 py-3">
                  Действия
                </th>
              }
            </tr>
          </thead>
          <tbody>
            {visible_users.map(user => {
              const user_role = user.roles[0].toLocaleLowerCase();
              const auth_role = auth.user.roles[0].toLocaleLowerCase();

              const canEdit = user_role !== 'root' && (auth_role === 'root' || auth_role === 'admin');
              return <Row user={user} key={user.id} auth_user={auth.user} canEdit={canEdit} />
            })}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}

const Row = ({ user, auth_user, canEdit }: { user: User, auth_user: User, canEdit: boolean }) => {

  return (
    <tr
      className="border-b bg-[#303030] border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium whitespace-nowrap text-white"
      >
        {user.name}
      </th>
      <td className="px-6 py-4 text-[#bebebe]">{user.email}</td>
      <td className="px-6 py-4 text-[#bebebe]">{user.created_at}</td>
      <td className="px-6 py-4 text-[#bebebe]">
        {user.roles.join(", ")}
      </td>

      <td className="px-6 py-4 text-[#bebebe]">
        {canEdit && user.roles[0].toLocaleLowerCase() !== 'admin' &&
          <Link
            href={route("user.edit", user.id)}
            className="text-accent-main"
          >
            Редактировать
          </Link>}
      </td>
    </tr>
  );
}