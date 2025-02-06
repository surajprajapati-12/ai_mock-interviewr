import React from "react"; 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react"; // Home icon ko import kar rahe hain jo breadcrumb me use hoga

interface CustomBreadCrumbProps {
  breadCrumbPage: string; // breadCrumbPage: yeh prop page ka naam ya title show karne ke liye hai
  breadCrumpItems?: { link: string; label: string }[]; // breadCrumpItems: yeh optional prop hai jisme breadcrumb ke items pass kiye jaate hain (link aur label)
}

export const CustomBreadCrumb = ({
  breadCrumbPage,
  breadCrumpItems,
}: CustomBreadCrumbProps) => {
  return (
    <Breadcrumb> {/* Breadcrumb component ko render kar rahe hain */}
      <BreadcrumbList> {/* Breadcrumb ka list container */}
        <BreadcrumbItem> {/* Pehla item: Home */}
          <BreadcrumbLink
            href="/" // Home page ki link
            className="flex items-center justify-center hover:text-emerald-500" // CSS classes for styling
          >
            <Home className="w-3 h-3 mr-2" /> {/* Home icon ko render kar rahe hain */}
            Home {/* Home label */}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadCrumpItems && // Agar breadCrumpItems hain, toh unhe map karenge
          breadCrumpItems.map((item, i) => ( 
            <React.Fragment key={i}> {/* Fragment ka use karke ek parent element ki zarurat nahi */}
              <BreadcrumbSeparator /> {/* Separator between breadcrumb items */}
              <BreadcrumbItem> {/* Item display kar rahe hain */}
                <BreadcrumbLink
                  href={item.link} // Link pass kar rahe hain item ka
                  className="hover:text-emerald-500" // Styling for the item
                >
                  {item.label} {/* Label display kar rahe hain */}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        <BreadcrumbSeparator /> {/* Last separator */}
        <BreadcrumbItem> {/* Last item: Current page */}
          <BreadcrumbPage>{breadCrumbPage}</BreadcrumbPage> {/* Current page ka naam */}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
