/**
 * A function component version of SuspendUI with more improve functionality.
 */
export function Suspense({ children, Loader, Fallbackui, fetch, autoRefetch, delay }: {
    children: any;
    Loader?: any;
    Fallbackui?: any;
    fetch?: () => void;
    autoRefetch?: boolean;
    delay?: number;
}): any;
