import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { User, PageProps, PaginatedData } from "@/types";
import { can } from "@/helpers";

export default function Index({ auth, users }: PageProps<{ users: User[] }>) {
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
              <th scope="col" className="px-6 py-3">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className="border-b bg-[#303030] border-gray-700"
                key={user.email}
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
                  <Link
                    href={route("user.edit", user.id)}
                    className="text-accent-main"
                  >
                    Редактировать
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
}
