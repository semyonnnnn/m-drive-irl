import { useState, useEffect } from 'react';
import { PageProps, LearningMaterial } from "@/types";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Link } from '@inertiajs/react';

// Point to the PDF.js worker at module level
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Item({ material }: PageProps<{ material: LearningMaterial }>) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [inputPage, setInputPage] = useState<string>('1');
    const [scale, setScale] = useState<number>(1.35);

    const fileUrl = `/storage/${material.file_path}`;

    // Synchronize text input whenever active pageNumber updates externally
    useEffect(() => {
        setInputPage(String(pageNumber));
    }, [pageNumber]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    // Only allow numeric characters
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleanedValue = e.target.value.replace(/\D/g, '');
        setInputPage(cleanedValue);
    };

    // Commit page jump on Enter key press
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitPageJump();
        }
    };

    // Revert uncommitted typing if user clicks away without pressing Enter
    const handleBlur = () => {
        setInputPage(String(pageNumber));
    };

    // Bounds checking & page change execution
    const submitPageJump = () => {
        let parsed = parseInt(inputPage, 10);
        const maxPages = numPages || 1;

        if (isNaN(parsed) || parsed < 1) {
            parsed = 1;
        } else if (parsed > maxPages) {
            parsed = maxPages;
        }

        setPageNumber(parsed);
        setInputPage(String(parsed));
    };

    return (
        <AuthenticatedLayout>
            {/* Custom 45-Degree Amber/Black Striped Scrollbar */}
            <style>{`
                .amber-striped-scrollbar::-webkit-scrollbar {
                    width: 10px;
                }
                .amber-striped-scrollbar::-webkit-scrollbar-track {
                    background: #09090b;
                    border-left: 1px solid #27272a;
                }
                .amber-striped-scrollbar::-webkit-scrollbar-thumb {
                    background: repeating-linear-gradient(
                        45deg,
                        #d97706,
                        #d97706 6px,
                        #000000 6px,
                        #000000 12px
                    );
                    border-radius: 2px;
                    border: 1px solid #f59e0b;
                }
            `}</style>

            {/* Outer Amber Chassis Frame */}
            <div className="w-full p-1.5 bg-amber-600 border border-amber-500 rounded-xs shadow-[0_12px_35px_rgba(0,0,0,0.4)] relative font-mono select-none">

                {/* Exclusive Corner Brackets: Top-Right and Bottom-Left ONLY */}
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-amber-400 pointer-events-none z-20"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-amber-400 pointer-events-none z-20"></div>

                {/* Inner Terminal Core Container */}
                <div className="relative w-full bg-zinc-950 border border-zinc-800 p-5 text-zinc-100 overflow-hidden">

                    {/* CRT Scanline Background Effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.05] mix-blend-overlay">
                        <div className="w-full h-0.5 bg-amber-400" style={{ animation: 'staticScanline 10s linear infinite' }}></div>
                    </div>

                    {/* Terminal Navigation Breadcrumb */}
                    <div className="flex items-center gap-2 mb-4 text-xs md:text-sm font-mono uppercase tracking-widest bg-zinc-900/60 border border-zinc-800/80 px-4 py-2.5 relative z-10">
                        <span className="text-zinc-500 font-semibold hover:text-amber-400 transition cursor-pointer">
                            <Link
                                href={route('materials.index')}
                            >
                                материалы
                            </Link>
                        </span>
                        <span className="text-amber-500 font-bold">&gt;&gt;</span>
                        <span className="text-amber-400 font-bold truncate">
                            {material.title || material.title || `ОБЪЕКТ #${material.id}`}
                        </span>
                    </div>

                    {/* HUD Toolbar Header */}
                    <div className="flex flex-wrap items-center justify-between w-full mb-5 bg-zinc-900/90 border border-zinc-800 p-4 relative z-10 gap-4">

                        {/* Document Title Header */}
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-2xs h-3 w-3 bg-amber-500 shadow-[0_0_10px_#f59e0b]"></span>
                            </div>
                            <span className="text-base md:text-lg font-black uppercase tracking-[0.12em] text-zinc-100">
                                [ ПРОСМОТР ДОКУМЕНТА ]
                            </span>
                        </div>

                        {/* Page Navigation & Direct Jump Input */}
                        <div className="flex items-center gap-3">
                            <button
                                disabled={pageNumber <= 1}
                                onClick={() => setPageNumber((p) => p - 1)}
                                className="text-xs md:text-sm text-zinc-200 font-bold bg-zinc-950 border border-zinc-700 px-4 py-2 tracking-wider hover:border-amber-500 hover:text-amber-400 disabled:opacity-25 transition duration-150 uppercase cursor-pointer"
                            >
                                [ НАЗАД ]
                            </button>

                            {/* Direct Page Jump Input Field */}
                            <div className="flex items-center gap-2 font-mono text-sm md:text-base text-amber-400 font-black tracking-wider">
                                <span>СТРАНИЦА</span>
                                <input
                                    type="text"
                                    value={inputPage}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleBlur}
                                    className="w-16 text-center bg-zinc-950 border border-amber-500/80 focus:border-amber-400 text-amber-400 font-black py-1 px-1 rounded-2xs outline-none transition shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]"
                                />
                                <span>/ {numPages ? String(numPages).padStart(2, '0') : "--"}</span>
                            </div>

                            <button
                                disabled={pageNumber >= (numPages || 1)}
                                onClick={() => setPageNumber((p) => p + 1)}
                                className="text-xs md:text-sm text-zinc-200 font-bold bg-zinc-950 border border-zinc-700 px-4 py-2 tracking-wider hover:border-amber-500 hover:text-amber-400 disabled:opacity-25 transition duration-150 uppercase cursor-pointer"
                            >
                                [ ВПЕРЁД ]
                            </button>
                        </div>

                        {/* Zoom & Save Controls */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setScale((s) => Math.max(0.6, s - 0.15))}
                                className="text-sm md:text-base text-zinc-200 font-black bg-zinc-950 border border-zinc-700 px-3.5 py-1 hover:border-amber-500 hover:text-amber-400 transition cursor-pointer"
                            >
                                -
                            </button>
                            <span className="font-mono text-sm md:text-base text-zinc-300 min-w-13.75 text-center font-bold">
                                {Math.round(scale * 100)}%
                            </span>
                            <button
                                onClick={() => setScale((s) => Math.min(2.5, s + 0.15))}
                                className="text-sm md:text-base text-zinc-200 font-black bg-zinc-950 border border-zinc-700 px-3.5 py-1 hover:border-amber-500 hover:text-amber-400 transition cursor-pointer"
                            >
                                +
                            </button>

                            <div className="h-5 w-px bg-zinc-700 mx-1" />

                            <a
                                href={fileUrl}
                                download
                                className="text-xs md:text-sm text-amber-400 font-bold bg-amber-950/40 border border-amber-600 px-4 py-2 tracking-widest hover:bg-amber-500 hover:text-zinc-950 transition duration-150 uppercase cursor-pointer"
                            >
                                [ СОХРАНИТЬ ]
                            </a>
                        </div>
                    </div>

                    {/* PDF Canvas Area */}
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="py-28 text-center font-mono text-base font-bold text-amber-500 tracking-widest animate-pulse">
                                &gt;&gt; ЗАГРУЗКА И ИНИЦИАЛИЗАЦИЯ ФАЙЛА...
                            </div>
                        }
                        className="w-full relative z-10"
                    >
                        {/* Main Grid Workspace */}
                        <div className="flex w-full gap-4 items-stretch">

                            {/* Left Filmstrip Sidebar */}
                            <div className="w-36 shrink-0 bg-zinc-900/50 p-2.5 border border-zinc-800 relative">
                                <div className="sticky top-4 max-h-[calc(100vh-8rem)] overflow-y-auto amber-striped-scrollbar flex flex-col gap-3 pr-1">
                                    {numPages &&
                                        Array.from(new Array(numPages), (_, index) => index + 1).map((p) => {
                                            const isActive = pageNumber === p;
                                            return (
                                                <button
                                                    key={p}
                                                    onClick={() => setPageNumber(p)}
                                                    className={`relative flex flex-col items-center p-1.5 rounded-2xs transition border cursor-pointer ${isActive
                                                        ? 'border-amber-500 bg-amber-950/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                                                        : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-600 hover:bg-zinc-900'
                                                        }`}
                                                >
                                                    <Page
                                                        pageNumber={p}
                                                        width={90}
                                                        renderTextLayer={false}
                                                        renderAnnotationLayer={false}
                                                        className="overflow-hidden pointer-events-none opacity-85"
                                                    />

                                                    <span className={`text-xs font-mono mt-1.5 ${isActive ? 'text-amber-400 font-black' : 'text-zinc-500 font-bold'}`}>
                                                        [{String(p).padStart(2, '0')}]
                                                    </span>
                                                </button>
                                            );
                                        })
                                    }
                                </div>
                            </div>

                            {/* Right Main Page Viewport */}
                            <div className="flex-1 flex justify-center items-start bg-black/60 p-6 border border-zinc-900 overflow-x-auto min-h-[75vh]">
                                <Page
                                    pageNumber={pageNumber}
                                    scale={scale}
                                    renderTextLayer={true}
                                    renderAnnotationLayer={true}
                                    className="shadow-[0_0_30px_rgba(0,0,0,0.85)] border border-zinc-800"
                                />
                            </div>

                        </div>
                    </Document>

                    {/* Footer Metadata Banner */}
                    <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-zinc-900 text-xs text-zinc-500 font-bold uppercase tracking-widest relative z-10">
                        <span>СТАТУС // ФАЙЛ УСПЕШНО ЗАГРУЖЕН</span>
                        <span className="font-mono text-zinc-400">МОДУЛЬ // ЛОКАЛЬНЫЙ СЕРВЕР</span>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}