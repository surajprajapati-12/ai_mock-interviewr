interface ContainerProps {
  children: React.ReactNode; // children prop, jo React ka special prop hai
  className?: string; // className optional hai, jo CSS classes dene ka kaam karta hai
}

// TypeScript mein interface yeh define karta hai ki kis type ka data ek component ko prop ke roop mein milega
// children: React.ReactNode:
// Children kya hota hai? 
// children ek special prop hai jisme hum kisi bhi cheez ko component ke opening aur closing tags ke beech pass kar sakte hain.
// React.ReactNode kya hota hai? 
// React.ReactNode ka matlab hai ki children mein koi bhi valid React content aa sakta hai: text, numbers, JSX elements, ya phir dusre components bhi.

// className?: string:
// className kya hota hai? 
// className ek optional prop hai jisme hum component ke root HTML element ko CSS classes de sakte hain.

function Container({ children, className }: ContainerProps) {  // Yahaan hum props ka type define kar rahe hain
  return (
    <div className={`container mx-auto px-4 md:px-8 py-4 w-full ${className || ""}`}>
      {children} {/* Yahaan children ko render kiya ja raha hai */}
    </div>
  );
}

export default Container; // Yeh Container component ko export kar raha hai
