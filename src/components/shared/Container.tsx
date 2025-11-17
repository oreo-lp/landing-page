
interface ContainerProps {
    children: React.ReactNode;
    className?: string; // 可选的，因为有些组件想使用默认的格式
}

export const Container = ({ children, className = "" }: ContainerProps) => {
    return (
        <div
            className={`mx-auto max-w-7xl w-full px-5 sm:px-8 md:px-4 lg:px-5 ${className}`}
        >
            {children}
        </div>
    )
}