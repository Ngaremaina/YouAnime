const maxWidthClasses = {
  sm: "max-w-sm",
  lg: "max-w-lg",
} as const;

type Props = {
  children: React.ReactNode;
  maxWidth?: keyof typeof maxWidthClasses;
};

export default function FormCard({ children, maxWidth = "sm" }: Props) {
  return (
    <div
      className={`mx-auto w-full ${maxWidthClasses[maxWidth]} rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8`}
    >
      {children}
    </div>
  );
}
