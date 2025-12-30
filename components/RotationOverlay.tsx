
import React from 'react';

const RotationOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-[#101f22] flex flex-col items-center justify-center p-6 text-center hidden portrait:flex md:hidden">
            <span className="material-symbols-outlined text-primary text-5xl mb-4 animate-pulse">
                screen_rotation
            </span>
            <h2 className="text-xl font-bold text-white mb-2">請旋轉裝置</h2>
            <p className="text-[#9db4b9]">為了獲得最佳體驗，請將您的手機轉為橫向模式。</p>
        </div>
    );
};

export default RotationOverlay;
