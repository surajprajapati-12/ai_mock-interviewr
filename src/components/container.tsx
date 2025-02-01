interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

// TypeScript me interface ye define hota hai ki kis tarah ka data ek component receive karega as a prop
// children: React.ReactNode:
// What is children?
// children is a special prop that allows you to pass anything inside the component’s opening and closing tags.
// What is React.ReactNode?
// This means that children can be any valid React content: text, numbers, JSX (elements), or even other components.

// className?: string:
// What is className?
// className is an optional prop that allows you to pass CSS class names to the component's root HTML element.
  
function Container({ children, className }: ContainerProps) {  // Fixed type name
    return (
      <div className={`container mx-auto px-4 md:px-8 py-4 w-full ${className || ""}`}>
        {children}
      </div>
    );
}

export default Container;
