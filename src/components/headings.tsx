interface HeadingsProps {
    title: string;
    description?: string;
    isSubHeading?: boolean;
  }
  
  function Headings({ title, description, isSubHeading = false }: HeadingsProps) {
    return (
      <div>
        <h2
          className={`text-2xl md:text-3xl text-gray-800 font-semibold font-sans ${
            isSubHeading ? "text-lg md:text-xl" : ""
          }`}
        >
          {/* isSubHeading: This optional boolean prop determines whether the heading should have a smaller font size (for subheadings). */}
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    );
  }
  
  export default Headings;
  