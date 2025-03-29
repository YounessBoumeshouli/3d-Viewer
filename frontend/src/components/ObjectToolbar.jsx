"use client";
import React from "react";

function ObjectToolbar() {
    const categories = [
        { emoji: "🚪", name: "Portes", ariaLabel: "Add doors" },
        { emoji: "🪟", name: "Fenêtres", ariaLabel: "Add windows" },
        { emoji: "🪑", name: "Meubles", ariaLabel: "Add furniture" },
        { emoji: "💡", name: "Éclairage", ariaLabel: "Add lighting" },
    ];

    return (
        <nav
            className="flex z-10 flex-col justify-center items-center px-16 py-9 w-full text-center whitespace-nowrap bg-white max-md:px-5 max-md:max-w-full"
            aria-label="Object categories"
        >
            <div className="flex gap-5 justify-between max-w-full w-[338px]">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 hover:bg-gray-50"
                        aria-label={category.ariaLabel}
                    >
            <span className="self-center text-2xl text-black">
              {category.emoji}
            </span>
                        <span className="mt-2 text-sm text-gray-600">{category.name}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default ObjectToolbar;
