import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

function Input({ className, type = 'text', error, ...props }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="relative">
            <input
                type={isPassword && showPassword ? 'text' : type}
                data-slot="input"
                className={cn(
                    'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
                    isPassword ? 'pr-10' : '', // add space for the icon
                    className,
                )}
                {...props}
            />

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground focus:outline-none"
                    tabIndex={-1}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            )}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

export { Input };
