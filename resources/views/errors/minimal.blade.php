<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ОШИБКА {{ $code ?? '???' }} // СБОЙ_МАРШРУТИЗАЦИИ</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        html, body {
            height: 100%;
            margin: 0;
        }
        
        body {
            background: #0a0a0f;
            display: flex;
            align-items: stretch;
            font-family: 'Courier New', monospace;
        }
        
        .error-container {
            width: 100%;
            padding: 8px;
            background: #3f3f46;
            border: 1px solid #52525b;
            border-radius: 4px;
            box-shadow: 0 12px 35px rgba(0,0,0,0.2);
            position: relative;
            animation: fade-in 0.3s ease-out;
            display: flex;
            flex-direction: column;
        }
        
        .terminal {
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1;
            background: #09090b;
            color: #ef4444;
            border: 1px solid #3f0a0a;
            padding: 30px;
            overflow: hidden;
            user-select: none;
        }
        
        .grid-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
            position: relative;
            z-index: 10;
            align-items: start;
            flex: 1; /* занимает оставшееся пространство */
        }
        
        /* все остальные стили без изменений */
        
        @keyframes staticScanline {
            0% { transform: translateY(0); }
            100% { transform: translateY(100vh); }
        }
        
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes ping {
            0% { transform: scale(1); opacity: 1; }
            75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        @keyframes glow {
            0%, 100% { text-shadow: 0 0 5px #ef4444, 0 0 10px #ef4444; }
            50% { text-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444; }
        }
        
        @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.9; }
            25%, 75% { opacity: 1; }
        }
        
        .corner-accent {
            position: absolute;
            width: 10px;
            height: 10px;
            border-color: #dc2626;
            pointer-events: none;
        }
        .corner-accent.tl { top: -1px; left: -1px; border-top: 2px solid #dc2626; border-left: 2px solid #dc2626; }
        .corner-accent.br { bottom: -1px; right: -1px; border-bottom: 2px solid #dc2626; border-right: 2px solid #dc2626; }
        
        .scanline {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
            z-index: 40;
            opacity: 0.12;
            mix-blend-mode: overlay;
        }
        .scanline::after {
            content: '';
            display: block;
            width: 100%;
            height: 2px;
            background: #ef4444;
            animation: staticScanline 10s linear infinite;
        }
        
        .grid-overlay {
            position: absolute;
            inset: 0;
            opacity: 0.03;
            background-image: 
                linear-gradient(to right, #ef4444 1px, transparent 1px),
                linear-gradient(to bottom, #ef4444 1px, transparent 1px);
            background-size: 8px 8px;
            pointer-events: none;
            z-index: 0;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(127, 29, 29, 0.4);
            padding-bottom: 12px;
            margin-bottom: 20px;
            position: relative;
            z-index: 10;
        }
        
        .header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .status-dot {
            position: relative;
            display: flex;
            height: 10px;
            width: 10px;
        }
        .status-dot .ping {
            position: absolute;
            display: inline-flex;
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background: #f87171;
            opacity: 0.75;
            animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .status-dot .dot {
            position: relative;
            display: inline-flex;
            border-radius: 2px;
            height: 10px;
            width: 10px;
            background: #ef4444;
            box-shadow: 0 0 10px #ef4444;
        }
        
        .header-title {
            font-size: 14px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: #e4e4e7;
        }
        
        .btn-return {
            font-size: 10px;
            color: #a1a1aa;
            font-weight: 700;
            background: rgba(24, 24, 27, 0.6);
            border: 1px solid #27272a;
            padding: 6px 12px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            transition: all 0.2s;
            cursor: pointer;
            text-decoration: none;
            font-family: 'Courier New', monospace;
        }
        .btn-return:hover {
            border-color: #ef4444;
            color: #f87171;
            background: rgba(127, 29, 29, 0.2);
        }
        
        @media (min-width: 768px) {
            .grid-layout {
                grid-template-columns: 1fr 2fr;
            }
        }
        
        .panel {
            background: rgba(24, 24, 27, 0.4);
            border: 1px solid #27272a;
            padding: 16px;
            font-size: 14px;
            color: #a1a1aa;
        }
        .panel-title {
            font-weight: 900;
            border-bottom: 1px solid #27272a;
            padding-bottom: 4px;
            margin-bottom: 6px;
            color: #ef4444;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .panel-row {
            display: flex;
            justify-content: space-between;
        }
        .panel-row .value {
            font-weight: 700;
            color: #e4e4e7;
        }
        .panel-row .value-danger {
            font-weight: 700;
            color: #f87171;
        }
        
        .status-badge {
            font-size: 10px;
            color: #dc2626;
            font-weight: 700;
            letter-spacing: 0.1em;
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            padding-left: 4px;
            margin-top: 8px;
        }
        
        .error-banner {
            background: rgba(127, 29, 29, 0.2);
            border-left: 2px solid #dc2626;
            padding: 16px;
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #fecaca;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        .error-banner .icon {
            color: #ef4444;
            font-weight: 900;
            font-size: 18px;
            line-height: 1;
            margin-top: 1px;
        }
        
        .telemetry-label {
            display: block;
            font-size: 10px;
            font-weight: 900;
            color: #71717a;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        
        .telemetry-box {
            max-height: 200px;
            overflow-y: auto;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid #18181b;
            padding: 14px;
            font-size: 14px;
            font-family: 'Courier New', monospace;
            color: #d4d4d8;
        }
        .telemetry-box::-webkit-scrollbar {
            width: 4px;
        }
        .telemetry-box::-webkit-scrollbar-thumb {
            background: #3f0a0a;
            border-radius: 2px;
        }
        .telemetry-box::-webkit-scrollbar-track {
            background: transparent;
        }
        
        .telemetry-item {
            display: flex;
            gap: 10px;
            padding: 2px 4px;
            border-radius: 2px;
            transition: background 0.15s;
        }
        .telemetry-item:hover {
            background: rgba(127, 29, 29, 0.2);
        }
        .telemetry-item .idx {
            color: #7f1d1d;
            font-weight: 900;
            user-select: none;
        }
        .telemetry-item .msg {
            letter-spacing: 0.025em;
            font-weight: 500;
            color: #d4d4d8;
        }
        
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding-top: 14px;
            border-top: 1px solid #18181b;
            font-size: 10px;
            color: #52525b;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .footer .sys-loc {
            font-family: 'Courier New', monospace;
            color: #71717a;
        }
        
        .space-y-1 { margin-top: 4px; }
        .space-y-2 { margin-top: 8px; }
        .space-y-3 { margin-top: 12px; }

        /* PROMINENT ERROR CODE STYLES */
        .error-code-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 15px 0 20px 0;
            padding: 15px;
            background: rgba(127, 29, 29, 0.15);
            border: 1px solid rgba(220, 38, 38, 0.3);
            border-radius: 4px;
            position: relative;
            z-index: 10;
        }
        
        .error-code {
            font-size: 72px;
            font-weight: 900;
            color: #ef4444;
            animation: glow 2s ease-in-out infinite, flicker 3s ease-in-out infinite;
            letter-spacing: 10px;
            font-family: 'Courier New', monospace;
            line-height: 1;
            text-shadow: 0 0 5px #ef4444, 0 0 10px #ef4444;
        }
        
        .error-code-small {
            font-size: 16px;
            color: white;
            font-weight: 700;
            letter-spacing: 3px;
            margin-left: 15px;
            /* opacity: 0.7; */
        }
        
        .error-code-divider {
            width: 2px;
            height: 50px;
            background: rgba(220, 38, 38, 0.3);
            margin: 0 20px;
        }
        
        @media (max-width: 768px) {
            .error-code {
                font-size: 48px;
                letter-spacing: 5px;
            }
            .error-code-container {
                flex-direction: column;
                gap: 10px;
            }
            .error-code-divider {
                width: 80%;
                height: 2px;
                margin: 5px 0;
            }
            .error-code-small {
                margin-left: 0;
            }
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="corner-accent tl"></div>
        <div class="corner-accent br"></div>
        
        <div class="terminal">
            <div class="scanline"></div>
            <div class="grid-overlay"></div>
            
            {{-- HEADER --}}
            <div class="header">
                <div class="header-left">
                    <div class="status-dot">
                        <span class="ping"></span>
                        <span class="dot"></span>
                    </div>
                    <span class="header-title">[ СИСТ_ОШИБКА // КОД: {{ $code ?? '???' }} ]</span>
                </div>
                <a href="{{ url('/') }}" class="btn-return">[ ВОЗВРАТ_НА_БАЗУ ]</a>
            </div>
            
            {{-- PROMINENT ERROR CODE --}}
            <div class="error-code-container">
                <span class="error-code">{{ $code ?? '???' }}</span>
                <span class="error-code-divider"></span>
                <span class="error-code-small">{{ $message }}</span>
            </div>
            
            {{-- MAIN CONTENT --}}
            <div class="grid-layout">
                {{-- LEFT PANEL --}}
                <div>
                    <div class="panel">
    <div class="panel-title">// ОТЧЁТ_ПОТЕРИ</div>
    <div class="panel-row">
        <span>ОПЕРАЦИЯ:</span> 
        <span class="value">{{ $operation ?? 'UNKNOWN_QUERY' }}</span>
    </div>
    <div class="panel-row">
        <span>ЦЕЛЕВОЙ_ОБЪЕКТ:</span> 
        <span class="value-danger">[{{ $target ?? 'NULL_PTR' }}]</span>
    </div>
    <div class="panel-row">
        <span>СТАТУС:</span> 
        <span class="value-danger">{{ $status ?? 'СБОЙ_СИСТЕМЫ' }}</span>
    </div>
    <div class="panel-row">
        <span>КОД_ОШИБКИ:</span> 
        <span class="value-danger">{{ $code ?? '???' }}</span>
    </div>
</div>

                    <div class="status-badge">&gt;&gt; ИЗОЛИРОВАНО_ДЛЯ_АНАЛИЗА</div>
                </div>
                
                {{-- RIGHT PANEL --}}
                <div>
                    <div class="error-banner">
                        <span class="icon">⚠</span>
                        <span>{{ $message ?? 'ЦЕЛЬ НЕ ОБНАРУЖЕНА // ПРОВЕРЬТЕ КООРДИНАТЫ' }}</span>
                    </div>
                    
                    <div class="space-y-2">
                        <span class="telemetry-label">// ТЕЛЕМЕТРИЯ_ОТКЛОНЕНИЙ:</span>
                        <div class="telemetry-box">
                            @php
                                $defaultTelemetry = [
                                    '???',
                                    '???',
                                    'ИНДЕКС_СБОЯ: ???',
                                    'РЕКОМЕНДАЦИЯ: ВЕРНУТЬСЯ НА БАЗУ'
                                ];
                                $telemetryItems = $telemetry ?? $defaultTelemetry;
                            @endphp
                            @foreach($telemetryItems as $index => $item)
                            <div class="telemetry-item">
                                <span class="idx">[{{ str_pad($index + 1, 2, '0', STR_PAD_LEFT) }}]</span>
                                <span class="msg">{{ $item }}</span>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
            
            {{-- FOOTER --}}
            <div class="footer">
                <span>STATUS // NAVIGATION_CORE_ISOLATION_ACTIVE</span>
                <span class="sys-loc">ERR-{{ $code }} // ПОЗИЦИЯ: [{{ $location ?? 'NULL' }}]</span>
            </div>
        </div>
    </div>
</body>

</html>