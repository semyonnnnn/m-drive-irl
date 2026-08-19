import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
//////////////////////////////////////////////////////
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User, PageProps, PaginatedDataProps, UserIndexProps, FlashProps } from "@/types";
import { Pagination } from "@/components/custom/Pagination";
import { UploadUsersPanel } from "./UploadUsersPanel";
import { PasswordGenerator } from "../Material/Partials/PasswordGenerator";
import { PopUp } from "@/components/custom/PopUp";
import { ErrorTelemetry } from "./ErrorTelemetry";
import { EditUserModal } from "./EditUserModal";
import axios from 'axios';


export default function Index({ auth, users, roleLabels }: UserIndexProps) {
  // 1. Normalize the users data so the component doesn't care if it's paginated or a raw array
  const isPaginated = !Array.isArray(users);
  const userList = isPaginated ? (users as PaginatedDataProps<User>).data : (users as User[]);
  const totalCount = isPaginated ? (users as PaginatedDataProps<User>).total : (users as User[]).length;

  const [message, setMessage] = useState<FlashProps>({
    success: null,
    error: {
      summary: null,
      details: null,
    }
  });

  // METRIC HOOKS: Track active data stream and loading indicators
  const [backendDataLocal, setBackendDataLocal] = useState<any | null>(null);
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  // 2. Safe check for roles using optional chaining
  const userRole = auth.user?.roles?.[0]?.toLowerCase();
  const canEdit = userRole === 'root' || userRole === 'admin';

  const flash = (usePage().props as any).flash as FlashProps;

  // useEffect(() => {
  //   console.log('backendDataLocal:', backendDataLocal)
  // }, [backendDataLocal]);


  const handleFetchAndOpenModal = (userId: number) => {
    setLoadingUserId(userId);

    // Quiet hunter fetch data, URL bar stay safe on Index list!
    axios.get(route("users.edit", userId))
      .then(response => {
        // response.data has all the shiny rock properties
        setBackendDataLocal(response.data);
        setLoadingUserId(null);
        // console.error("AXIOS_CORE_CRASH:", error.response?.data || error.message);
      })
      .catch(() => {
        setLoadingUserId(null);
      });
  };

  const handleCloseModal = () => {
    setBackendDataLocal(null); // Flushes cache, instantly dropping modal from DOM tree
  };

  useEffect(() => {
    const isSuccessEmpty = flash.success === null;
    const isErrorEmpty = !flash?.error?.summary && !flash?.error?.details;

    if (isSuccessEmpty && isErrorEmpty) return;

    setMessage(prev => ({
      success: flash.success,
      error: isErrorEmpty ? prev.error : {
        summary: flash.error.summary,
        details: flash.error.details
      }
    }));

    console.log(flash);

    if (flash.success) {
      const timer = setTimeout(() => {
        setMessage(prev => ({
          ...prev,
          success: null,
        }));
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  return (
    <AuthenticatedLayout>
      <Head title="Пользователи" />
      {message.success && <PopUp message={message.success} handleClick={() => {
        setMessage({
          success: null,
          error: {
            summary: null,
            details: null,
          }
        });
      }} />}

      <main
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(24,24,27,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(24,24,27,0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(24,24,27,0.08) 1px, transparent 1px),
            linear-gradient(0deg, rgba(24,24,27,0.12) 1px, transparent 1px),
            linear-gradient(0deg, rgba(24,24,27,0.05) 1px, transparent 1px),
            linear-gradient(90deg, transparent 45%, #d4d4d8 45%, #d4d4d8 46%, transparent 46%),
            linear-gradient(0deg, transparent 72%, #d4d4d8 72%, #d4d4d8 73%, transparent 73%)
          `,
          backgroundSize: '137px 100%, 43px 100%, 100% 97px, 100% 53px, 100% 19px, 100% 100%, 100% 100%',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0'
        }}
        className="min-h-screen bg-zinc-300 p-4 md:p-8 flex flex-col gap-8 relative select-none font-mono"
      >
        <div className="relative p-6 bg-zinc-50 border border-zinc-300/90 overflow-hidden rounded-xs z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[12px_12px] pointer-events-none z-0"></div>

          <div className="flex justify-between items-center mb-6 pb-3 border-b border-zinc-950 relative z-10">
            <h1 className="text-xl font-black text-zinc-900 uppercase tracking-widest">
              [ РЕЕСТР_СИСТЕМНЫХ_СУБЪЕКТОВ ]
            </h1>
            <div className="text-[10px] text-zinc-500 font-bold tracking-wider bg-zinc-200 border border-zinc-300/70 px-2 py-1">
              [ {totalCount}_СУБЪЕКТОВ_В_СИСТЕМЕ ]
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 relative z-10">
            {userList?.map((user, index) => {
              const isThisUserLoading = loadingUserId === user.id;

              return (
                <div
                  key={user.id}
                  className="group flex flex-col bg-white/80 backdrop-blur-md border border-zinc-200 p-2 hover:bg-white hover:border-amber-300 hover:shadow-[0_4px_15px_rgba(245,158,11,0.1)] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-zinc-200 group-hover:bg-amber-500 transition-colors duration-300"></div>
                  <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[8px_8px] pointer-events-none z-0"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-zinc-200 group-hover:border-amber-400 transition-colors z-10"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-zinc-200 group-hover:border-amber-400 transition-colors z-10"></div>

                  <div className="flex justify-between items-start mb-1.5 relative z-10 pl-2">
                    <div>
                      <h3 className="text-sm font-black text-zinc-800 uppercase tracking-widest group-hover:text-amber-900 transition-colors leading-none">
                        {user.name}
                      </h3>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5 font-medium leading-tight">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-[9px] font-bold text-amber-700 bg-amber-50/50 border border-amber-100/50 px-1.5 py-px flex items-center gap-1.5 shadow-sm">
                      <div className="w-1 h-1 rounded-full bg-amber-500 animate-pulse"></div>
                      SYS_ID.{String(user.id).padStart(totalCount.toString().length, '0')}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-1.5 border-t border-zinc-100 relative z-10 pl-2">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                      LVL // <span className="text-zinc-800 font-black ml-1">{roleLabels[user?.roles?.[0]]?.toUpperCase() || 'N/A'}</span>
                    </span>

                    {canEdit && (
                      <button
                        type="button"
                        onClick={() => handleFetchAndOpenModal(user.id)}
                        disabled={loadingUserId !== null}
                        className="relative px-6 py-1.5 bg-zinc-100 border border-zinc-300 text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] overflow-hidden group/btn hover:border-amber-500 hover:text-amber-700 hover:bg-white transition-colors duration-300 leading-none flex items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="relative z-10 block">
                          {isThisUserLoading ? "[ СИНХРОНИЗАЦИЯ... ]" : "[ РЕДАКТИРОВАТЬ ]"}
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 bg-amber-50 transition-transform duration-300 ease-out z-0"></div>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isPaginated && (
            <Pagination
              links={(users as PaginatedDataProps<User>).links}
              current_page={(users as PaginatedDataProps<User>).current_page}
              last_page={(users as PaginatedDataProps<User>).last_page}
              total={(users as PaginatedDataProps<User>).total}
            />
          )}
        </div>

        <div className="flex gap-4">
          <UploadUsersPanel />
          <PasswordGenerator />
        </div>

        {message?.error?.details && <ErrorTelemetry summary={message?.error?.summary} details={message?.error?.details} onClear={() => {
          setMessage({
            ...flash,
            error: {
              details: null,
              summary: null
            }
          });
        }} />}
      </main>

      {/* PORTAL INTERCEPT: Renders modal overlay frame when activeUser payload data cache arrives */}
      {backendDataLocal && (
        <EditUserModal
          isOpen={true}
          onClose={handleCloseModal}
          backendData={backendDataLocal}
        />
      )}
    </AuthenticatedLayout>
  );
}