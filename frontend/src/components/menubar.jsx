import React from "react";

export default function Sidebar({adminAccess,setActive}) {
  return (
    <aside className="w-64 bg-gray-100 border-r shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Menu</h2>
      <ul className="space-y-4 text-gray-700 font-medium">
        {adminAccess.map((value,key)=>{
           return <li onClick={()=>{setActive(value?.name)}} key={key} className="cursor-pointer hover:text-blue-600">{value?.name}</li> 
        })
        }
      </ul>
    </aside>
  );
}